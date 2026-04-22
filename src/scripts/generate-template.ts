import * as XLSX from 'xlsx'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate() {
    const data = [
        {
            Nome: 'Exemplo de Poste Cônico',
            Slug: 'exemplo-poste-conico',
            Modelo: 'PC-EX-01',
            Categoria: 'Postes Decorativos',
            Descricao: 'Insira aqui a descrição detalhada do produto.',
            Prazo_Producao: '15 a 30 dias úteis',
            Imagem_Principal: 'principal.jpg',
            Galeria: 'galeria1.jpg; galeria2.jpg',
            Badges: 'NBR 6323, Garantia B&B',
            Aplicacoes: 'Praças, Parques, Condomínios',
            Spec_Material: 'Aço Galvanizado a Fogo',
            Spec_Altura: '3m a 6m',
            Spec_Diametro: '60mm',
            Spec_Norma: 'NBR 6323 / NBR 14744',
            Ficha_Tecnica_Label: 'Baixar PDF',
            Ficha_Tecnica_Arquivo: 'ficha.pdf'
        }
    ]

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos')

    const outputPath = path.resolve(__dirname, '../../Produtos_Template.xlsx')
    XLSX.writeFile(workbook, outputPath)

    console.log(`Template gerado com sucesso em: ${outputPath}`)
}

generateTemplate()
