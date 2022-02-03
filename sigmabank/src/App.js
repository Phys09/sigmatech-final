import logo from './logo.svg';
import './App.css';
import API from './APIfunctions.js';

/*async function someFunction() {
  var resp = await fetch("http://localhost:5000/createFruit");
  console.log(await resp.json());
}*/

const VERSION_NUMBER = "0.1.0";

function App() {
  return (
    <div className="App">
      <p>sup</p>
      <input id="fruit-name" placeholder="Enter fruit name"></input>
      <button onClick={API.someFunction}>Create Fruit</button>
      <button onClick={API.otherFunction}>List all fruits (to console)</button>
      <footer>SigmaBank Version {VERSION_NUMBER}</footer>
    </div>
  );
}

export default App;
