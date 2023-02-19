'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type User = {
    image: string
}

export const Logged = ({ image }: User) => {
    return (
        <li className='flex items-center gap-8'>
            <button onClick={() => signOut()} className="px-6 py-2 text-sm text-white bg-gray-700 rounded-xl">
                Sign Out
            </button>
            <Link href={'/dashboard'}>
                <Image src={image} width={124} height={124} alt='' className='rounded-full w-14' priority />
            </Link>
        </li>
    )
}

