import logo from './logo.svg';
import './App.css';
import {endpoint, GET_FETCH} from './APIfunctions';
import CreateAccountForm from './CreateAccountForm.js';

async function listAccounts() {
  var resp = await fetch(endpoint("list_accounts"), GET_FETCH);
  console.table(await resp.json());
}

const VERSION_NUMBER = "0.1.1";

function App() {
  return (
    <div className="App">
      <CreateAccountForm />
      <footer>SigmaBank Version {VERSION_NUMBER}</footer>
    </div>
  );
}

export default App;
