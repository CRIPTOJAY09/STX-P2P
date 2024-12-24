import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Container from './ui/Container';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-[Poppins] transition-colors">
      <Container>
        <main className="py-6">
          <Outlet />
        </main>
      </Container>
      <Navigation />
    </div>
  );
}