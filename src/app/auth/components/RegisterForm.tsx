import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Checkbox, Form, Spin } from 'antd';
import { RootState } from '@/app/redux/store';
import { signUpAsync } from '@/app/redux/slices/auth.slices';
import { useRouter } from 'next/navigation';
import useNotificationMessage from '@/app/hooks/useNotificationMessage';
import { useLoading } from '@/app/contexts/LoadingContext';
import Link from 'next/link';

export const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const { setLoading } = useLoading(); // Get the setLoading function from context
    const router = useRouter();
    const { success, error: notifyError } = useNotificationMessage();
    const [agree, setAgree] = useState(false);

    const handleSignup = async (values: any) => {
        const { email, password, firstName, lastName, phoneNumber } = values;

        if (!agree) {
            notifyError('You must agree to the Privacy Policy');
            return;
        }

        setLoading(true); // Set loading to true before starting the request

        try {
            await dispatch(signUpAsync({ email, password, firstName, lastName, phoneNumber }) as any).unwrap();
            success('Registration successful! Redirecting to login page...');
            router.push('/auth/login');
        } catch (err: any) {
            notifyError('An error occurred while registering. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after request is completed
        }
    };

    return (
        <div className="relative">
            <Form onFinish={handleSignup} layout="vertical">
                <Form.Item
                    name="email"
                    label="Email"
                    className="relative w-full mb-3"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        type="email"
                        className="px-3 py-3 text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    className="relative w-full mb-3"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        className="px-3 py-3 text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    className="relative w-full mb-3"
                >
                    <Input
                        className="px-3 py-3 text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="First Name"
                    />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    className="relative w-full mb-3"
                >
                    <Input
                        className="px-3 py-3 text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Last Name"
                    />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    className="relative w-full mb-3"
                >
                    <Input
                        className="px-3 py-3 text-sm rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number"
                    />
                </Form.Item>
                <Form.Item
                    name="agree"
                    valuePropName="checked"
                    className="relative w-full mb-3"
                >
                    <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    >
                        I agree with the{" "}
                        <Link
                            href="/auth/privacy-policy" // Updated href to point to your Privacy Policy page
                            className="text-lightBlue-500"
                            target="_blank" // Opens the link in a new tab
                            rel="noopener noreferrer" // Security measure when opening in a new tab
                        >
                            Privacy Policy
                        </Link>
                    </Checkbox>
                </Form.Item>


                <Form.Item className="text-center mt-6">
                    <button
                        className="bg-blueGray-800 text-black hover:bg-blueGray-600 text-m font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150"
                    >
                        Create Account
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};
