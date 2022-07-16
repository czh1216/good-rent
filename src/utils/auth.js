import storage from './storage'
const TOKN_KEY = 'HMM'
export const getToken = () => storage.get(TOKN_KEY)
export const setToken = (token) => storage.set(TOKN_KEY, token)
export const removeToken = () => storage.remove(TOKN_KEY)
