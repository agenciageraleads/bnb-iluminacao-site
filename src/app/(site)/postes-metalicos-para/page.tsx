import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.paraState

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosParaPage() {
    return <RegionalUfPage data={data} />
}
