import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { getContinents } from "../appwrite";

export default function Continents() {
  const [info, setInfo] = useState<Models.ContinentList | undefined>();

  useEffect(() => {
    getContinents()
      .then((i) => setInfo(i))
  }, [])


  return (
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
                {info?.total && info.continents.map(c => {
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