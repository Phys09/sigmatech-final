import logo from './logo.svg';
import './App.css';
import API from './APIfunctions.js';

/*async function someFunction() {
  var resp = await fetch("http://localhost:5000/createFruit");
  console.log(await resp.json());
}*/

function App() {
  return (
    <div className="App">
      <p>sup</p>
      <button onClick={API.someFunction}>Click me fool</button>
      <button onClick={API.otherFunction}>Don't click me fool</button>
    </div>
  );
}

export default App;
