
import { useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'


const useRegisterMutation = () => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:async (loginData:{email:string,password:string,username:string})=>{
            const res = await axios.post('/api/auth/register',loginData,{withCredentials:true})
            return res.data
        },
        onSettled() {
            queryClient.invalidateQueries({queryKey:['auth']})
        },
        
    })

    const handleRegister = (data: { email: string; password: string,username:string }) => {
      mutation.mutate(data);
    };

  return {mutation,handleRegister}
}

export default useRegisterMutation