import { RegionalUfPage, getRegionalUfMetadata } from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.santaCatarina

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosSantaCatarinaPage() {
    return <RegionalUfPage data={data} />
}
