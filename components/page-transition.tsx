"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Set isFirstMount to false after the first render
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  // Don't animate on first mount
  if (isFirstMount) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
