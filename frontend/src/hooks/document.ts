import { createDocument, getDocumentDetail, getDocumentList } from "@/services/api/document";
import { useMutation, useQuery } from '@tanstack/react-query';

export interface DocListItem {
  doc_no: string
  user_dept: string
  doc_ttl: string
  doc_user_id: string
  crt_date: string | number
}

export const useFormDocument = () => {
  return useMutation({
    mutationKey: ['createDocument'],
    mutationFn: (body: any) => createDocument(body),
  });
};

export const useDocList = (name: string) => {
  return useQuery<DocListItem[]>({
    queryKey: ['docList'],
    queryFn: () => getDocumentList({ user_id: name }),
  });
};

export const useDetailDoc = (docNo : Number) => {
    return useQuery({
        queryKey:['DetailDoc'],
        queryFn: () => getDocumentDetail({ doc_no : docNo })
    })
}