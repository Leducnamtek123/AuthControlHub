// layout/AccountLayout.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import DefaultLayout from './components/Layouts/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; // Adjust the import path as needed
import { fetchUserDetailsAsync } from '../redux/slices/auth.slices'; // Adjust the import path as needed
import { Spin } from 'antd';
import { useLoading } from '../contexts/LoadingContext';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingSpinner from '../components/LoadingSpinner';

interface AccountLayoutProps {
    children: ReactNode;
}


const AccountLayout = ({ children }: AccountLayoutProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            await dispatch(fetchUserDetailsAsync());
            setLoading(false);
        };
        fetchUser();
    }, [dispatch, setLoading]);

    if (!user) {
        return null; // Or redirect to login page
    }

    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
};

export default AccountLayout;
