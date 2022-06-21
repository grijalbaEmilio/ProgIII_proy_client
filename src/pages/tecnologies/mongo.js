import React , {useState} from "react"

export default function Mongo() {
  const [count, setState] = useState(false)
  return (
    <div id="colapsado">
      <p>el menú {count ? 'sí' : 'no'} está colapasado</p>
      <button onClick={()=>setState(!count)}>
        click
      </button>
    </div>
  );
}