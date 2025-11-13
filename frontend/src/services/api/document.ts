import { axiosInstance } from "./axios";


export const getDocumentList = async (body: any) => {
    const response = await axiosInstance.post('/api/retrieve',body);
    return response.data;
}

export const getDocumentDetail = async (body: any) => {
    const response = await axiosInstance.post(`/api/retrieve/doc`,body);
    return response.data;
}

export const createDocument = async (document: any) => {
    const response = await axiosInstance.post('/api/draft', document);
    return response.data;
}

export const getCategory = async (body : any) => {
    const response = await axiosInstance.post('/api/retrieve/category',body);
    return response.data;
}

export const postCategroy = async (body : any) => {
    const response = await axiosInstance.post('/api/update/doc',body);
    return response.data;
}