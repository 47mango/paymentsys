import { getApplyUser, getUserList } from "@/services/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useUser = () => {
    return useMutation({
        mutationKey: ['applyUser'],
        mutationFn: (body: any) => getApplyUser(body),
    })
}

export const useUserList = () => {
    return useQuery({
        queryKey: ['userList'],
        queryFn: () => getUserList(),
    })
}