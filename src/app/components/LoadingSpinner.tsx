import React from 'react';
import { Spin } from 'antd';
import { useLoading } from '../contexts/LoadingContext';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner: React.FC = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <Spin size="large" indicator={<LoadingOutlined spin style={{ color: 'black' }} />} />
        </div>
    );
};

export default LoadingSpinner;
