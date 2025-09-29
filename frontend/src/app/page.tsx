export default function HomePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">총 프로젝트</h3>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">지난 달 대비 +20.1%</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">활성 작업</h3>
          </div>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-muted-foreground">지난 주 대비 +5개</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">팀 멤버</h3>
          </div>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">새로운 멤버 2명 추가</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">완료율</h3>
          </div>
          <div className="text-2xl font-bold">87%</div>
          <p className="text-xs text-muted-foreground">목표 대비 +12%</p>
        </div>
      </div>
    </div>
  )
}
