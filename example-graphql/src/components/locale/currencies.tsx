import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { getCurrencies } from "../../appwrite";

export default function Currencies() {
  const [info, setInfo] = useState<Models.CurrencyList | undefined>();

  const effectRan = useRef(false);
  useEffect(() => {
    if(effectRan.current === false){ 
      getCurrencies()
        .then((i) => setInfo(i))
      
      return () => {
        effectRan.current = true;
      }
    }
  }, [])

  return (
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
                {info?.total && info.currencies.map(c => {
                    return(
                        <tr key={c.code}>
                            <th>
                                {c?.code}
                            </th>
                            <th>
                                {c?.symbol}
                            </th>
                            <th>
                                {c?.name}
                            </th>
                            <th>
                                {c?.symbolNative}
                            </th>
                            <th>
                                {c?.decimalDigits}
                            </th>
                            <th>
                                {c?.rounding}
                            </th>
                            <th>
                                {c?.namePlural}
                            </th>
                        </tr>
                    )})}
            </tbody>
        </table>
    </div>
    </>
  )
}