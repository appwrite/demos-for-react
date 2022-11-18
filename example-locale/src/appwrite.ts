import { Locale, AppwriteException, Client } from "appwrite"

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const locale = new Locale(client)

export const getLocale = async () => {
  try {
    return locale.get()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCountries = async () => {
  try {
    return locale.listCountries()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getEUCountries = async () => {
  try {
    return locale.listCountriesEU()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCountriesPhones = async () => {
  try {
    return locale.listCountriesPhones()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getContinents = async () => {
  try {
    return locale.listContinents()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCurrencies = async () => {
  try {
    return locale.listCurrencies()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getLanguages = async () => {
  try {
    return locale.listLanguages()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export default client;