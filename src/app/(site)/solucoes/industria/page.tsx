import type { Metadata } from "next"

import { SegmentLandingPage, createSegmentMetadata } from "@/components/seo/segment-landing-page"
import { segmentPages } from "@/lib/seo/segment-pages"

const config = segmentPages["industria"]

export const metadata: Metadata = createSegmentMetadata(config)

export default function IndustriaPage() {
    return <SegmentLandingPage config={config} />
}
