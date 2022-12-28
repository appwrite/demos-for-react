import { Models } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { createDocument, listDocuments } from "../../appwrite";

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

  const [todo, setTodo] = useState<string>("");

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      listTodos();

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  const listTodos = () => {
    listDocuments(databaseId, collectionId).then((i) => {
      setInfo({
        total: i?.data?.databasesListDocuments?.total,
        todos: i?.data?.databasesListDocuments?.documents.map((d) =>
          JSON.parse(d.data)
        ),
      });
    });
  };
  const createTodo = async () => {
    const doc = await createDocument(databaseId, collectionId, {
      todo,
    });
    setTodo("");
    const parsed =
      doc?.data?.databasesCreateDocument?.data &&
      JSON.parse(doc?.data?.databasesCreateDocument?.data);
    const parsedTodo: Todo = {
      $id: doc?.data?.databasesCreateDocument._id,
      ...parsed,
    };
    console.log(parsedTodo);
    setInfo({
      total: (info?.total || 0) + 1,
      todos: info?.todos ? [...info.todos, ...[parsedTodo]] : [parsedTodo],
    });
  };

  const deleteTodo = () => {};

  const updateTodo = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h1>Todos</h1>
      <div style={{ display: "flex" }}>
        <input
          value={todo}
          type="text"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => createTodo()}>Add</button>
      </div>
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
    </div>
  );
}
