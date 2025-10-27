import { axiosInstance } from "./axios";



export const getApplyUser= async (body:any) => {
    const response = await axiosInstance.post(`/api/user/join`,body);
    return response.data;
}

export const getUserList = async () => {
    const response = await axiosInstance.get(`/api/user`);
    return response.data;
}