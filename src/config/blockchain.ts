export const NETWORK_CONFIG = {
  chainId: 56, // BSC Mainnet
  rpcUrl: 'https://bsc-dataseed.binance.org/',
  name: 'Binance Smart Chain',
  symbol: 'BNB',
  decimals: 18,
  tokens: {
    USDT: {
      address: '0x55d398326f99059fF775485246999027B3197955', // BSC USDT
      decimals: 18,
      symbol: 'USDT',
      name: 'Tether USD',
      abi: [
        'function balanceOf(address owner) view returns (uint256)',
        'function transfer(address to, uint amount) returns (bool)',
        'event Transfer(address indexed from, address indexed to, uint amount)'
      ]
    }
  }
} as const;