import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.minasGerais

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosMinasGeraisPage() {
    return <RegionalUfPage data={data} />
}
