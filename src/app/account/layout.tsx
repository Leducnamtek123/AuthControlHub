'use client'
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

interface AccountLayoutProps {
    children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
    return (
        <div>
            <Provider store={store}>
                {children}
            </Provider>
        </div>
    );
};

export default AccountLayout;
