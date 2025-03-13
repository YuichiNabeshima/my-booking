import type React from "react"

import { useState, useRef, useEffect } from "react"
import {  ChevronDown } from "lucide-react"
import { cn } from "~/lib/utils"

interface AccordionProps {
  children: React.ReactNode
  defaultOpen?: boolean
  title: React.ReactNode
  icon: React.ReactNode
  description?: string
  className?: string
}

export const Accordion = ({
  children,
  defaultOpen = false,
  title,
  icon,
  description,
  className,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(defaultOpen ? undefined : 0)

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (isOpen) {
            setContentHeight(entry.contentRect.height)
          }
        }
      })

      resizeObserver.observe(contentRef.current)
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setContentHeight(contentRef.current.scrollHeight)
      } else {
        setContentHeight(0)
      }
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-slate-200 dark:border-slate-800 overflow-hidden",
        isOpen && "shadow-md",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div className="flex flex-col items-start text-left">
            <span className="font-medium">{title}</span>
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: contentHeight !== undefined ? `${contentHeight}px` : "auto" }}
        aria-hidden={!isOpen}
      >
        <div className="pt-2 pb-4 px-4" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}