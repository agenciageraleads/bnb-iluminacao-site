interface TrackingProps {
    gtmId?: string
    adsId?: string
    gaId?: string
    fbPixelId?: string
    apolloAppId?: string
}

function isSafeApolloAppId(appId: string) {
    return /^[a-zA-Z0-9_-]+$/.test(appId)
}

export function GoogleTagManager({ gtmId, adsId, gaId, fbPixelId, apolloAppId }: TrackingProps) {
    const googleTagId = adsId || gaId
    const safeApolloAppId = apolloAppId && isSafeApolloAppId(apolloAppId) ? apolloAppId : ''

    return (
        <>
            {fbPixelId && (
                <>
                    <script
                        id="fb-pixel"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${fbPixelId}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    <noscript>
                        <img 
                            height="1" 
                            width="1" 
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                </>
            )}

            {googleTagId && (
                <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
                    <script
                        id="google-ads-tag"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${googleTagId}');
                                ${gaId && adsId ? `gtag('config', '${gaId}');` : ''}
                            `,
                        }}
                    />
                </>
            )}

            {gtmId && (
                <>
                    <script
                        id="gtm-script"
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

            {safeApolloAppId && (
                <script
                    id="apollo-website-tracker"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function initApollo() {
                                var cacheBust = Math.random().toString(36).substring(7);
                                var apolloScript = document.createElement("script");
                                apolloScript.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + cacheBust;
                                apolloScript.async = true;
                                apolloScript.defer = true;
                                apolloScript.onload = function () {
                                    window.trackingFunctions.onLoad({ appId: "${safeApolloAppId}" });
                                };
                                document.head.appendChild(apolloScript);
                            })();
                        `,
                    }}
                />
            )}
        </>
    )
}
