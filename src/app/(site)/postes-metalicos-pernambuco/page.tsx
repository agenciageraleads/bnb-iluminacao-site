import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.pernambuco

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosPernambucoPage() {
    return <RegionalUfPage data={data} />
}
