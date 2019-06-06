import { ICONS_CATEGORIES } from './constants'

const loadCategories = () => {
  return Promise.resolve([
    { name: 'Alimentos', id: 'alimenticia' },
    { name: 'Automotivo', id: 'automotivo' },
    { name: 'Eletrônico/Tecnológico', id: 'eletronico' },
    { name: 'Entretenimento', id: 'entretenimento' },
    { name: 'Moda', id: 'moda' },
    { name: 'Moradia', id: 'moradia' }
  ])
}

export const loadIconCategories = category => ICONS_CATEGORIES[category]

export default loadCategories
