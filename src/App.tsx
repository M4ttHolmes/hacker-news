import './App.css';
import ApiFetch from "./components/ApiFetch"
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"

function App() {
  // const [fetchType, setFetchType] = useState<string>("topstories")

  // const updateFetchType = (fetch: string) => {
  //   console.log("Update Fetch Called");
  //   setFetchType(fetch);
  // };

  return (
    <div className="App">
      {/* <Navigation updateFetchType={updateFetchType}/> */}
      <ApiFetch />
    </div>
  );
}

export default App;
