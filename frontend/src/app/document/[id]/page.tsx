"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDetailDoc } from "@/hooks/document";
import { formatYmd } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { 
  Download, 
  User, 
  FileText, 
  Calendar, 
  Building, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Printer,
  Upload
} from "lucide-react";

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: docDetail, isLoading, isError } =
    id !== undefined ? useDetailDoc(Number(id)) : { data: undefined, isLoading: false, isError: false } as any;

  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");

  useEffect(() => {
    if (docDetail) {
      setPrimaryCategory(docDetail.doc_ctgr1 ?? "");
      setSecondaryCategory(docDetail.doc_ctgr2 ?? "");
    }
  }, [docDetail]);

  console.log("docDetail", docDetail);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">문서를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !docDetail) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">문서를 불러올 수 없습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "진행중":
        return <Badge className="bg-blue-100 text-blue-800">진행중</Badge>;
      case "승인":
        return <Badge className="bg-green-100 text-green-800">승인</Badge>;
      case "반려":
        return <Badge className="bg-red-100 text-red-800">반려</Badge>;
      case "대기":
        return <Badge className="bg-yellow-100 text-yellow-800">대기</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                뒤로가기
              </Button>
              <CardTitle>문서 상세</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer size={16} />
                인쇄
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                다운로드
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={docDetail.doc_ttl || "문서 제목"}
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* 문서요약 */}
          <div className="space-y-2">
            <Label htmlFor="content">문서요약본</Label>
            <Textarea
              id="content"
              value={docDetail.doc_summary || "문서 내용이 여기에 표시됩니다.\n\n이 문서는 업무 관련 내용을 담고 있으며, 적절한 절차를 거쳐 승인을 받아야 합니다."}
              readOnly
              className="h-70 bg-gray-50"
            />
          </div>

          {/* 기안자 */}
          <div className="space-y-2">
            <Label htmlFor="drafter">기안자</Label>
            <Input
              id="drafter"
              value={docDetail.doc_user_id || "홍길동"}
              readOnly
              className="bg-gray-50"
            /> 
          </div>

          {/* 소속 */}
          <div className="space-y-2">
            <Label htmlFor="department">소속</Label>
            <Input
              id="department"
              value={docDetail.user_dept || "컴퓨터공학부"}
              readOnly
              className="bg-gray-50"
            /> 
          </div>

          {/* 카테고리 */}
          <div className="space-y-2">
            <Label htmlFor="department">카테고리</Label>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Input
                id="category-primary"
                value={primaryCategory}
                onChange={(e) => setPrimaryCategory(e.target.value)}
                placeholder="주요 카테고리"
              />
              <Input
                id="category-secondary"
                value={secondaryCategory}
                onChange={(e) => setSecondaryCategory(e.target.value)}
                placeholder="세부 카테고리"
              />
            </div>
          </div>

          {/* 상신일 */}
          <div className="space-y-2">
            <Label htmlFor="date">상신일</Label>
            <Input
              id="date"
              value={formatYmd(docDetail.crt_date) || "2024.01.15"}
              readOnly
              className="bg-gray-50"
            /> 
          </div>

          {/* 문서번호 */}
          <div className="space-y-2">
            <Label htmlFor="docNo">문서번호</Label>
            <Input
              id="docNo"
              value={docDetail.doc_no || "DOC-001"}
              readOnly
              className="bg-gray-50"
            /> 
          </div>

          {/* 결재상태 */}
          <div className="space-y-2">
            <Label htmlFor="status">결재상태</Label>
            <div className="flex items-center gap-2">
              <Input
                id="status"
                value={docDetail.doc_status || "진행중"}
                readOnly
                className="bg-gray-50"
              />
              {getStatusBadge(docDetail.doc_status || "진행중")}
            </div>
          </div>

          {/* 본문내용 */}
          <div className="space-y-2">
            <Label htmlFor="content">본문내용</Label>
            <Textarea
              id="content"
              value={docDetail.doc_text || "문서 내용이 여기에 표시됩니다.\n\n이 문서는 업무 관련 내용을 담고 있으며, 적절한 절차를 거쳐 승인을 받아야 합니다."}
              readOnly
              className="h-70 bg-gray-50"
            />
          </div>

          {/* 첨부파일 */}
          <div className="space-y-2">
            <Label htmlFor="file">첨부파일</Label>
            <div className="space-y-2">
              {docDetail.attached_files && docDetail.attached_files.length > 0 ? (
                docDetail.attached_files.map((file: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download size={14} />
                      다운로드
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500 border border-dashed rounded-md">
                  첨부파일이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 결재선 */}
          <div className="space-y-4">
            <Label>결재선</Label>
            {docDetail.doc_line && docDetail.doc_line.length > 0 ? (
              <div className="space-y-3">
                {docDetail.doc_line.map((approver: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 border rounded-md"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <Input
                          value={approver.apvr_id || `결재자 ${index + 1}`}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {approver.status === "승인" && <CheckCircle size={20} className="text-green-600" />}
                      {approver.status === "반려" && <XCircle size={20} className="text-red-600" />}
                      {approver.status === "대기" && <Clock size={20} className="text-yellow-600" />}
                      <Badge variant={approver.status === "승인" ? "default" : approver.status === "반려" ? "destructive" : "secondary"}>
                        {approver.status || "대기"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500 border border-dashed rounded-md">
                결재선이 설정되지 않았습니다.
              </div>
            )}
          </div>

          {/* 결재 의견 */}
          {docDetail.approval_comments && docDetail.approval_comments.length > 0 && (
            <div className="space-y-4">
              <Label>결재 의견</Label>
              <div className="space-y-3">
                {docDetail.approval_comments.map((comment: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-medium">{comment.approver}</span>
                      </div>
                      <div className="text-sm text-gray-500">{formatYmd(comment.date)}</div>
                    </div>
                    <div className="text-sm text-gray-700">{comment.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button>수정하기</Button>
        </CardContent>
      </Card>
    </div>
  );
}
