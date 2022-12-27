import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { getLanguages } from "../appwrite";

export default function Languages() {
  const [info, setInfo] = useState<Models.LanguageList | undefined>();

  useEffect(() => {
    getLanguages()
      .then((i) => setInfo(i))
  }, [])

  return (
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
                {info?.total && info.languages.map(c => {
                    return(
                        <tr key={c.code}>
                            <th>
                                {c?.code}
                            </th>
                            <th>
                                {c?.name}
                            </th>
                            <th>
                                {c?.nativeName}
                            </th>
                        </tr>
                    )})}
            </tbody>
        </table>
    </div>
    </>
  )
}