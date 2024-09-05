'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, Descriptions } from 'antd';
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import useAuthRedirect from '../../../hooks/useUserFromCookie';
import useNotificationMessage from '../../../hooks/useNotificationMessage';

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    address: string;
    role: string;
    joinDate: string;
}

const UserDetailPage: React.FC = () => {
    const { Id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const { error } = useNotificationMessage();

    useAuthRedirect();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Simulating API call to fetch user details
                // Replace this with actual API call in production
                await new Promise(resolve => setTimeout(resolve, 1000));
                const dummyUser: User = {
                    id: Id as string,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    age: 30,
                    address: '123 Main St, Anytown, USA',
                    role: 'Admin',
                    joinDate: '2023-01-01',
                };
                setUser(dummyUser);
            } catch (err) {
                console.error('Error fetching user details:', err);
                error('Failed to fetch user details');
            }
        };

        fetchUserDetails();
    }, [Id, error]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            {user ? (
                <Card>
                    <Descriptions title="User Information" bordered>
                        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
                        <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
                        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                        <Descriptions.Item label="Join Date">{user.joinDate}</Descriptions.Item>
                    </Descriptions>
                </Card>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default UserDetailPage;
