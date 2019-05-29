import { last } from 'lodash'

export const getFileExtension = imageType => last(imageType.split('/'))
