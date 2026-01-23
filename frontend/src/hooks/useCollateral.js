import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESSES, USDT_ABI, COLLATERAL_MANAGER_ABI, MAX_UINT256 } from '../config/web3';

/**
 * Hook pour vérifier l'allowance actuelle du client vers le contrat
 */
export function useCheckAllowance() {
  const { address } = useAccount();
  
  const { data: allowance, refetch, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.USDT,
    abi: USDT_ABI,
    functionName: 'allowance',
    args: address && CONTRACT_ADDRESSES.COLLATERAL_MANAGER !== 'PENDING_DEPLOYMENT' 
      ? [address, CONTRACT_ADDRESSES.COLLATERAL_MANAGER] 
      : undefined,
    query: { 
      enabled: !!address && CONTRACT_ADDRESSES.COLLATERAL_MANAGER !== 'PENDING_DEPLOYMENT'
    }
  });

  const hasApproved = allowance && BigInt(allowance.toString()) > 0n;
  const isUnlimited = allowance && BigInt(allowance.toString()) >= BigInt(MAX_UINT256) / 2n;

  return { 
    allowance: allowance?.toString() || '0', 
    hasApproved, 
    isUnlimited,
    refetch, 
    isLoading 
  };
}

/**
 * Hook pour approuver USDT vers le CollateralManager V2
 * UNE SEULE TRANSACTION pour le client !
 */
export function useApproveCollateralManager() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const approve = useCallback(async () => {
    if (!address) throw new Error('Wallet non connecté');

    try {
      // Approuver le wallet ADMIN directement (pas le contrat)
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.USDT,
        abi: USDT_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.ADMIN_ADDRESS, MAX_UINT256],
        gas: 100000n
      });

      console.log('Approve TX hash:', txHash);
      return txHash;
    } catch (error) {
      console.error('Erreur approve:', error);
      throw error;
    }
  }, [address, writeContractAsync]);

  return { approve, isPending: isPending || isConfirming, hash, isConfirmed };
}

/**
 * Hook optionnel pour enregistrer explicitement un client
 * (Optionnel car l'allowance suffit pour les retraits)
 */
export function useRegisterClient() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const register = useCallback(async () => {
    if (!address) throw new Error('Wallet non connecté');
    if (CONTRACT_ADDRESSES.COLLATERAL_MANAGER === 'PENDING_DEPLOYMENT') {
      throw new Error('Le nouveau contrat n\'est pas encore déployé.');
    }

    try {
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER,
        abi: COLLATERAL_MANAGER_ABI,
        functionName: 'registerClient',
        args: [],
        gas: 100000n
      });

      console.log('Register TX hash:', txHash);
      return txHash;
    } catch (error) {
      console.error('Erreur register:', error);
      throw error;
    }
  }, [address, writeContractAsync]);

  return { register, isPending: isPending || isConfirming, hash, isConfirmed };
}

/**
 * Hook pour retirer les collatéraux (admin seulement)
 * Utilise directement USDT transferFrom
 */
export function useWithdrawCollateral() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const withdraw = useCallback(async (clientAddress, toAddress, amount, reason) => {
    try {
      // S'assurer que le montant est un BigInt
      const amountBigInt = typeof amount === 'bigint' ? amount : BigInt(amount);
      
      console.log('TransferFrom params:', {
        from: clientAddress,
        to: toAddress,
        amount: amountBigInt.toString(),
        reason: reason
      });

      // Appel direct à USDT transferFrom
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESSES.USDT,
        abi: [
          {
            constant: false,
            inputs: [
              { name: '_from', type: 'address' },
              { name: '_to', type: 'address' },
              { name: '_value', type: 'uint256' }
            ],
            name: 'transferFrom',
            outputs: [{ name: '', type: 'bool' }],
            type: 'function'
          }
        ],
        functionName: 'transferFrom',
        args: [clientAddress, toAddress, amountBigInt]
      });

      return txHash;
    } catch (error) {
      console.error('Erreur transferFrom:', error);
      throw error;
    }
  }, [writeContractAsync]);

  return { withdraw, isPending: isPending || isConfirming, hash, isConfirmed };
}
