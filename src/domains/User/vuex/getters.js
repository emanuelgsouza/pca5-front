import { isEmpty, get } from 'lodash'

export const hasUser = state => !isEmpty(state.token)

export const username = state => get(state, 'user.name', '')

export const isUserLoading = state => state.loadingUser
