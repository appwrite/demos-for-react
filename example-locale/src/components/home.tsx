import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { getLocale } from "../appwrite";

export default function Home() {
  const [info, setInfo] = useState<Models.Locale | undefined>();

  useEffect(() => {
    getLocale()
      .then((i) => setInfo(i))
  }, [])


  return (
    <div className="info">
      <h1>Here are you Location Details!</h1>
      <p>
        <strong>Your IP Address</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{info?.ip}
      </p>
      <p>
        <strong>Your Country</strong>: &nbsp;&nbsp;&nbsp;{info?.country}
      </p>
      <p>
        <strong>Your Country Code</strong>: &nbsp;&nbsp;&nbsp;{info?.countryCode}
      </p>
      <p>
        <strong>Your Continent</strong>: &nbsp;&nbsp;&nbsp;{info?.continent}
      </p>
      <p>
        <strong>Your Currency</strong>: &nbsp;&nbsp;&nbsp;{info?.currency}
      </p>
    </div>
  )
}