import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.rioGrandeDoSul

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosRioGrandeDoSulPage() {
    return <RegionalUfPage data={data} />
}
