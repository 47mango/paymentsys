import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 8자리 날짜 문자열(예: 20251009)을 2025-10-09 형식으로 변환
export function formatYmd(compactYmd?: string | number | null): string {
  const str = String(compactYmd ?? '')
  if (!/^\d{8}$/.test(str)) return str
  const y = str.slice(0, 4)
  const m = str.slice(4, 6)
  const d = str.slice(6, 8)
  return `${y}-${m}-${d}`
}
