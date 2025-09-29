"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type EventItem = {
  id: number
  title: string
  date: string // YYYY-MM-DD
  time: string
  duration: string
  location: string
  attendees: number
  color: string // Tailwind bg class
}

// 샘플 이벤트 데이터
const sampleEvents: EventItem[] = [
  {
    id: 1,
    title: "팀 미팅",
    date: "2024-01-15",
    time: "10:00",
    duration: "1시간",
    location: "회의실 A",
    attendees: 5,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "프로젝트 리뷰",
    date: "2024-01-15",
    time: "14:00",
    duration: "2시간",
    location: "온라인",
    attendees: 8,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "클라이언트 미팅",
    date: "2024-01-16",
    time: "09:00",
    duration: "1.5시간",
    location: "외부",
    attendees: 3,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "디자인 워크샵",
    date: "2024-01-17",
    time: "13:00",
    duration: "3시간",
    location: "회의실 B",
    attendees: 12,
    color: "bg-orange-500",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [events, setEvents] = useState<EventItem[]>(sampleEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // 현재 월의 첫 번째/마지막 날 계산
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay() // 0(일) ~ 6(토)
  const daysInMonth = lastDayOfMonth.getDate()

  // 월 변경 시 고유 키 안정화용
  const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`

  // 달력 그리드 생성 (항상 6주 = 42칸 유지)
  const calendarDays: Array<number | null> = []
  // 이전 달의 빈 칸들
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null)
  }
  // 현재 달의 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }
  // 42칸(6주)으로 패딩
  while (calendarDays.length < 42) {
    calendarDays.push(null)
  }

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    return `${year}-${month}-${dayStr}`
  }

  const getEventsForDate = (day: number) => {
    const dateStr = formatDate(day)
    return events.filter((event) => event.date === dateStr)
  }

  // 오른쪽 패널에서 선택된 날짜가 없으면 "오늘"의 일정을 보여주도록 보완
  const todayStr = new Date().toISOString().split("T")[0]
  const listDate = selectedDate ?? todayStr
  const listEvents = events.filter((event) => event.date === listDate)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">캘린더</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              새 이벤트
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>새 이벤트 추가</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input id="title" placeholder="이벤트 제목을 입력하세요" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">날짜</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">시간</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">위치</Label>
                <Input id="location" placeholder="위치를 입력하세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">설명</Label>
                <Textarea id="description" placeholder="이벤트 설명을 입력하세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">색상</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="색상을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">파란색</SelectItem>
                    <SelectItem value="green">초록색</SelectItem>
                    <SelectItem value="purple">보라색</SelectItem>
                    <SelectItem value="orange">주황색</SelectItem>
                    <SelectItem value="red">빨간색</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>저장</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    // 빈칸도 월 키를 포함한 고유 key 사용
                    return <div key={`empty-${monthKey}-${idx}`} className="p-1 h-20 border rounded bg-transparent" />
                  }

                  const dateStr = formatDate(day)
                  const dayEvents = getEventsForDate(day)
                  const isSelected = selectedDate === dateStr
                  const isToday =
                    new Date().toDateString() ===
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

                  return (
                    <div
                      key={`day-${dateStr}`} // 날짜 칸 고유 key (YYYY-MM-DD)
                      className={`p-1 h-20 border rounded cursor-pointer transition-colors hover:bg-muted ${
                        isSelected ? "bg-primary/10 border-primary" : ""
                      } ${isToday ? "bg-accent" : ""}`}
                      onClick={() => setSelectedDate(dateStr)}
                    >
                      <div className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</div>
                      <div className="space-y-1 mt-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} 더보기</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedDate ? `${selectedDate} 일정` : "오늘의 일정"}</CardTitle>
            </CardHeader>
            <CardContent>
              {listEvents.length > 0 ? (
                <div className="space-y-3">
                  {listEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {event.attendees}명 참석
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${event.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  {selectedDate ? "선택된 날짜에 일정이 없습니다." : "오늘 일정이 없습니다."}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">다가오는 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
