import Image from "next/image"

import type { SeoImage } from "@/lib/seo/images"

interface SeoProductGalleryProps {
    eyebrow?: string
    title: string
    description: string
    images: SeoImage[]
    imageClassName?: string
}

export function SeoProductGallery({
    eyebrow = "Galeria tecnica",
    title,
    description,
    images,
    imageClassName = "object-cover",
}: SeoProductGalleryProps) {
    return (
        <section className="bg-industrial-50 py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="mb-12 max-w-3xl space-y-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent-dark">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-black uppercase leading-tight text-industrial-950 md:text-5xl">
                        {title}
                    </h2>
                    <p className="text-base leading-relaxed text-industrial-600">
                        {description}
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                    {images.map((image) => (
                        <figure key={image.src} className="border border-industrial-200 bg-white rounded-2xl overflow-hidden">
                            <div className="relative aspect-[4/3] bg-industrial-100">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className={imageClassName}
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                />
                            </div>
                            <figcaption className="p-5">
                                <h3 className="text-base font-black uppercase text-industrial-950">
                                    {image.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-industrial-600">
                                    {image.alt}
                                </p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}
