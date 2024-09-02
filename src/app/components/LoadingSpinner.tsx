import React from 'react';
import { Spin } from 'antd';
import { useLoading } from '../contexts/LoadingContext';

const LoadingSpinner: React.FC = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <Spin size="large" />
        </div>
    );
};

export default LoadingSpinner;
