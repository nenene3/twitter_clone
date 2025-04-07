import React from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
type Props = {
    postId:string
}

const useCreateCommentMutation = ({postId}: Props) => {

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:async(data:{title:string,content:string})=>{
            const response = await axios.post(`/api/posts/${postId}/comment`,data,{withCredentials:true})
            return response.data
        },
        onSettled() {
            queryClient.invalidateQueries({queryKey:['comments',postId]})
        },
    })

    const handleCreatePost=(title:string,content:string)=>{
        mutate({title,content})
    }

    return {handleCreatePost,mutate}
}

export default useCreateCommentMutation