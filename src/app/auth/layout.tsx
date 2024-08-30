// AuthLayout.tsx

'use client'
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import FooterSmall from './footer';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Provider store={store}>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray bg-no-repeat bg-full"
          ></div>
          {children}
        </section>
      </main>
      <FooterSmall absolute />

    </Provider>

  );
};

export default AuthLayout;
