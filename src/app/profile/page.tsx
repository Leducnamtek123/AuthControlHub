'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import axiosInstance from '../utils/axiosInstance';
import { useNotificationContext } from '../contexts/NotificationContext';
import { useLoading } from '../contexts/LoadingContext';
import { Form, Input, Button, Avatar } from 'antd';
import { getUserDetails } from '../redux/slices/auth.slices';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, userDetails } = useSelector((state: RootState) => state.auth);
    const [form] = Form.useForm();
    const { success, error } = useNotificationContext();
    const { setLoading } = useLoading();
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (userDetails) {
            form.setFieldsValue({
                fullName: userDetails.email,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber,
            });
        }
    }, [userDetails, form]);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await axiosInstance.put('/api/user/profile', values);
            success('Profile updated successfully');
            dispatch(getUserDetails());
        } catch (err) {
            error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
            <div className="flex justify-center mb-6">
                <Avatar size={100} src={avatar} alt="User Avatar">
                    {userDetails?.email?.charAt(0) || 'U'}
                </Avatar>
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfilePage;
