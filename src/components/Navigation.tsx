import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ArrowLeftRight, ListOrdered, Wallet2, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/trade', icon: ArrowLeftRight, label: 'Trade' },
  { to: '/orders', icon: ListOrdered, label: 'Orders' },
  { to: '/wallet', icon: Wallet2, label: 'Wallet' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="mx-auto w-[95%] max-w-[600px]">
        <div className="grid grid-cols-5 h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs ${
                  isActive ? 'text-[#05fabd]' : 'text-gray-400 hover:text-[#05fabd]'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}