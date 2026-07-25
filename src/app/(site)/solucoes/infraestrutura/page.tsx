import type { Metadata } from "next"

import { SegmentLandingPage, createSegmentMetadata } from "@/components/seo/segment-landing-page"
import { segmentPages } from "@/lib/seo/segment-pages"

const config = segmentPages["infraestrutura"]

export const metadata: Metadata = createSegmentMetadata(config)

export default function InfraestruturaPage() {
    return <SegmentLandingPage config={config} />
}
