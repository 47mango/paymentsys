"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useFormDocument } from "@/hooks/document";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserList } from "@/hooks/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// 결재자 타입 정의
interface Approver {
  id: string;
  name: string;
}

export default function DocumentDraftForm() {
  const [title, setTitle] = useState("");
  const [drafter, setDrafter] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [approvers, setApprovers] = useState<Approver[]>([]);
  const [fileName, setFileName] = useState("");
  const [docText, setDocText] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: session } = useSession();
  const router = useRouter();
  const userInfo = session?.user;

  // React Query mutation 훅은 컴포넌트 최상위에서 선언해야 합니다.
  const createDocMutation = useFormDocument();
  const {data : userList} = useUserList();

  // 세션에서 사용자 정보를 가져와서 drafter state에 설정
  useEffect(() => {
    if (userInfo?.name) {
      setDrafter(userInfo.name);
    }
  }, [userInfo?.name]);

  // 세션에서 사용자 정보를 가져와서 drafter state에 설정
  useEffect(() => {
    if (userInfo?.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo?.email]);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // 결재자 추가
  const addApprover = () => {
    const newApprover: Approver = {
      id: Date.now().toString(),
      name: "",
    };
    setApprovers([...approvers, newApprover]);
  };

  // 결재자 삭제
  const removeApprover = (id: string) => {
    setApprovers(approvers.filter((approver) => approver.id !== id));
  };

  // 결재자 이름 변경
  const updateApproverName = (id: string, name: string) => {
    setApprovers(
      approvers.map((approver) =>
        approver.id === id ? { ...approver, name } : approver
      )
    );
  };

  // 결재자 순서 변경 (위로)
  const moveApproverUp = (index: number) => {
    if (index === 0) return;
    const newApprovers = [...approvers];
    [newApprovers[index - 1], newApprovers[index]] = [
      newApprovers[index],
      newApprovers[index - 1],
    ];
    setApprovers(newApprovers);
  };

  // 결재자 순서 변경 (아래로)
  const moveApproverDown = (index: number) => {
    if (index === approvers.length - 1) return;
    const newApprovers = [...approvers];
    [newApprovers[index], newApprovers[index + 1]] = [
      newApprovers[index + 1],
      newApprovers[index],
    ];
    setApprovers(newApprovers);
  };

  // 사용자 선택 토글
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // 선택된 사용자들을 결재자에 추가
  const addSelectedUsersToApprovers = () => {
    if (!userList || selectedUsers.length === 0) return;
    
    const newApprovers = selectedUsers.map(userId => {
      const user = userList.find((u: any) => u.user_id === userId);
      return {
        id: userId,
        name: user?.user_name || '',
      };
    });
    
    // 중복 제거 (이미 결재자 목록에 있는 사용자는 제외)
    const existingApproverIds = approvers.map(a => a.id);
    const uniqueNewApprovers = newApprovers.filter(approver => 
      !existingApproverIds.includes(approver.id)
    );
    
    setApprovers([...approvers, ...uniqueNewApprovers]);
    setSelectedUsers([]); // 선택 상태 초기화
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 데이터 구성
    const formData = {
      doc_ttl : title,
      user_id : email,
      doc_file : file ? file.name : null,
      doc_text : docText,
      doc_line: approvers.map((approver, index) => ({
        seq: index + 1,
        apvr_id: approver.name,
      })),
    };

    try {
      console.log("createDocMutation",createDocMutation);
      await createDocMutation.mutateAsync(formData);
      alert("문서가 기안되었습니다.");
      router.push("/document");
    } catch (error) {
      console.error("문서 기안 실패:", error);
      alert("문서 기안에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-50 p-6 w-full">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>문서 기안서</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="문서 제목을 입력하세요"
              required
            />
          </div>

          {/* 기안자 */}
          <div className="space-y-2">
            <Label htmlFor="drafter">기안자</Label>
            <Input
              id="drafter"
              value={drafter}
              onChange={(e) => setDrafter(e.target.value)}
              placeholder="기안자 이름을 입력하세요"
              required
              readOnly
            /> 
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">본문내용</Label>
            <Textarea
              id="content"
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              placeholder="본문내용을 입력하세요"
              className="h-70"
              required
            />
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-2">
            <Label htmlFor="file">파일</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file")?.click()}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                파일 선택
              </Button>
              <span className="text-sm text-gray-500">
                {fileName || "선택된 파일 없음"}
              </span>
            </div>
          </div>

          {/* 결재선 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>결재선</Label>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      >
                      <PlusCircle size={16} />
                        결재자 추가
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>결제자 추가</DialogTitle>
                        <DialogDescription>
                          <Card className="mt-4">
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableHead className="text-center font-medium">-</TableHead>
                                  <TableHead className="text-center font-medium">이름</TableHead>
                                  <TableHead className="text-center font-medium">소속과</TableHead>
                                  <TableHead className="text-center font-medium">소속</TableHead>
                                </TableHeader>
                                <TableBody>
                                  {userList?.map((item:any,idx : any) => (
                                    <TableRow key={item.user_id} className="hover:bg-gray-50">
                                    <TableCell className="text-center">
                                      <Checkbox 
                                        id={item.user_id}
                                        checked={selectedUsers.includes(item.user_id)}
                                        onCheckedChange={() => toggleUserSelection(item.user_id)}
                                      />
                                    </TableCell>
                                    <TableCell className="text-center text-sm">{item.user_name}</TableCell>
                                    <TableCell className="text-center text-sm">컴퓨터공학부</TableCell>
                                    <TableCell className="text-center text-sm">동양미래대학교</TableCell>
                                  </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                            <CardFooter className="gap-4 self-end">
                              <DialogClose asChild>
                                <Button variant="outline">취소</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={addSelectedUsersToApprovers}>확인</Button>
                              </DialogClose>
                            </CardFooter>
                          </Card>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
            </div>

            {approvers.length === 0 ? (
              <div className="text-center py-4 text-sm text-gray-500 border border-dashed rounded-md">
                결재자를 추가해주세요
              </div>
            ) : (
              <div className="space-y-3">
                {approvers.map((approver, index) => (
                  <div
                    key={approver.id}
                    className="flex items-center gap-2 p-3 border rounded-md"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <Input
                          value={approver.name}
                          onChange={(e) =>
                            updateApproverName(approver.id, e.target.value)
                          }
                          placeholder="결재자 이름"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveApproverUp(index)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveApproverDown(index)}
                        disabled={index === approvers.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeApprover(approver.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            문서 기안하기
          </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
