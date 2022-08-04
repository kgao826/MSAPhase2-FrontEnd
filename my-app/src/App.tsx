import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [dogName, setDogName] = useState("");
  const [dogData, setDogData] = useState <undefined | any> (undefined);
  const DOG_API_URL = "https://dog.ceo/api/breed";
  return (
    <div>
      <h1>Dog Breeds Image Search</h1>
      <footer>
        <p>Kevin A. Gao (kgao826@aucklanduni.ac.nz)</p>
      </footer>
    </div>
  );
  function search() {
    axios.get(DOG_API_URL + "/" + dogName + "/images/random").then((res) => {
      setDogData(res.data.message);
    });
  }
}

export default App;
