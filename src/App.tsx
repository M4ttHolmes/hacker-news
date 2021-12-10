import './App.css';
import ApiFetch from "./components/ApiFetch"
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <ApiFetch />
    </div>
  );
}

export default App;
