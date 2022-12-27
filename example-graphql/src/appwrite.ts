import { Models, AppwriteException, Client, Graphql } from "appwrite"

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const graphql = new Graphql(client);

export const getLocale = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeGet {
            ip
            countryCode
            country
            continentCode
            continent
            eu
            currency
        }
    }`
  }) as {data: {localeGet: Models.Locale}};

  return q.data.localeGet;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCountries = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListCountries {
            total
            countries{
              name
              code
            }
        }
    }`
  }) as {data: {localeListCountries: Models.CountryList}};

  return q.data.localeListCountries;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getEUCountries = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListCountriesEU {
            total
            countries{
              name
              code
            }
        }
    }`
  }) as {data: {localeListCountriesEU: Models.CountryList}};  

  return q.data.localeListCountriesEU;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCountriesPhones = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListCountriesPhones {
            total
            phones{
              code
              countryCode
              countryName
            }
        }
    }`
  }) as {data: {localeListCountriesPhones: Models.PhoneList}};  

  return q.data.localeListCountriesPhones;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getContinents = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListContinents {
            total
            continents{
              code
              name
            }
        }
    }`
  }) as {data: {localeListContinents: Models.ContinentList}};  

  return q.data.localeListContinents;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getCurrencies = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListCurrencies {
            total
            currencies{
              symbol
              name
              symbolNative
              decimalDigits
              rounding
              code
              namePlural
            }
        }
    }`
  }) as {data: {localeListCurrencies: Models.CurrencyList}};  

  return q.data.localeListCurrencies;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getLanguages = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeListLanguages {
            total
            languages{
              name
              code
              nativeName
            }
        }
    }`
  }) as {data: {localeListLanguages: Models.LanguageList}};  

  return q.data.localeListLanguages;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const getAllLocale = async () => {
  try {
    const q = await graphql.query({
      query: `query {
        localeGet {
          ip
          countryCode
          country
          continentCode
          continent
          eu
          currency
        }
        localeListCountries {
          total
          countries{
            name
            code
          }
        }
        localeListCountriesEU {
          total
          countries{
            name
            code
          }
        }
        localeListCountriesPhones {
          total
          phones{
            code
            countryCode
            countryName
          }
        }
        localeListContinents {
          total
          continents{
            code
            name
          }
        }
        localeListCurrencies {
          total
          currencies{
            symbol
            name
            symbolNative
            decimalDigits
            rounding
            code
            namePlural
          }
        }
        localeListLanguages {
          total
          languages{
            name
            code
            nativeName
          }
        }
    }`
  }) as {data: {
    localeGet: Models.Locale,
    localeListCountries: Models.CountryList,
    localeListCountriesEU: Models.CountryList,
    localeListCountriesPhones: Models.PhoneList,
    localeListContinents: Models.ContinentList,
    localeListCurrencies: Models.CurrencyList,
    localeListLanguages: Models.LanguageList
  }};  

  return q.data;
} catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export default client;