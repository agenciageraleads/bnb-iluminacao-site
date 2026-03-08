import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
/* import '@payloadcms/next/css' */
import React from 'react'

/* This is the root layout for Payload pages. */
/* It must export the RootLayout component from @payloadcms/next/layouts */

const Layout = ({ children }: { children: React.ReactNode }) => (
    <RootLayout config={configPromise} importMap={null}>
        {children}
    </RootLayout>
)

export default Layout
