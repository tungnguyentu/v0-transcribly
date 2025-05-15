import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { PageTransition } from "@/components/page-transition"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>
              <DashboardContent />
            </PageTransition>
          </Suspense>
        </div>
      </main>
    </div>
  )
}
