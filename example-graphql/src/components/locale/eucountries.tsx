import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { getEUCountries } from "../../appwrite";

export default function EUCountries() {
  const [info, setInfo] = useState<Models.CountryList | undefined>();

  useEffect(() => {
    getEUCountries()
      .then((i) => setInfo(i))
  }, [])


  return (
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
                {info?.total && info.countries.map(c => {
                    return(
                        <tr key={c.code}>
                            <th>
                                {c?.code}
                            </th>
                            <th>
                                {c?.name}
                            </th>
                        </tr>
                    )})}
            </tbody>
        </table>
    </div>
    </>
  )
}