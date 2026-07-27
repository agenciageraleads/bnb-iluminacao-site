import type { Metadata } from "next"

import { SegmentLandingPage, createSegmentMetadata } from "@/components/seo/segment-landing-page"
import { segmentPages } from "@/lib/seo/segment-pages"

const config = segmentPages["revendas"]

export const metadata: Metadata = createSegmentMetadata(config)

export default function RevendasPage() {
    return <SegmentLandingPage config={config} />
}
