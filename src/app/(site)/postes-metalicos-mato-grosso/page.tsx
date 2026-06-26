import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.matoGrosso

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosMatoGrossoPage() {
    return <RegionalUfPage data={data} />
}
