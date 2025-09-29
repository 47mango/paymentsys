import { axiosInstance } from "./axios";


export const getDocumentList = async (userInfo: any) => {
    const response = await axiosInstance.get('/api/retrieve',userInfo);
    return response.data;
}

export const getDocumentDetail = async (id: string) => {
    const response = await axiosInstance.get(`/api/retrieve/doc_no=${id}`);
    return response.data;
}

export const createDocument = async (document: any) => {
    const response = await axiosInstance.post('/api/draft', document);
    return response.data;
}