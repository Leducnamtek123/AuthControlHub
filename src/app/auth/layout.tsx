import { ReactNode } from 'react';
import backgroundImage from '@/app/auth/assets/auth_bg.jpg'; // Adjust the import path as needed

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})`, backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-md space-y-6 bg-clear">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
