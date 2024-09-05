// AuthLayout.tsx

'use client'
import { ReactNode, useEffect } from 'react';
import FooterSmall from './footer';
import Header from './header';
import { NotificationProvider } from '../contexts/NotificationContext';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Header /> {/* Add the Header here */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray bg-no-repeat bg-full"
          ></div>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </section>
      </main>
      <FooterSmall absolute={false} />
    </>
  );
};

export default AuthLayout;
