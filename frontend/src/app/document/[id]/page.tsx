"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDetailDoc } from "@/hooks/document";
import { formatYmd } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function DocumentDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: docDetail, isLoading, isError } =
    id !== undefined ? useDetailDoc(Number(id)) : { data: undefined, isLoading: false, isError: false } as any;

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>문서 상세</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && (
            <div className="text-sm text-gray-500">불러오는 중...</div>
          )}
          {isError && (
            <div className="text-sm text-red-600">문서 정보를 불러오지 못했습니다.</div>
          )}
          {!isLoading && !isError && docDetail && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="doc_no">문서번호</Label>
                  <Input id="doc_no" value={String(docDetail.doc_no ?? '')} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crt_date">상신일</Label>
                  <Input id="crt_date" value={formatYmd(docDetail.crt_date)} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_dept">기안학과</Label>
                  <Input id="user_dept" value={docDetail.user_dept ?? ''} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc_user_id">기안자</Label>
                  <Input id="doc_user_id" value={docDetail.doc_user_id ?? ''} readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc_ttl">제목</Label>
                <Input id="doc_ttl" value={docDetail.doc_ttl ?? ''} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc_text">본문내용</Label>
                <Textarea id="doc_text" value={docDetail.doc_text ?? ''} readOnly className="h-64" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
