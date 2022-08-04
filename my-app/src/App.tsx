import axios from "axios";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import "./App.css";

function App() {
  const [dogName, setDogName] = useState("");
  const [breedListJSON, setBreedList] = useState("");
  const [currentDog, setCurrentDog] = useState("");
  const DOG_API_URL = "https://dog.ceo/api/breed";
  const DOG_API_BREED_LIST_URL = "https://dog.ceo/api/breeds/list/all";
  const [dogData, setDogData] = useState <undefined | any> (undefined);
  useEffect(()=> {list_breed();}, [])

  let breedListStr = JSON.stringify(breedListJSON);
  let breedList = JSON.parse(breedListStr);
  let breeds = new Array();

  let subBreedList = [];
  for (var breedName in breedList){
    if (breedList[breedName].length > 0) {
      for (var i = 0; i < breedList[breedName].length; i++){
        subBreedList = breedList[breedName];
        breeds.push({ value: breedName + "/" + subBreedList[i], label: breedName + " (" + subBreedList[i] + ")"});
      }
    }
    else{
      breeds.push({value: breedName, label: breedName});
    }
  }  
  return (
    <div>
      <div id="top-bar">
      <h1>Dog Breeds Image Search</h1>
      </div>
      <div id="page-body">
        <div id="dropdown-list-components">
          <FormControl variant="filled" sx={{minWidth: 500}}>
            <InputLabel id="breed-list">Dog Breeds</InputLabel>
            <Select
              id="dog-name"
              value={dogName}
              label="Breeds"
              onChange={(e) => setDogName(e.target.value)}
            >
              <MenuItem value=""><i>None</i></MenuItem>
              {breeds.map(({value, label}, index) => <MenuItem value={value} key={index}>{label.toUpperCase()}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant = "contained" onClick={() => {search();}}>Search</Button>
        </div>
        <div id="dogDesc">
          <p>Current Image:&nbsp;{currentDog.toUpperCase().replace("/", " ")}</p>
        </div>
        <div id="img-space">
          {dogData === undefined ? (
            <p>No breed selected</p>
          ) : (
            <div id="dog-img">
              <img src={dogData} alt="A picture of the selected dog breed" />
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>This webpage allows you to browse random images of dog breeds</p>
        <p>Kevin A. Gao (kgao826@aucklanduni.ac.nz)</p>
      </footer>
    </div>
  );
  function search() {
    axios.get(DOG_API_URL + "/" + dogName + "/images/random").then((res) => {
      setDogData(res.data.message);
      setCurrentDog(dogName);
    });
  }

  function list_breed() {
    fetch(DOG_API_BREED_LIST_URL)
    .then((response) => response.json())
    .then((data) => setBreedList(data.message));
  }
}

export default App;
