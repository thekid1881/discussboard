'use client';

import { signOut, useSession } from "next-auth/react";
import { FaGooglePlus } from "react-icons/fa";

export default function SignOutButton() {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;

    if (!session) return null;

    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex flex-row justify-self-end text-center p-2 border-transparent cursor-pointer hover:text-gray-700 hover:underline"
        >
            <h3 className='text-2xl font-medium text-center mr-2'>
                Sign Out
            </h3>
            <FaGooglePlus
                className="text-4xl"
            />
        </button>
    );
}