"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastPostID: string

    //Create a post
    const { mutate } = useMutation(
        async (title: string) =>
            await axios.post("/api/posts/addPost", {
                title,
            }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["posts"])
                toast.success("Post has been made 🔥", { id: toastPostID })
                setTitle("")
                setIsDisabled(false)
            },
        }
    )
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        mutate(title)
    }

    return (
        <form onSubmit={submitPost} className="p-8 my-8 bg-white rounded-md ">
            <div className="flex flex-col my-4">
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="title"
                    placeholder="What's on your mind?"
                    className="p-4 my-2 text-lg bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex items-center justify-between gap-2 ">
                <p
                    className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"
                        } `}
                >{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="px-6 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Create post
                </button>
            </div>
        </form>
    )
}