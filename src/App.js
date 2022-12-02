import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      key: "",
      value: "",
    },
  ]);
  const pasteHandle = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData) {
      const arr = pastedData.split("\n").map((text) => {
          let [key, value] = text.split("=");
          return { key, value };
        }).filter(Boolean);
      console.log(arr);
    }
  };
  return (
    <div className="h-[100vh] bg-black">
      <div className="container mx-auto py-4">
        <div className="grid gap-y-4">
          {items.map((item, index) => (
            <div className="grid grid-cols-2 gap-x-4">
              <input
                onPaste={pasteHandle}
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
                className="h-10 placeholder:text-white/50 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
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
                className="h-10 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
                type={"text"}
                value={item.value}
              ></input>
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
