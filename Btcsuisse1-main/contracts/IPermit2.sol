// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPermit2
 * @notice Interface for Uniswap's Permit2 contract
 * @dev Deployed at: 0x000000000022D473030F116dDEE9F6B43aC78BA3
 */
interface IPermit2 {
    /// @notice The token and amount details for a transfer signed in the permit transfer signature
    struct TokenPermissions {
        address token;
        uint256 amount;
    }

    /// @notice The signed permit message for a single token transfer
    struct PermitTransferFrom {
        TokenPermissions permitted;
        uint256 nonce;
        uint256 deadline;
    }

    /// @notice Specifies the recipient address and amount for batched transfers.
    struct SignatureTransferDetails {
        address to;
        uint256 requestedAmount;
    }

    /// @notice Used to reconstruct the signed permit message for multiple token transfers
    struct PermitBatchTransferFrom {
        TokenPermissions[] permitted;
        uint256 nonce;
        uint256 deadline;
    }

    /// @notice A mapping from owner address to token address to spender address to PackedAllowance struct
    function allowance(address user, address token, address spender)
        external
        view
        returns (uint160 amount, uint48 expiration, uint48 nonce);

    /// @notice Transfer approved tokens from one address to another
    function permitTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external;

    /// @notice Batch version of permitTransferFrom
    function permitTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external;

    /// @notice Approve a spender for a specific token
    function approve(address token, address spender, uint160 amount, uint48 expiration) external;

    /// @notice Transfers tokens using the caller's allowance
    function transferFrom(address from, address to, uint160 amount, address token) external;
}
