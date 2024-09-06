import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox } from 'antd'; // Import Ant Design components
import useNotificationMessage from '@/app/hooks/useNotificationMessage';
import { useLoading } from '@/app/contexts/LoadingContext';
import { login } from '@/app/redux/slices/auth.slices';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { setLoading } = useLoading(); // Get the setLoading function from context
    const { success, error: notifyError } = useNotificationMessage(); // Sử dụng hook thông báo

    const handleSignin = async (values: any) => {
        const { email, password } = values;

        setLoading(true); // Set loading to true before starting the request

        try {
            await dispatch(login({ email, password }) as any).unwrap();
            success('Login successful! Redirecting to your account...');
            router.push('/account'); // Redirect to the account page on successful login
        } catch (err: any) {
            // Capture and display the backend error
            if (err.response && err.response.data && err.response.data.message) {
                notifyError(err.response.data.message); // Hiển thị lỗi từ backend
            } else {
                notifyError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading to false after request is completed
        }
    };

    return (
        <Form
            name="login_form"
            onFinish={handleSignin}
            layout="vertical"
            initialValues={{ remember: true }}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className="relative w-full mb-3"
            >
                <Input
                    type="email"
                    placeholder="Email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="relative w-full mb-3"
            >
                <Input.Password
                    placeholder="Password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="w-full mb-3">
                <Checkbox className="text-blueGray-600" >Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="text-center mt-6">
                <button
                    className="bg-blueGray-800 text-black hover:bg-blueGray-600 text-m font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full ease-linear transition-all duration-150"
                >
                    Sign In
                </button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
