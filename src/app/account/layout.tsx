// layout/AccountLayout.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setUserFromLocalStorage } from '../redux/slices/auth.slices';
import useAuthRedirect from '../hooks/useAuthRedirect';

interface AccountLayoutProps {
    children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useAuthRedirect(); // Use the custom hook to handle redirect

    useEffect(() => {
        // Check if user information is available in localStorage
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
            const userData = JSON.parse(userFromLocalStorage);
            dispatch(setUserFromLocalStorage(userData));
        }
    }, [dispatch]);

    return (
        <div>
            {isAuthenticated ? children : null}
        </div>
    );
};

export default AccountLayout;
