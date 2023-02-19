'use client'

import { signIn } from 'next-auth/react'

export const Login = () => {
    return (
        <li className='list-none'>
            <button onClick={() => signIn('google')}
                className='px-6 py-2 text-sm text-white bg-gray-700 rounded-xl disabled:opacity-25'>
                Sign In
            </button>
        </li>
    )
}

