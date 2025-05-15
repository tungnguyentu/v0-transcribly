"use client"

import React from "react"
import { SWRConfig } from "swr"

// Default fetcher for SWR
export const fetcher = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // Attach extra info to the error object.
    const info = await res.json()
    ;(error as any).info = info
    ;(error as any).status = res.status
    throw error
  }

  return res.json()
}

// SWR configuration options
export const swrOptions = {
  fetcher,
  revalidateOnFocus: false, // Don't revalidate when window gets focused
  revalidateIfStale: false, // Don't revalidate if data is stale
  revalidateOnReconnect: true, // Revalidate when browser regains connection
  dedupingInterval: 10000, // Dedupe requests with the same key in this time span
}

// SWR Provider component
export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrOptions}>
      {children}
    </SWRConfig>
  )
} 