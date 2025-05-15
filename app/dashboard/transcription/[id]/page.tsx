import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TranscriptionDetailSkeleton } from "@/components/transcription-detail-skeleton"
import { PageTransition } from "@/components/page-transition"
import { TranscriptionDetailContent } from "@/components/transcription-detail-content"

export default function TranscriptionPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container py-8">
          <Suspense fallback={<TranscriptionDetailSkeleton />}>
            <PageTransition>
              <TranscriptionDetailContent id={params.id} />
            </PageTransition>
          </Suspense>
        </div>
      </main>
    </div>
  )
}
