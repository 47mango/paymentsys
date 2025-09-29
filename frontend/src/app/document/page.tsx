"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarIcon, RefreshCw } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Checkbox } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { getDocumentList } from "@/services/api/document"
import { useSession } from "next-auth/react"

// Mock data for the document list
const mockDocuments = [
  {
    id: 1,
    type: "업무협조",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.09.30 15:42",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "진행중",
  },
  {
    id: 2,
    type: "업무협조",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.09.27 12:23",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 3,
    type: "업무협조",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.09.14 14:30",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 4,
    type: "업무협조",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.26 18:21",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 5,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.26 14:36",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "진행중",
  },
  {
    id: 6,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.26 14:33",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 7,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.26 14:26",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "진행중",
  },
  {
    id: 8,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.19 10:05",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 9,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.13 17:04",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
  {
    id: 10,
    type: "업무기안",
    title: "카카오톡 전자결재 기안",
    author: "김카톡(kim.kw) | 카카오워크",
    submissionDate: "2021.08.13 16:54",
    approvalLine: "이카톡(lee.kw) | 카카오워크",
    status: "상신",
  },
]

export default function DocumentListPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [documentType, setDocumentType] = useState("전체")
  const [approvalStatus, setApprovalStatus] = useState("전체")
  const [searchType, setSearchType] = useState("기안제목")
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [documentList, setDocumentList] = useState<any[]>([]);
  const [email, setEmail] = useState<string | null>("");

  const router = useRouter()

  const totalItems = 30

  const { data: session } = useSession();

  const userInfo = session?.user;

  // 세션에서 사용자 정보를 가져와서 drafter state에 설정
  useEffect(() => {
    if (userInfo?.name) {
      setEmail(userInfo.email ?? "");
    }
  }, [userInfo?.email]);


  useEffect(() => {
    if (email) {
    getDocumentList({user_id: email}).then((res) => {
        setDocumentList(res);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">결재 현황</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>2021.10.14 14:08:16 기준</span>
            <Button variant="ghost" size="sm" className="p-1">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">상신일</label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "yyyy.MM.dd", { locale: ko }) : "2021.07.14"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <span className="text-gray-500">~</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "yyyy.MM.dd", { locale: ko }) : "2021.10.15"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div></div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">기안양식</label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체</SelectItem>
                    <SelectItem value="업무협조">업무협조</SelectItem>
                    <SelectItem value="업무기안">업무기안</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">검색어</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="기안제목">기안제목</SelectItem>
                    <SelectItem value="기안자">기안자</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">제목 입력</label>
                <Input placeholder="제목 입력" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>

              {/* Search Button */}
              <div className="flex items-end justify-around">
                <Button className=" bg-gray-700 hover:bg-gray-800">조회</Button>
                <Button className=" bg-gray-700 hover:bg-gray-800" onClick={() => router.push("/document/form")}>기안하기</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">총</span>
                <span className="text-sm font-medium">{totalItems}건</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">페이지 사이즈</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-medium">-</TableHead>
                  <TableHead className="text-center font-medium">기안양식</TableHead>
                  <TableHead className="text-center font-medium">기안학과</TableHead>
                  <TableHead className="text-center font-medium">기안자</TableHead>
                  <TableHead className="text-center font-medium">상신일시</TableHead>
                  <TableHead className="text-center font-medium">결재라인</TableHead>
                  <TableHead className="text-center font-medium">결재상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentList.map((doc) => (
                  <TableRow key={doc.doc_no} className="hover:bg-gray-50">
                    <TableCell className="text-center"><Checkbox id={doc.id.toString()} /></TableCell>
                    <TableCell className="text-center">{doc.user_dept}</TableCell>
                    <TableCell className="text-center">
                      <button className="text-blue-600 hover:underline">{doc.doc_ttl}</button>
                    </TableCell>
                    <TableCell className="text-center text-sm">{doc.doc_user_id}</TableCell>
                    <TableCell className="text-center text-sm">{doc.crt_date}</TableCell>
                    <TableCell className="text-center text-sm">"동양미래대학교"</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          "진행중" === "진행중" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {"진행중"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center py-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant={currentPage === 1 ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(1)}>
                  1
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
