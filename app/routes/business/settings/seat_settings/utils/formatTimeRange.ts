export function formatTimeRange(timeSegment: string) {
  const [_, startHour, endHour] = timeSegment.match(/time_(\d+)_(\d+)/) || []

  if (!startHour || !endHour) return timeSegment

  const start = Number.parseInt(startHour)
  const end = Number.parseInt(endHour)

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM"
    if (hour === 12) return "12 PM"
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`
  }

  return `${formatHour(start)} - ${formatHour(end)}`
}