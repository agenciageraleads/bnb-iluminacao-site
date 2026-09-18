type AsyncCityParams<T extends { params: Promise<{ city: string }> }> = T

export type BracoCityParams = AsyncCityParams<Parameters<typeof import('../app/(site)/lp/braco-para-luminaria/cidades/[city]/page').default>[0]>
export type LaserCityParams = AsyncCityParams<Parameters<typeof import('../app/(site)/lp/corte-laser/cidades/[city]/page').default>[0]>
export type PinturaCityParams = AsyncCityParams<Parameters<typeof import('../app/(site)/lp/pintura-eletrostatica/cidades/[city]/page').default>[0]>
