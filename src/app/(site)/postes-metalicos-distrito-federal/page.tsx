import {
    RegionalUfPage,
    getRegionalUfMetadata,
} from "@/components/seo/regional-uf-page"
import { regionalUfPages } from "@/lib/seo/regional-ufs"

const data = regionalUfPages.distritoFederal

export const metadata = getRegionalUfMetadata(data)

export default function PostesMetalicosDistritoFederalPage() {
    return <RegionalUfPage data={data} />
}
