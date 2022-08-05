//To run the webpage, cd my-app directory and then use npm start. Install npm if not installed.
import axios from "axios";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import "./App.css";

// This is the main function of the react app and displays the webpage
function App() {
  const [dogName, setDogName] = useState("");
  const [breedListJSON, setBreedList] = useState("");
  const [currentDog, setCurrentDog] = useState("");
  const DOG_API_URL = "https://dog.ceo/api/breed"; 
  const DOG_API_BREED_LIST_URL = "https://dog.ceo/api/breeds/list/all"; //api return a JSON list of all breed names and sub breed names in format {string:[]}
  const [dogData, setDogData] = useState <undefined | any> (undefined);
  
  useEffect(()=> {list_breed();}, []) //Calls the list_breed() at the start to populate dropdown list (FormControl)
  //The following variables are used to create the breed names and sub breed names from the JSON response
  let breedListStr = JSON.stringify(breedListJSON);
  let breedList = JSON.parse(breedListStr);
  let breeds = new Array();
  let subBreedList = [];
  //The following for loop loops through the JSON array
  for (var breedName in breedList){
    //If there is a sub breed name for the dog then each breed will be concatenated with the sub breed name in brackets. Otherwise, just the breed name is pushed into the array.
    if (breedList[breedName].length > 0) {
      //Loops through all the sub breed names
      for (var i = 0; i < breedList[breedName].length; i++){
        subBreedList = breedList[breedName];
        //Two values are created due to api format and display format that is utilised by the dropdown list FormControl
        breeds.push({ value: breedName + "/" + subBreedList[i], label: breedName + " (" + subBreedList[i] + ")"});
      }
    }
    else{
      breeds.push({value: breedName, label: breedName});
    }
  }  

  return (
    <div>
      {/* Header bar */}
      <div id="top-bar">
      <h1>Dog Breeds Image Search</h1>
      </div>

      <div id="page-body">
        {/* Drop down list and search button */}
        <div id="dropdown-list-components">
          <FormControl variant="filled" sx={{minWidth: 500}}>
            <InputLabel id="breed-list">Dog Breeds</InputLabel>
            <Select
              id="dog-name"
              value={dogName}
              label="Breeds"
              onChange={(e) => setDogName(e.target.value)}
            >
              {/* Each value in the breeds array is mapped to the MenuItem by using the two values formatted to ensure the 'value' is in the format for the api and the 'label' is formatted so it is readable */}
              {breeds.map(({value, label}, index) => <MenuItem value={value} key={index}>{label.toUpperCase()}</MenuItem>)} 
            </Select>
          </FormControl>
          {/* Search button (calles the search function when clicked) */}
          <Button variant = "contained" onClick={() => {search();}}>Search</Button> 
        </div>

        <div id="dogDesc">
          <p>Current Image:&nbsp;{currentDog.toUpperCase().replace("/", " ")}</p>
        </div>

        {/* Dog image */}
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

      {/* Bottom of the page */}
      <footer>
        <p>This webpage allows you to browse random images of dog breeds</p>
        <p>By: Kevin A. Gao (kgao826@aucklanduni.ac.nz)</p>
      </footer>
    </div>
  );

  // This function sends the get request to the api by using the selected dog breed from the FormControl and updating the setDogData state to produce the dog image each time the submit button is clicked
  function search() {
    axios.get(DOG_API_URL + "/" + dogName + "/images/random").then((res) => {
      setDogData(res.data.message);
      setCurrentDog(dogName);
    });
  }

  // This function sends the get request to the api to retireve the JSON list of all the dog breeds, it updates the BreedList
  function list_breed() {
    fetch(DOG_API_BREED_LIST_URL)
    .then((response) => response.json())
    .then((data) => setBreedList(data.message));
  }
}

export default App;
