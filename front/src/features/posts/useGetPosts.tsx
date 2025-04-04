import { useQuery } from '@tanstack/react-query'


const useGetPosts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts')
      const data = await response.json()
      return data
    },
  })
  return {data,isError,isLoading}
}

export default useGetPosts