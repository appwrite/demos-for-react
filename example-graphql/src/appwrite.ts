import { Models, AppwriteException, Client, Graphql, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
export default client;

const graphql = new Graphql(client);

/*
 * Locales
 */
export const getLocale = async () => {
  try {
    const q = (await graphql.query({
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
    }`,
    })) as { data: { localeGet: Models.Locale } };

    return q.data.localeGet;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getCountries = async () => {
  try {
    const q = (await graphql.query({
      query: `query {
        localeListCountries {
            total
            countries{
              name
              code
            }
        }
    }`,
    })) as { data: { localeListCountries: Models.CountryList } };

    return q.data.localeListCountries;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getEUCountries = async () => {
  try {
    const q = (await graphql.query({
      query: `query {
        localeListCountriesEU {
            total
            countries{
              name
              code
            }
        }
    }`,
    })) as { data: { localeListCountriesEU: Models.CountryList } };

    return q.data.localeListCountriesEU;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getCountriesPhones = async () => {
  try {
    const q = (await graphql.query({
      query: `query {
        localeListCountriesPhones {
            total
            phones{
              code
              countryCode
              countryName
            }
        }
    }`,
    })) as { data: { localeListCountriesPhones: Models.PhoneList } };

    return q.data.localeListCountriesPhones;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getContinents = async () => {
  try {
    const q = (await graphql.query({
      query: `query {
        localeListContinents {
            total
            continents{
              code
              name
            }
        }
    }`,
    })) as { data: { localeListContinents: Models.ContinentList } };

    return q.data.localeListContinents;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getCurrencies = async () => {
  try {
    const q = (await graphql.query({
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
    }`,
    })) as { data: { localeListCurrencies: Models.CurrencyList } };

    return q.data.localeListCurrencies;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getLanguages = async () => {
  try {
    const q = (await graphql.query({
      query: `query {
        localeListLanguages {
            total
            languages{
              name
              code
              nativeName
            }
        }
    }`,
    })) as { data: { localeListLanguages: Models.LanguageList } };

    return q.data.localeListLanguages;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const getAllLocale = async () => {
  try {
    const q = (await graphql.query({
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
    }`,
    })) as {
      data: {
        localeGet: Models.Locale;
        localeListCountries: Models.CountryList;
        localeListCountriesEU: Models.CountryList;
        localeListCountriesPhones: Models.PhoneList;
        localeListContinents: Models.ContinentList;
        localeListCurrencies: Models.CurrencyList;
        localeListLanguages: Models.LanguageList;
      };
    };

    return q.data;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

/*
 * Databases
 */
export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: object
) => {
  return graphql
    .mutation({
      query: `mutation CreateDocument ($databaseId: String!, $collectionId: String!, $documentId: String!, $data: Json!) {
          databasesCreateDocument(databaseId: $databaseId, collectionId: $collectionId, documentId: $documentId, data: $data) { _id data }
      }`,
      variables: {
        databaseId,
        collectionId,
        documentId: ID.unique(),
        data,
      },
    })
    .then(function (response: any) {
      console.log(response);

      if ("errors" in response) {
        alert("Failed to create document!");
        return;
      }

      return response as {
        data: { databasesCreateDocument: { _id: string; data: string } };
      };
    });
};

export const getDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string
) => {
  graphql
    .query({
      query: `query GetDocument ($databaseId: String!, $collectionId: String!, $documentId: String!) {
          databasesGetDocument(databaseId: $databaseId, collectionId: $collectionId, documentId: $documentId) {
              _id
              _createdAt
              _updatedAt
              name
              collection
              size
          }
      }`,
      variables: {
        databaseId,
        collectionId,
        documentId,
      },
    })
    .then(function (response) {
      console.log(response);

      if ("errors" in response) {
        alert("Failed to get document!");
        return;
      }

      return response;
    });
};

export const listDocuments = async (
  databaseId: string,
  collectionId: string,
  fields?: string
) => {
  return graphql
    .query({
      query: `query ListDocuments ($databaseId: String!, $collectionId: String!) {
          databasesListDocuments(databaseId: $databaseId, collectionId: $collectionId) { total documents { data } }
      }`,
      variables: {
        databaseId,
        collectionId,
      },
    })
    .then(function (response) {
      console.log(response);

      if ("errors" in response) {
        alert("Failed to list documents!");
        return;
      }

      return response as {
        data: {
          databasesListDocuments: {
            total: number;
            documents: [{ data: string }];
          };
        };
      };
    });
};

export const updateDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: object
) => {
  return graphql
    .query({
      query: `mutation UpdateDocument ($databaseId: String!, $collectionId: String!, $documentId: String!, $data: JSON) {
          databasesUpdateDocument(databaseId: $databaseId, collectionId: $collectionId, documentId: $documentId, data: $data) { _id }
      }`,
      variables: {
        databaseId,
        collectionId,
        documentId,
        data,
      },
    })
    .then(function (response) {
      console.log(response);

      if ("errors" in response) {
        alert("Failed to update document!");
        return;
      }

      return response;
    });
};

export const deleteDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string
) => {
  return graphql
    .mutation({
      query: `mutation DeleteDocument ($databaseId: String!, $collectionId: String!, $documentId: String!) {
          databasesDeleteDocument(databaseId: $databaseId, collectionId: $collectionId, documentId: $documentId) { status }
      }`,
      variables: {
        databaseId,
        collectionId,
        documentId,
      },
    })
    .then(function (response) {
      console.log(response);

      if ("errors" in response) {
        alert("Failed to delete document!");
        return;
      }

      return response;
    });
};
