import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/auth.service';
import { register } from 'module';
import { signUp } from '@/app/redux/slices/auth.slices';
interface RegisterFormProps {
    onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if the user has agreed to the privacy policy
        if (!agree) {
            alert('You must agree to the Privacy Policy');
            return;
        }

        try {
            // Use authService for login
            const user = authService.signUp({ email, password, username });
            dispatch(signUp({ email, password, username }) as any);
            onSuccess(); // Callback to handle post-login actions
        } catch (error) {
            setError('Invalid credentials');
        }

    };

    return (

        <form onSubmit={handleSignup}>
            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}

            <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        id="customCheckRegister"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                            href="#pablo"
                            className="text-lightBlue-500"
                            onClick={(e) => e.preventDefault()}
                        >
                            Privacy Policy
                        </a>
                    </span>
                </label>
            </div>

            <div className="text-center mt-6">
                <button
                    className="bg-blueGray-800 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
};


