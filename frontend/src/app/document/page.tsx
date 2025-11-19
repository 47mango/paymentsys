"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarIcon, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Checkbox } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDocList, DocListItem, useCarList } from "@/hooks/document"
import { formatYmd } from "@/lib/utils"
import Link from "next/link"
import { useUser } from "@/hooks/user"

export default function DocumentListPage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [documentType, setDocumentType] = useState("전체")
  const [approvalStatus, setApprovalStatus] = useState("전체")
  const [searchType, setSearchType] = useState("제목")
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  
  const applyUser = useUser();

  const today = new Date();
  console.log(today)

  const { data: session } = useSession();

  const userInfo = session?.user;
  const name = userInfo?.name ?? "";
  const email = userInfo?.email ?? "";

  useEffect(() => {
    if (session && session.user?.email) {
      console.log("일단 세션 있음");
      applyUser.mutate({
        user_name: session.user?.name ?? '',
        user_id: session.user?.email ?? '',
      });
    }
  }, [session]);

  const { data : docList } = useDocList(email);
  const { data : caList } = useCarList(email);

  // 조회 버튼으로 적용되는 필터 상태 (기안일 제외)
  const [appliedDocumentType, setAppliedDocumentType] = useState<string>("전체")
  const [appliedSearchType, setAppliedSearchType] = useState<string>("제목")
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("")

  // 조회 버튼 클릭 시 필터 적용
  const applyFilters = () => {
    setAppliedDocumentType(documentType)
    setAppliedSearchType(searchType)
    setAppliedSearchQuery(searchQuery.trim())
    setCurrentPage(1)
  }

  // 필터링된 리스트 (기안일 제외)
  const filteredList = useMemo(() => {
    const source = docList ?? []
    return source.filter((doc) => {
      // 유형 필터 (doc_ctgr1 또는 doc_ctgr2에 일치)
      const matchType =
        appliedDocumentType === "전체" ||
        doc.doc_ctgr1 === appliedDocumentType ||
        doc.doc_ctgr2 === appliedDocumentType

      // 검색어 필터
      const query = appliedSearchQuery
      const matchQuery =
        query === "" ||
        (appliedSearchType === "제목" && (doc.doc_ttl ?? "").toLowerCase().includes(query.toLowerCase())) ||
        (appliedSearchType === "기안자" && (doc.doc_user_id ?? "").toLowerCase().includes(query.toLowerCase()))

      return matchType && matchQuery
    })
  }, [docList, appliedDocumentType, appliedSearchType, appliedSearchQuery])

  // 페이징 로직
  const totalItems = filteredList.length || 0;
  const itemsPerPage = parseInt(pageSize);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 현재 페이지에 표시할 데이터 계산
  const paginatedData = useMemo(() => {
    if (!filteredList) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, currentPage, itemsPerPage]);

  // 페이지 사이즈 변경 시 첫 페이지로 이동
  const handlePageSizeChange = (newPageSize: string) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  // 페이지 변경 함수
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">결재 현황</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{typeof today === 'string' ? today : today instanceof Date ? today.toLocaleDateString() : ''}</span>
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
                <label className="text-sm font-medium text-gray-700">기안일</label>
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
                <label className="text-sm font-medium text-gray-700">유형</label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  {caList?.doc_CTGR?.map((item: string, idx: number) => {
                    if (!item) return null; // 빈 문자열이면 렌더하지 않음
                    return (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Search Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">검색어</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="제목">제목</SelectItem>
                    <SelectItem value="기안자">기안자</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm w-full font-medium text-gray-700">제목 입력</label>
                <Input placeholder="제목 입력" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>

              {/* Search Button */}
              <div className="flex items-end justify-around">
                <Button className=" bg-gray-700 hover:bg-gray-800" onClick={applyFilters}>조회</Button>
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
                <span className="text-sm font-medium">{filteredList.length}건</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">페이지 사이즈</span>
                <Select value={pageSize} onValueChange={handlePageSizeChange}>
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
                  <TableHead className="text-center font-medium">제목</TableHead>
                  <TableHead className="text-center font-medium">기안자</TableHead>
                  <TableHead className="text-center font-medium">유형</TableHead>
                  <TableHead className="text-center font-medium">상신일시</TableHead>
                  <TableHead className="text-center font-medium">결재라인</TableHead>
                  <TableHead className="text-center font-medium">결재상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData?.map((doc: DocListItem) => (
                  <TableRow key={doc.doc_no} className="hover:bg-gray-50">
                    <TableCell className="text-center"><Checkbox id={doc.doc_no} /></TableCell>
                    <TableCell className="text-center">
                      <Link className="text-blue-600 hover:underline" href={`/document/${doc.doc_no}`}>{doc.doc_ttl}</Link>
                    </TableCell>
                    <TableCell className="text-center text-sm">{doc.doc_user_id}</TableCell>
                    <TableCell className="text-center text-sm">
                      {doc.doc_ctgr2 ? `${doc.doc_ctgr1}, ${doc.doc_ctgr2}` : doc.doc_ctgr1}
                    </TableCell>
                    <TableCell className="text-center text-sm">{formatYmd(doc.crt_date)}</TableCell>
                    <TableCell className="text-center text-sm">동양미래대학교</TableCell>
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
            <div className="flex items-center justify-between py-4 px-6 border-t bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  {totalItems > 0 ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)}` : '0-0'} 
                  / {totalItems}건
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* 이전 페이지 버튼 */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  이전
                </Button>
                
                {/* 페이지 번호들 */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
                
                {/* 다음 페이지 버튼 */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="flex items-center gap-1"
                >
                  다음
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

