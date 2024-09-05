'use client';

import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useRouter } from 'next/navigation';
import { useLoading } from '@/app/contexts/LoadingContext';
import FormPopUp from '../components/PopUp/FormPopUp';

interface User {
    key: number;
    name: string;
    age: number;
    address: string;
}

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const { loading, setLoading } = useLoading();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        // Simulating API call to fetch users
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // Simulating API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                const dummyData: User[] = [
                    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
                    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Bridge Street' },
                    { key: 3, name: 'Joe Black', age: 32, address: 'Sydney No. 1 York Street' },
                    // Add more dummy data to test pagination
                    ...Array.from({ length: 50 }, (_, i) => ({
                        key: i + 4,
                        name: `User ${i + 4}`,
                        age: 20 + Math.floor(Math.random() * 40),
                        address: `City ${i + 4}, Street ${i + 4}`
                    }))
                ];
                setUsers(dummyData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [setLoading]);

    const handleCreate = () => {
        setEditingUser(null);
        setIsPopupVisible(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
        setEditingUser(null);
    };

    const handlePopupSubmit = (values: any) => {
        console.log('Form values:', values);
        // Here you would typically send the data to your backend
        // and then update the local state
        setIsPopupVisible(false);
        setEditingUser(null);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className="text-red-500 hover:text-red-700"
                        />
                    </Tooltip>
                    <Tooltip title="More Info">
                        <Button
                            type="text"
                            icon={<InfoCircleOutlined />}
                            className="text-green-500 hover:text-green-700"
                            onClick={() => router.push(`/account/user/${record.key}`)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
                className="mb-4"
            >
                Create User
            </Button>
            <Table
                columns={columns}
                dataSource={users}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
            />
            <FormPopUp
                isVisible={isPopupVisible}
                onClose={handlePopupClose}
                onSubmit={handlePopupSubmit}
                title={editingUser ? "Edit User" : "Create User"}
            />
        </div>
    );
};

export default UserPage;
