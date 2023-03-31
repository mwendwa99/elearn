import "./App.css";
// components
import { Appbar } from "./components";
import { Landing, SignIn, SignUp } from "./pages";

function App() {
  return (
    <div className="App">
      <Appbar />
      {/* <Landing /> */}
      <SignIn />
    </div>
  );
}

export default App;
