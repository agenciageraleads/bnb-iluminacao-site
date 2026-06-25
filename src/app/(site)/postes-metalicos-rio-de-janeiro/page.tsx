import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.rioDeJaneiro

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosRioDeJaneiroPage() {
    return <RegionalUfPage data={data} />
}
