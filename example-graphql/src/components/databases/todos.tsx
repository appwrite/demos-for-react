import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { listDocuments } from "../../appwrite";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

interface Todo extends Models.Document {
  todo: string;
  done?: boolean;
}

export default function Databases() {
  const [info, setInfo] = useState<
    { total?: number; todos?: Todo[] } | undefined
  >();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      listDocuments(databaseId, collectionId).then((i) => {
        setInfo({
          total: i?.data?.databasesListDocuments?.total,
          todos: i?.data?.databasesListDocuments?.documents.map((d) =>
            JSON.parse(d.data)
          ),
        });
      });

      return () => {
        effectRan.current = true;
      };
    }
  }, []);
  const createTodo = () => {};

  const deleteTodo = () => {};

  const updateTodo = () => {};

  return (
    <>
      <h1>Todos</h1>
      <div className="info">
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {info?.total &&
              info?.todos?.map((c) => {
                return (
                  <tr key={c.$id}>
                    <th>{c?.todo}</th>
                    <th>{c?.done ? "Yes" : "No"}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
