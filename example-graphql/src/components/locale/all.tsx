import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { getAllLocale } from "../../appwrite";

export default function All() {
  const [info, setInfo] = useState<
    | {
        localeGet: Models.Locale;
        localeListCountries: Models.CountryList;
        localeListCountriesEU: Models.CountryList;
        localeListCountriesPhones: Models.PhoneList;
        localeListContinents: Models.ContinentList;
        localeListCurrencies: Models.CurrencyList;
        localeListLanguages: Models.LanguageList;
      }
    | undefined
  >();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      getAllLocale().then((i) => setInfo(i));

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return (
    <>
      <div className="info">
        <h1>Here are you Location Details!</h1>
        <p>
          <strong>Your IP Address</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {info?.localeGet?.ip}
        </p>
        <p>
          <strong>Your Country</strong>: &nbsp;&nbsp;&nbsp;
          {info?.localeGet?.country}
        </p>
        <p>
          <strong>Your Country Code</strong>: &nbsp;&nbsp;&nbsp;
          {info?.localeGet?.countryCode}
        </p>
        <p>
          <strong>Your Continent</strong>: &nbsp;&nbsp;&nbsp;
          {info?.localeGet?.continent}
        </p>
        <p>
          <strong>Your Currency</strong>: &nbsp;&nbsp;&nbsp;
          {info?.localeGet?.currency}
        </p>
      </div>

      <>
        <h1>Countries List</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListCountries?.total &&
                info?.localeListCountries.countries.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.name}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>

      <>
        <h1>EU Countries List</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListCountriesEU?.total &&
                info?.localeListCountriesEU.countries.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.name}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>

      <>
        <h1>Phone Codes</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Country Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListCountriesPhones?.total &&
                info?.localeListCountriesPhones.phones.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.countryCode}</th>
                      <th>{c?.countryName}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>

      <>
        <h1>Continents</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListContinents?.total &&
                info?.localeListContinents.continents.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.name}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>

      <>
        <h1>Currencies</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Native Symbol</th>
                <th>Decimals</th>
                <th>Rounding</th>
                <th>Plural</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListCurrencies?.total &&
                info?.localeListCurrencies?.currencies.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.symbol}</th>
                      <th>{c?.name}</th>
                      <th>{c?.symbolNative}</th>
                      <th>{c?.decimalDigits}</th>
                      <th>{c?.rounding}</th>
                      <th>{c?.namePlural}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
      <>
        <h1>Languages</h1>

        <div className="info">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Native Name</th>
              </tr>
            </thead>
            <tbody>
              {info?.localeListLanguages?.total &&
                info?.localeListLanguages?.languages.map((c) => {
                  return (
                    <tr key={c.code}>
                      <th>{c?.code}</th>
                      <th>{c?.name}</th>
                      <th>{c?.nativeName}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}
