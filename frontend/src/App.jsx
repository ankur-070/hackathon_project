import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setItems(res.data));
  }, []);

  const addItem = async () => {
    const res = await axios.post("http://localhost:5000/api/items", { name });
    setItems([...items, res.data]);
    setName("");
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">MERN Hackathon Demo</h1>

      <div className="my-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New item"
          className="border p-2 mr-2"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul>
        {items.map(i => (
          <li key={i._id} className="flex justify-between my-2 border p-2 rounded">
            {i.name}
            <button onClick={() => deleteItem(i._id)} className="text-red-500">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
