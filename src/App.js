import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      key: "",
      value: "",
    },
  ]);
  useEffect(() => {
    if (items.length === 0) {
      setItems([{ key: "", value: "" }])
    }
  }, [items])
  const pasteHandle = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData) {
      const arr = pastedData.split("\n").map((text) => {
        let [key, value] = text.split("=");
        return { key, value };
      }).filter(Boolean);
      if (arr.length > 0) {
        setItems(items => [...items.slice(0, index), ...arr, ...items.slice(index + 1)]
        )
      }
      console.log(arr);
    }
  };

  return (
    <div className="h-[100vh] bg-black">
      <div className="container mx-auto py-4">
        <div className="grid gap-y-4">
          {items.map((item, index) => (
            <div className="flex gap-x-4">
              <input
                onPaste={e => pasteHandle(e, index)}
                onChange={(e) => {
                  setItems((items) =>
                    items.map((item, i) => {
                      if (i === index) {
                        item.key = e.target.value;
                      }
                      return item;
                    })
                  );
                }}
                placeholder="Örn: API_URL"
                className="flex-1 h-10 placeholder:text-white/50 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
                type={"text"}
                value={item.key}
              ></input>
              <input
                onChange={(e) => {
                  setItems((items) =>
                    items.map((item, i) => {
                      if (i === index) {
                        item.value = e.target.value;
                      }
                      return item;
                    })
                  );
                }}
                className="flex-1 h-10 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
                type={"text"}
                value={item.value}
              ></input>
              <button
                onClick={() => setItems(items => items.filter((_, key) => key !== index))}
                className="h-10 w-10 bg-red-500 text-white text-sm rounded-md	">x</button>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setItems((items) => [
              ...items,
              {
                key: "",
                value: "",
              },
            ])
          }
          className="h-10 px-4 rounded border border-blue-500 text-blue-500 flex items-center text-sm mt-4"
        >
          Yeni input ekle
        </button>
      </div>
    </div>
  );
}

export default App;
