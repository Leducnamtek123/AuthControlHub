'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUserDetailsAsync, logout } from '../redux/slices/auth.slices';
import { useRouter } from 'next/navigation';
import DefaultLayout from './components/Layouts/DefaultLayout';
import ECommerce from './components/Dashboard/E-commerce';

const AccountPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserDetailsAsync());
        }
    }, [dispatch, isAuthenticated]);

    const handleLogout = () => {
        dispatch(logout());
        // Redirect user to login page after logging out
        router.push('/auth/login');
    };
    if (!isAuthenticated) {
        return null; // This should not be hit if layout redirection is correctly configured
    }

    return (
        <DefaultLayout>
            <p>Welcome, {user?.email}!</p>
            <button onClick={handleLogout}>Logout</button>
            <ECommerce />
        </DefaultLayout>

    );
};

export default AccountPage;
