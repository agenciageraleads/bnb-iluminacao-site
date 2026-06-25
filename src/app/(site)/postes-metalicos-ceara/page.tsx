import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.ceara

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosCearaPage() {
    return <RegionalUfPage data={data} />
}
