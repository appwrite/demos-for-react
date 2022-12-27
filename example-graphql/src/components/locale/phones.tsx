import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { getCountriesPhones } from "../../appwrite";

export default function Phones() {
  const [info, setInfo] = useState<Models.PhoneList | undefined>();

  const effectRan = useRef(false);
  useEffect(() => {
    if(effectRan.current === false){ 
        getCountriesPhones()
        .then((i) => setInfo(i))
      
      return () => {
        effectRan.current = true;
      }
    }
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