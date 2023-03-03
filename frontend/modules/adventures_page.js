
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const city = search.split("=");
  return city[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const adven =  await fetch(config.backendEndpoint+"/adventures?city="+city);
  const data = await adven.json();
  //console.log("From fetchAdventure"+data)
  return data;
  }
  catch(err)
  {
    //window.alert(err);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  //console.log(adventures.image);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i = 0;i<adventures.length;i++)
  {
    const parentDiv = document.getElementById("data");
    const childDiv = document.createElement("div");
    childDiv.setAttribute("class","col-6 col-lg-3 mb-3")
    
    const a_tag = document.createElement("a");
    a_tag.setAttribute("href",`detail/?adventure=${adventures[i].id}`);
    a_tag.setAttribute("id",adventures[i].id);
    
    const adv_card = document.createElement("div");
    adv_card.setAttribute("class","activity-card")
    
    const img_card = document.createElement("img");
    img_card.setAttribute("class","activity-card-image");
    img_card.setAttribute("src",adventures[i].image);

    const banner = document.createElement("div");
    banner.setAttribute("class","category-banner");
    banner.innerText = adventures[i].category;
    
    const adv_card_body = document.createElement("div");
    adv_card_body.setAttribute("class","card-body w-100");
    
    const adv_card_text = document.createElement("div");
    adv_card_text.setAttribute("class","card-text d-flex flex-wrap justify-content-between");
          
    const h5_tag = document.createElement("h6");
    h5_tag.innerText = adventures[i].name;
          
    const p_tag = document.createElement("p");
    p_tag.innerText = "₹"+adventures[i].costPerHead;
          
    const adv_card_text_2 = document.createElement("div");
    adv_card_text_2.setAttribute("class","card-text d-flex flex-wrap justify-content-between");
          
    const dur_tag = document.createElement("h6");
    dur_tag.innerText = "Duration";
          
    const dur_val = document.createElement("p");
    dur_val.innerText = adventures[i].duration+" hours";
          
    adv_card_text.append(h5_tag);
    adv_card_text.append(p_tag);
    adv_card_text_2.append(dur_tag);
    adv_card_text_2.append(dur_val);
    adv_card_body.append(adv_card_text);
    adv_card_body.append(adv_card_text_2);
    adv_card.append(img_card);
    adv_card.append(banner);
    adv_card.append(adv_card_body);
    a_tag.append(adv_card);
    childDiv.append(a_tag);
    parentDiv.append(childDiv);
          
    
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const newList = [];
  for(let i = 0;i<list.length;i++){
    if(list[i].duration>low && list[i].duration<=high){
      newList.push(list[i]);
    
    }
  }
  console.log(newList);
  
  return newList;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log(list);
  let anslists = [];
  for(let i=0; i<list.length;i++)
  {
    for(let j=0;j<categoryList.length;j++)
    {
      if(list[i].category == categoryList[j])
      {
        anslists.push(list[i]);
      }
    }
  }
  return anslists;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters.duration);
  const time = filters.duration.split("-");
  let low = time[0];
  let high = time[1];
  if(filters.duration != '' && filters.category.length ==0)
  {
    console.log("duration")
    list =filterByDuration(list,low,high);
  }
  else if(filters.duration != '' && filters.category.length != 0)
  {
    console.log("Both")
    list =filterByCategory(list,filters.category);
    list =filterByDuration(list,low,high);
  }
  else if(filters.category.length != 0){
    list =filterByCategory(list,filters.category);
  }
  
  


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let sol = localStorage.getItem("filters")
  let filters = JSON.parse(sol);

  // Place holder for functionality to work in the Stubs
  return filters ;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const pardiv = document.getElementById("category-list");
  for(let i=0;i<filters.category.length;i++)
  {
    const divele = document.createElement("div");
    divele.setAttribute("class","category-filter");
    divele.innerText = filters.category[i];
    pardiv.append(divele);
  }
  //console.log(filters.duration);
  document.getElementById("duration-select").value= filters.duration;
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
