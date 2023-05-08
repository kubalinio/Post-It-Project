'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { PostType } from "../types/Post"

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}

const AddComment = ({ id }: PostProps) => {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let commentToastId: string

    const { mutate } = useMutation(
        async (data: Comment) => axios.post('/api/posts/addComment', { data }),
        {
            onSuccess: data => {
                setTitle('')
                setIsDisabled(false)
                queryClient.invalidateQueries(['detail-post'])
                toast.success('Added your comment', { id: commentToastId })
            },
            onError: error => {
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: commentToastId })
                }
            }
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading('Adding your comment', { id: commentToastId })
        mutate({ title, postId: id })
    }


    return (
        <form onSubmit={submitComment}>
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    name="title"
                    className="p-4 my-2 text-lg rounded-md"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className='px-6 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-50'
                    type="submit"
                >
                    Add Comment
                </button>
                <p className={`font-bold ${title.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>
                    {`${title.length}/300`}
                </p>
            </div>
        </form>
    )
}

export default AddComment