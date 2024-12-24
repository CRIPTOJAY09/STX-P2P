import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/home/Banner';
import BalanceDisplay from '../components/home/BalanceDisplay';
import QuickActions from '../components/home/QuickActions';
import CurrencyFilter from '../components/CurrencyFilter';
import TradeCard from '../components/trade/TradeCard';
import { mockOffers } from '../data/mockOffers';
import type { Currency, FiatCurrency } from '../types';

export default function Home() {
  const { t } = useTranslation();
  const [haveCurrency, setHaveCurrency] = useState<Currency | FiatCurrency>('USDT');
  const [wantCurrency, setWantCurrency] = useState<Currency | FiatCurrency>('USD');
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Mock USDT balance - in a real app, this would come from your wallet or API
  const usdtBalance = 1000;

  const handleTradeSelect = (offerId: string) => {
    console.log('Selected trade:', offerId);
  };

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-6 text-[#05fabd] text-center">
        {t('home.title')}
      </h1>
      
      <Banner />
      
      <BalanceDisplay usdtBalance={usdtBalance} />
      
      <QuickActions
        onDeposit={() => setShowDeposit(true)}
        onWithdraw={() => setShowWithdraw(true)}
      />
      
      <CurrencyFilter
        haveCurrency={haveCurrency}
        wantCurrency={wantCurrency}
        onHaveChange={setHaveCurrency}
        onWantChange={setWantCurrency}
      />
      
      <div className="space-y-4">
        {mockOffers.map((offer) => (
          <TradeCard
            key={offer.id}
            offer={offer}
            onSelect={handleTradeSelect}
          />
        ))}
      </div>
    </div>
  );
}