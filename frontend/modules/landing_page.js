import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  const cityarray = await fetch(config.backendEndpoint+"/cities");
  const data = await cityarray.json();
  return data;
  }
  catch(err)
  {
    //window.alert(err);
    return null;
  }

}
//fetchCities().then(alert);

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

 const div1 = document.getElementById("data");
 
  const div2 = document.createElement("div");
  div2.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4");

  const atag = document.createElement("a");
  atag.setAttribute("id",id);
  atag.setAttribute("href",`pages/adventures/?city=${id}`);

  const tileDiv = document.createElement("div");
  tileDiv.setAttribute("class","tile");

  const tileContentDiv = document.createElement("div");
  tileContentDiv.setAttribute("class"," tile tile-text text-center text-light");

  const h5ele = document.createElement("h5");
  h5ele.innerText = city;
  
  tileContentDiv.append(h5ele);
  const pele = document.createElement("p");

  pele.innerText = description;
  tileContentDiv.append(pele);

  const imgTag = document.createElement("img");
  imgTag.setAttribute("src",image);

  tileDiv.append(tileContentDiv);
  tileDiv.append(imgTag);
  atag.append(tileDiv);
  div2.append(atag);
  div1.append(div2);
}

export { init, fetchCities, addCityToDOM };
