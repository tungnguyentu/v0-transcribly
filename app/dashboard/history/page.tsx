import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { HistorySkeleton } from "@/components/history-skeleton"
import { PageTransition } from "@/components/page-transition"
import { HistoryContent } from "@/components/history-content"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container py-8">
          <Suspense fallback={<HistorySkeleton />}>
            <PageTransition>
              <HistoryContent />
            </PageTransition>
          </Suspense>
        </div>
      </main>
    </div>
  )
}
