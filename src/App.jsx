import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// components
import Appbar from "./components/Appbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Appbar />
    </div>
  );
}

export default App;
