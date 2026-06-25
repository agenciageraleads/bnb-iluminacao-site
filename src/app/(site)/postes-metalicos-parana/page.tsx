import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.parana

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosParanaPage() {
    return <RegionalUfPage data={data} />
}
