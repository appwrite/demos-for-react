import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { getLanguages } from "../../appwrite";

export default function Languages() {
  const [info, setInfo] = useState<Models.LanguageList | undefined>();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      getLanguages().then((i) => setInfo(i));

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

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
            {info?.total &&
              info.languages.map((c) => {
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
  );
}
