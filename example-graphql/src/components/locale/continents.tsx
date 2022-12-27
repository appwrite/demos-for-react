import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { getContinents } from "../../appwrite";

export default function Continents() {
  const [info, setInfo] = useState<Models.ContinentList | undefined>();

  const effectRan = useRef(false);
  useEffect(() => {
    if(effectRan.current === false){ 
      getContinents()
        .then((i) => setInfo(i))
      
      return () => {
        effectRan.current = true;
      }
    }
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