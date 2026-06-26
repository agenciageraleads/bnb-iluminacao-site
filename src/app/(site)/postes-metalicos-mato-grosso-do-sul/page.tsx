import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.matoGrossoDoSul

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosMatoGrossoDoSulPage() {
    return <RegionalUfPage data={data} />
}
