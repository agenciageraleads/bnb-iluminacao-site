"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProductGalleryProps {
  mainImage: string
  model: string
  categoryTitle?: string
  gallery: string[]
}

export function ProductGallery({ mainImage, model, categoryTitle, gallery }: ProductGalleryProps) {
  const allImages = [mainImage, ...gallery].filter(Boolean)
  const initialImage = allImages.length > 0 ? allImages[0] : ""
  
  const [activeImage, setActiveImage] = useState(initialImage)

  useEffect(() => {
    setActiveImage(initialImage)
  }, [initialImage])

  // Se não tem imagens, mostra o placeholder
  if (allImages.length === 0) {
    return (
      <div className="space-y-4 lg:sticky lg:top-24">
          <div className="group aspect-square bg-industrial-100 border border-industrial-200 flex items-center justify-center relative overflow-hidden rounded-sm shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-premium z-10" aria-hidden="true" />
              <span className="text-industrial-200 font-black text-[100px] select-none italic" aria-label="Imagem do produto">
                  {model}
              </span>
              {categoryTitle && (
                <div className="absolute top-4 right-4 bg-industrial-950/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    {categoryTitle}
                </div>
              )}
          </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
        {/* Imagem Principal */}
        <div className="group aspect-square bg-industrial-100 border border-industrial-200 flex items-center justify-center relative overflow-hidden rounded-sm shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-premium z-10" aria-hidden="true" />
            {activeImage && (
              <Image
                  key={activeImage}
                  src={activeImage}
                  alt={model}
                  fill
                  className="object-contain transition-transform duration-700 animate-in fade-in duration-500"
                  priority
              />
            )}
            {categoryTitle && (
              <div className="absolute top-4 right-4 bg-industrial-950/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                  {categoryTitle}
              </div>
            )}
        </div>

        {/* Miniaturas */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, index) => (
                  <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-square w-20 shrink-0 bg-industrial-50 border-2 transition-all relative overflow-hidden group shadow-sm ${activeImage === img ? 'border-accent-premium' : 'border-transparent hover:border-industrial-300'}`}
                      aria-label={`Visualizar foto ${index + 1} do produto`}
                  >
                      <Image 
                        src={img} 
                        alt={`Miniatura ${index + 1}`} 
                        fill 
                        className={`object-contain transition-opacity ${activeImage === img ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} 
                      />
                  </button>
              ))}
          </div>
        )}
    </div>
  )
}
