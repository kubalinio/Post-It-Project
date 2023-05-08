'use client'

import Post from '../../components/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AddComment from '@/app/components/AddComment'
import Image from 'next/image'
import { PostType } from '@/app/types/Post'


type URL = {
    params: {
        slug: string
    }
    searchParams: string
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

const PostDetail = (url: URL) => {
    const { data, isLoading } = useQuery<PostType>({
        queryFn: () => fetchDetails(url.params.slug),
        queryKey: ['detail-post'],
    })
    if (isLoading) return <div>Loading...</div>


    return (
        <div>
            <Post
                id={data?.id!}
                name={data?.user?.name!}
                avatar={data?.user?.image!}
                postTitle={data?.title!}
                comments={data?.Comment} />

            <AddComment id={data?.id} />
            {data?.Comment?.map((comment) => (
                <div key={comment.id} className='p-8 my-6 bg-white rounded-md' >
                    <div className='flex items-center gap-2'>
                        <Image
                            width={24}
                            height={24}
                            src={comment.user?.image}
                            alt='avatar'
                        />
                        <h3 className='font-bold'>{comment?.user?.name}</h3>
                        <h2 className='text-sm'>{comment.createdAt}</h2>
                    </div>
                    <div className='py-4'>
                        {comment.title}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostDetail