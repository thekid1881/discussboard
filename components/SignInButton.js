'use client';

import { signIn } from "next-auth/react";
import { FaGooglePlus } from "react-icons/fa";

export default function SignInButton() {
    const handleLogin = async () => {
        await signIn('google', {
            callbackUrl: '/dashboard',
            prompt: 'login',
        });
    };

    return (
        <button
            onClick={handleLogin}
            className="flex flex-row cursor-pointer justify-self-end text-center hover:text-gray-700 hover:underline"
        >
            <h3 className='text-3xl font-medium text-center mr-3 pt-2'>
                Sign In
            </h3>
            <FaGooglePlus 
                className='text-5xl'
            />
        </button>
    );
}