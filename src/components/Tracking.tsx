'use client'

import Script from 'next/script'

interface TrackingProps {
    gtmId?: string
    adsId?: string
    gaId?: string
}

export function GoogleTagManager({ gtmId, adsId, gaId }: TrackingProps) {
    return (
        <>
            {/* Google Tag (gtag.js) - Google Ads & GA4 */}
            {(adsId || gaId) && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${adsId || gaId}`}
                    />
                    <Script
                        id="google-ads-tag"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${adsId || gaId}');
                                ${gaId && adsId ? `gtag('config', '${gaId}');` : ''}
                            `,
                        }}
                    />
                </>
            )}

            {/* Google Tag Manager - Head */}
            {gtmId && (
                <>
                    <Script
                        id="gtm-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${gtmId}');
                            `,
                        }}
                    />
                    <noscript>
                        <iframe 
                            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                            height="0" 
                            width="0" 
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                </>
            )}
        </>
    )
}
