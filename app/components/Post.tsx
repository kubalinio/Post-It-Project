'use client'

import Image from "next/image"
import Link from "next/link"

const Post = ({ avatar, name, postTitle, id }) => {
    return (
        <div className="p-8 my-8 bg-white rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt='avatar'
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>

            <div className="my-8">
                <p className="break-all" >{postTitle}</p>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        Comments
                    </p>
                </Link>
            </div>

        </div>
    )
}

export default Post