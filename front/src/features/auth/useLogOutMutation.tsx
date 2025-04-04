import React from 'react'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useLogOutMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:async ()=>{
            const res = await axios.post('/api/auth/logout',{withCredentials:true})
            return res.data
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:['auth']})
        }
    })
    const handleLogOut = ()=>{
        mutation.mutate()
    }
    return {handleLogOut,mutation}
}

export default useLogOutMutation