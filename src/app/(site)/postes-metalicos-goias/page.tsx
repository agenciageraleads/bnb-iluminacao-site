import {
    RegionalUfPage,
    getRegionalUfMetadata,
} from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.goias

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosGoiasPage() {
    return <RegionalUfPage data={data} />
}
