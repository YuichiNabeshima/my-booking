import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "~/lib/utils"

type ToastType = "success" | "error" | "info"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export const ToastNotification = ({ message, type = "success", duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300) // Wait for exit animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  }

  const colors = {
    success: "bg-green-600 text-white border-green-700",
    error: "bg-red-600 text-white border-red-700",
    info: "bg-blue-600 text-white border-blue-700",
  }

  const iconColors = {
    success: "text-white",
    error: "text-white",
    info: "text-white",
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transform transition-all duration-300 ease-in-out",
        isVisible ? "top-4" : "-top-24",
      )}
    >
      <div className={cn("flex items-center gap-3 rounded-lg border px-4 py-3 shadow-md", colors[type])}>
        <span className={iconColors[type]}>{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
        <button onClick={() => setIsVisible(false)} className="ml-auto rounded-full p-1 hover:bg-black/5">
          <X className="h-4 w-4 opacity-70" />
        </button>
      </div>
    </div>
  )
}

