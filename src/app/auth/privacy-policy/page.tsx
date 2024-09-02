'use client'
import React from 'react';
import { Layout, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const PrivacyPolicy: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', padding: '20px' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <Title level={2}>Privacy Policy</Title>
                <Paragraph>
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </Paragraph>
                <Title level={4}>Information We Collect</Title>
                <Paragraph>
                    We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                </Paragraph>
                <Paragraph>
                    <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
                </Paragraph>
                <Title level={4}>Use of Your Information</Title>
                <Paragraph>
                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                </Paragraph>
                <ul>
                    <li>Create and manage your account.</li>
                    <li>Process your transactions and send you related information.</li>
                    <li>Improve and personalize your experience on the Site.</li>
                    <li>Send you marketing and promotional communications.</li>
                    <li>Respond to your inquiries and offer customer support.</li>
                </ul>
                <Title level={4}>Disclosure of Your Information</Title>
                <Paragraph>
                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </Paragraph>
                <Paragraph>
                    <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </Paragraph>
                <Title level={4}>Contact Us</Title>
                <Paragraph>
                    If you have questions or comments about this Privacy Policy, please contact us at:
                </Paragraph>
                <Paragraph>
                    <strong>Email:</strong> support@example.com
                </Paragraph>
            </Content>
        </Layout>
    );
};

export default PrivacyPolicy;
