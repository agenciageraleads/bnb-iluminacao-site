import type { FaqItem } from "./schema"

// Fonte única das duas perguntas sobre o que a B&B fabrica. Entram no FAQ das
// páginas e no schema FAQPage de quem usa createFaqSchema.
export const FAQ_O_QUE_FABRICA: FaqItem = {
    question: "O que a B&B fabrica?",
    answer: "Postes metálicos em aço carbono, galvanizados a fogo ou pintados, fabricados sob encomenda: Linha Urban (curvo simples, curvo duplo e reto, engastado ou flangeado), postes decorativos da Linha Versa, postes para câmera, mastros para bandeira, braços, suportes e acessórios da Linha Nexo. Também prestamos serviço de pintura eletrostática e de corte a laser a partir de 10 peças por pedido, ou para demanda programada e recorrente.",
}

export const FAQ_O_QUE_NAO_FABRICA: FaqItem = {
    question: "O que a B&B não fabrica?",
    answer: "Não fabricamos poste de concreto, de madeira nem de aço inox: tudo é aço carbono. Não fabricamos poste cônico contínuo. Para essa especificação, oferecemos poste telecônico, escalonado e montado em seções com emendas, e avaliamos a adequação ao projeto. E não trabalhamos com pronta entrega: fabricamos sob encomenda, conforme a especificação da obra, em 10 a 20 dias úteis.",
}
