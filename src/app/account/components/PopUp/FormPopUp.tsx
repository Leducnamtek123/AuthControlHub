import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface FormPopUpProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    title: string;
}

const FormPopUp: React.FC<FormPopUpProps> = ({ isVisible, onClose, onSubmit, title }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            onSubmit(values);
            form.resetFields();
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title={title}
            visible={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* Add more form fields as needed */}
            </Form>
        </Modal>
    );
};

export default FormPopUp;
