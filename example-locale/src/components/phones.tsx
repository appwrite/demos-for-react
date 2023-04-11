import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { getCountriesPhones } from "../appwrite";

export default function Phones() {
  const [info, setInfo] = useState<Models.PhoneList | undefined>();

  useEffect(() => {
    getCountriesPhones()
      .then((i) => setInfo(i))
  }, [])


  return (
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
                {info?.total && info.phones.map(c => {
                    return(
                        <tr key={c.code}>
                            <th>
                                {c?.code}
                            </th>
                            <th>
                                {c?.countryCode}
                            </th>
                            <th>
                                {c?.countryName}
                            </th>
                        </tr>
                    )})}
            </tbody>
        </table>
    </div>
    </>
  )
}