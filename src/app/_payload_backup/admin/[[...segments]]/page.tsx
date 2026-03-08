/* This is the admin page for Payload. */
/* It must export the RootPage component from @payloadcms/next/views */
import configPromise from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '@payloadcms/next/utilities'
/* import { importMap } from '../../importMap' // This would be generated if we used it */

const Page = ({ params, searchParams }: { params: any; searchParams: any }) => (
    <RootPage config={configPromise} params={params} searchParams={searchParams} importMap={importMap} />
)

export default Page
