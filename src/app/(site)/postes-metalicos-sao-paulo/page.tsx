import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.saoPaulo

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosSaoPauloPage() {
    return <RegionalUfPage data={data} />
}
