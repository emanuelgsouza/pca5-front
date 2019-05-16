import { get } from 'lodash'
const POST_TYPES = {
  SERVICO: 'se',
  PRODUTO_FISICO: 'pf',
  PRODUTO_ONLINE: 'po'
}

const factoryLocalization = (body, coordinates) => {
  return {
    lat: get(coordinates, 'lat', null),
    long: get(coordinates, 'lon', null),
    street: get(body, 'localization.street', null),
    house_number: get(body, 'localization.house_number', null),
    // district: get(body, 'localization.district', null),
    city: get(body, 'localization.city', null),
    state: get(body, 'localization.state', null),
    // short_state: get(body, 'localization.short_state', null),
    country: get(body, 'localization.country', null)
    // short_country: get(body, 'localization.short_country', null)
  }
}

const factoryPost = (body, type, coordinates) => {
  // servico
  if (type === POST_TYPES.SERVICO) {
    return {
      payload: {
        name: get(body, 'name', null),
        category: get(body, 'category', null),
        value: get(body, 'value', null),
        description: get(body, 'description', null),
        place: get(body, 'place', null)
      },
      location: factoryLocalization(body, coordinates)
    }
  }

  // fisico
  if (type === POST_TYPES.PRODUTO_FISICO) {
    return {
      payload: {
        name: get(body, 'name', null),
        imagePath: get(body, 'image_file_name', null),
        category: get(body, 'category', null),
        value: get(body, 'value', null),
        place: get(body, 'place', null)
      },
      location: factoryLocalization(body, coordinates)
    }
  }

  // online
  return {
    payload: {
      name: get(body, 'name', null),
      url: get(body, 'url', null),
      category: get(body, 'category', null),
      value: get(body, 'value', null),
      place: get(body, 'place', null)
    }
  }
}

export default factoryPost
