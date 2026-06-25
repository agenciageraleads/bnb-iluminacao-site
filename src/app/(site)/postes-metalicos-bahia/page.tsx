import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.bahia

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosBahiaPage() {
    return <RegionalUfPage data={data} />
}
