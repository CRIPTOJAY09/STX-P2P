import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/common/Banner';
import CurrencyFilter from '../components/CurrencyFilter';
import TradeOfferList from '../components/trade/TradeOfferList';
import CreateOrderButton from '../components/trade/CreateOrderButton';
import CreateOrderForm from '../components/trade/CreateOrderForm';
import type { Currency, FiatCurrency, TradeOffer } from '../types';
import type { OrderData } from '../components/trade/CreateOrderForm';

// Use localStorage to persist offers
const getStoredOffers = (): TradeOffer[] => {
  const stored = localStorage.getItem('tradeOffers');
  return stored ? JSON.parse(stored) : [];
};

const saveOffers = (offers: TradeOffer[]) => {
  localStorage.setItem('tradeOffers', JSON.stringify(offers));
};

export default function Trade() {
  const navigate = useNavigate();
  const [haveCurrency, setHaveCurrency] = useState<Currency | FiatCurrency>('USDT');
  const [wantCurrency, setWantCurrency] = useState<Currency | FiatCurrency>('USD');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [offers, setOffers] = useState<TradeOffer[]>(getStoredOffers());

  const handleTradeSelect = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      navigate('/place-order', { state: { order: offer } });
    }
  };

  const handleOrderSubmit = (orderData: OrderData) => {
    const newOffer: TradeOffer = {
      id: Date.now().toString(),
      sellerId: 'USER123', // In a real app, this would come from auth
      sellerNickname: 'Current User',
      sellerStatus: 'Online',
      cryptocurrency: haveCurrency as Currency,
      fiatCurrency: wantCurrency as FiatCurrency,
      pricePerUnit: orderData.price,
      minAmount: orderData.amount,
      maxAmount: orderData.amount * 2,
      paymentMethod: 'STX PAY',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    const updatedOffers = [newOffer, ...offers];
    setOffers(updatedOffers);
    saveOffers(updatedOffers);
    setIsFormVisible(false);
    navigate('/place-order', { state: { order: orderData } });
  };

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-6 text-[#05fabd] text-center">
        Trade Cryptocurrencies
      </h1>
      
      <Banner />
      
      <CurrencyFilter
        haveCurrency={haveCurrency}
        wantCurrency={wantCurrency}
        onHaveChange={setHaveCurrency}
        onWantChange={setWantCurrency}
      />
      
      <CreateOrderButton
        isFormVisible={isFormVisible}
        onClick={() => setIsFormVisible(!isFormVisible)}
      />
      
      {isFormVisible && (
        <CreateOrderForm onSubmit={handleOrderSubmit} />
      )}
      
      <TradeOfferList
        offers={offers}
        onSelect={handleTradeSelect}
      />
    </div>
  );
}