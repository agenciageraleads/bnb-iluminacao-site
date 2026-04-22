import { getCatalogById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CatalogExportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const catalog = await getCatalogById(id);

    if (!catalog) {
        return notFound();
    }

    return (
        <div className="bg-white min-h-screen text-industrial-950 font-sans print:bg-white">
            {/* Ocultar elementos desnecessários na impressão via CSS no pai se necessário */}
            <div className="max-w-[1200px] mx-auto bg-white shadow-2xl print:shadow-none">
                
                {catalog.layout?.map((block: any, index: number) => {
                    if (block.blockType === 'cover') {
                        return (
                            <section key={index} className="relative h-[1123px] w-full flex flex-col items-center justify-center overflow-hidden page-break-after">
                                {/* Fundo Industrial */}
                                {block.image && (
                                    <div className="absolute inset-0 z-0">
                                        <Image 
                                            src={block.image.url} 
                                            alt="Capa" 
                                            fill 
                                            className="object-cover brightness-50"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent" />
                                    </div>
                                )}
                                
                                <div className="relative z-10 text-center px-10">
                                    {/* Logo B&B */}
                                    <div className="mb-12">
                                        <Image src="/logo.png" alt="B&B Iluminação" width={240} height={80} className="mx-auto" />
                                    </div>
                                    
                                    <h1 className="text-7xl md:text-8xl font-black font-outfit text-white uppercase tracking-tighter leading-none mb-6">
                                        {block.title || catalog.title}
                                    </h1>
                                    
                                    <div className="h-2 w-32 bg-accent-premium mx-auto mb-8" />
                                    
                                    <p className="text-2xl text-industrial-100 font-medium tracking-widest uppercase">
                                        {block.subtitle || "Soluções em Postes Metálicos"}
                                    </p>
                                </div>

                                {/* Rodapé da Capa */}
                                <div className="absolute bottom-12 left-0 w-full px-20 flex justify-between items-end text-white border-t border-white/20 pt-8 mx-auto max-w-[80%]">
                                    <div className="text-left">
                                        <p className="text-xs font-bold uppercase tracking-widest text-accent-premium mb-1">Engenharia de Qualidade</p>
                                        <p className="text-sm font-medium">B&B ILUMINAÇÃO LTDA</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-mono tracking-tighter">EST. 1998</p>
                                    </div>
                                </div>
                            </section>
                        );
                    }

                    if (block.blockType === 'productGrid') {
                        return (
                            <section key={index} className="min-h-[1123px] w-full p-16 page-break-after bg-white">
                                <header className="border-b-4 border-industrial-900 pb-6 mb-12 flex justify-between items-end">
                                    <div>
                                        <p className="text-accent-premium font-bold uppercase tracking-widest text-xs mb-2">Catálogo de Produtos</p>
                                        <h2 className="text-4xl font-black font-outfit text-industrial-950 uppercase tracking-tight">{block.title}</h2>
                                    </div>
                                    <Image src="/logo.png" alt="B&B" width={100} height={35} />
                                </header>

                                <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                                    {block.products?.map((product: any) => (
                                        <div key={product.id} className="flex flex-col border border-industrial-100 p-6 bg-industrial-50/30">
                                            <div className="aspect-[4/3] relative mb-6 border border-industrial-200 bg-white">
                                                {product.mainImage && (
                                                    <Image 
                                                        src={product.mainImage.url} 
                                                        alt={product.name} 
                                                        fill 
                                                        className="object-contain p-2"
                                                    />
                                                )}
                                            </div>
                                            
                                            <h3 className="text-xl font-black font-outfit text-industrial-900 uppercase mb-2">
                                                {product.name}
                                            </h3>
                                            
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="bg-industrial-900 text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                                                    Ref: {product.model}
                                                </span>
                                                <span className="border border-industrial-300 text-industrial-500 text-[10px] font-bold px-2 py-0.5 uppercase">
                                                    Galvanizado a Fogo
                                                </span>
                                            </div>

                                            <div className="space-y-1 text-xs text-industrial-600 font-medium">
                                                <div className="flex justify-between border-b border-industrial-100 pb-1">
                                                    <span>Material:</span>
                                                    <span className="text-industrial-900 font-bold">{product.specs?.material || "Aço ABNT"}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-industrial-100 pb-1">
                                                    <span>Alturas:</span>
                                                    <span className="text-industrial-900 font-bold">{product.specs?.altura || "Consulte"}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-industrial-100 pb-1">
                                                    <span>Norma:</span>
                                                    <span className="text-industrial-900 font-bold">{product.specs?.norma || "NBR 14744"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <footer className="mt-auto pt-10 text-[10px] text-industrial-400 flex justify-between uppercase tracking-widest font-bold">
                                    <span>Página {index + 1}</span>
                                    <span>B&B Iluminação – {catalog.title}</span>
                                </footer>
                            </section>
                        );
                    }

                    if (block.blockType === 'fullText') {
                         return (
                            <section key={index} className="min-h-[1123px] w-full p-20 page-break-after bg-industrial-950 text-white">
                                <div className="max-w-3xl mx-auto prose prose-invert prose-industrial h-full flex flex-col justify-center">
                                    {/* Renderizar richText aqui se necessário ou usar o conteúdo mockado */}
                                    <div className="border-l-8 border-accent-premium pl-10">
                                        <h2 className="text-5xl font-black font-outfit uppercase mb-8">Excelência Técnica</h2>
                                        <p className="text-xl text-industrial-300 leading-relaxed">
                                            A B&B Iluminação é especialista no desenvolvimento de postes metálicos que aliam design inovador e durabilidade extrema. Nossos processos de galvanização a fogo seguem as mais rigorosas normas nacionais, garantindo resistência contra corrosão por décadas.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        );
                    }

                    return null;
                })}

                {/* Contracapa padrão */}
                <section className="h-[1123px] w-full bg-industrial-900 flex flex-col items-center justify-center text-white relative">
                    <div className="text-center">
                        <Image src="/logo.png" alt="B&B" width={300} height={100} className="mx-auto mb-16" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest mb-8">Solicite seu Orçamento</h2>
                        <div className="space-y-4 text-industrial-300">
                            <p className="text-lg">comercial@bebiluminacao.com.br</p>
                            <p className="text-lg">+55 (62) 3576-1988</p>
                            <p className="text-base">Goiânia - GO | Brasil</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full h-4 bg-accent-premium" />
                </section>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .page-break-after { page-break-after: always; }
                    body { -webkit-print-color-adjust: exact; }
                }
                @page {
                    size: A4;
                    margin: 0;
                }
            `}} />
        </div>
    );
}
