import { useState } from "react"
import { AlertCircle, ChevronDown, RefreshCw, XCircle } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { cn } from "~/lib/utils"

interface ErrorContentProps {
  title?: string
  description?: string
  errorDetails?: string
  errorCode?: string | number
  severity?: "warning" | "error" | "critical"
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
  fullWidth?: boolean
}

export function ErrorContent({
  title = "An error occurred",
  description = "We couldn't load the content you requested.",
  errorDetails,
  errorCode,
  severity = "error",
  onRetry,
  onDismiss,
  className,
  fullWidth = false,
}: ErrorContentProps) {
  const [isOpen, setIsOpen] = useState(false)

  const severityConfig = {
    warning: {
      icon: AlertCircle,
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800/50",
      text: "text-amber-800 dark:text-amber-300",
    },
    error: {
      icon: XCircle,
      gradient: "from-red-500 to-rose-500",
      bgLight: "bg-red-50",
      bgDark: "dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800/50",
      text: "text-red-800 dark:text-red-300",
    },
    critical: {
      icon: XCircle,
      gradient: "from-red-600 to-purple-600",
      bgLight: "bg-red-50",
      bgDark: "dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800/50",
      text: "text-red-800 dark:text-red-300",
    },
  }

  const config = severityConfig[severity]
  const Icon = config.icon

  return (
    <div 
      className={cn(
        "w-full my-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-300", 
        !fullWidth && "max-w-3xl mx-auto",
        className
      )}
    >
      <Card
        className={cn(
          "overflow-hidden border",
          config.bgLight,
          config.bgDark,
          config.border
        )}
      >
        <div className={cn("h-1.5 w-full bg-gradient-to-r", config.gradient)} />
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              config.bgLight,
              "border",
              config.border
            )}
          >
            <Icon className={cn("h-5 w-5", config.text)} />
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-0">
          {(errorDetails || errorCode) && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("flex w-full items-center justify-between p-0 h-8", config.text)}
                >
                  <span className="text-xs">Error details</span>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="rounded-md bg-slate-950/5 dark:bg-slate-50/5 p-3 text-xs font-mono overflow-x-auto">
                  {errorCode && <div className="mb-2">Error code: {errorCode}</div>}
                  {errorDetails && <div className="whitespace-pre-wrap">{errorDetails}</div>}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2 p-4">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
