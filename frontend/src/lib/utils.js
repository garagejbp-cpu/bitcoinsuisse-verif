import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formater une adresse Ethereum (0x1234...5678)
export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Formater un montant USDT (avec 6 décimales)
export function formatUSDT(amount) {
  if (!amount) return '0.00';
  
  // Si c'est un BigInt ou une string de wei (6 décimales pour USDT)
  const value = typeof amount === 'string' || typeof amount === 'bigint' 
    ? Number(amount) / 1e6 
    : amount;
  
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
