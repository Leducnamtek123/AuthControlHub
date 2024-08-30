'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AccountPage: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <p>You need to log in to view this page.</p>;
    }

    return (
        <div>
            <h1>Account Page</h1>
            <p>Welcome, {user?.name}!</p>
        </div>
    );
};

export default AccountPage;
