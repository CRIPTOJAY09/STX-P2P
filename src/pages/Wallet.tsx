import React, { useState, useEffect } from 'react';
import { useWalletManager } from '../hooks/useWalletManager';
import WalletHeader from '../components/wallet/WalletHeader';
import WalletActions from '../components/wallet/WalletActions';
import DepositModal from '../components/wallet/DepositModal';
import WithdrawalForm from '../components/wallet/WithdrawalForm';
import TransactionHistory from '../components/wallet/TransactionHistory';

// Mock wallet address - in a real app, this would come from authentication
const MOCK_WALLET = {
  address: '0x1234567890123456789012345678901234567890',
  encryptedPrivateKey: 'encrypted_key_here'
};

export default function Wallet() {
  const { getBalance, isLoading } = useWalletManager();
  const [balance, setBalance] = useState('0');
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await getBalance(MOCK_WALLET.address);
      setBalance(walletBalance);
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [getBalance]);

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-6 text-[#05fabd] text-center">
        My Wallet
      </h1>

      <WalletHeader usdtBalance={balance} />
      
      <WalletActions
        onDeposit={() => setShowDeposit(true)}
        onWithdraw={() => setShowWithdraw(true)}
        disabled={isLoading}
      />

      {showDeposit && (
        <DepositModal
          address={MOCK_WALLET.address}
          onClose={() => setShowDeposit(false)}
        />
      )}

      {showWithdraw && (
        <WithdrawalForm
          wallet={MOCK_WALLET}
          balance={balance}
          onClose={() => setShowWithdraw(false)}
        />
      )}

      <TransactionHistory transactions={[]} />
    </div>
  );
}