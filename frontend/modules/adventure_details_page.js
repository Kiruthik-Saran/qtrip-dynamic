import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const advenid = search.split("=");
  //console.log(advenid[1]);
  return advenid[1];

  //console.log(search);


  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const adven =  await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    const data = await adven.json();
    //console.log("From fetchAdventure"+data)
    return data;
    }
    catch(err)
    {
      //window.alert(err);
      return null;
    }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
  const headingtag = document.getElementById("adventure-name");
  headingtag.innerHTML = adventure.name;

  const subtag = document.getElementById("adventure-subtitle");
  subtag.innerHTML=adventure.subtitle;

  for(let i =0;i<adventure.images.length;i++)
  {
      const phototag = document.getElementById("photo-gallery");
      const divtag = document.createElement("div");
      const imgTag = document.createElement("img");
      imgTag.setAttribute("class","activity-card-image");
      imgTag.setAttribute("src",adventure.images[i]);
      divtag.append(imgTag)
      phototag.append(divtag);
  }
  const contenttag = document.getElementById("adventure-content");
  contenttag.innerText = adventure.content;
  //console.log(document.getElementsByClassName("activity-card-image").length);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //const phototag = document.getElementById("photo-gallery");
  let photoGallery = document.getElementById("photo-gallery");
  let carouselItems = "";
  let carouselIndicators = "";
  for (let i = 0; i < images.length; i++)
   {
     carouselIndicators +=
      `<button type="button" data-bs-target="#carouselExampleIndicators" 
       data-bs-slide-to="${i}" ${ i === 0 ?'class="active" aria-current="true" aria-label="Slide 1"' : 'aria-label="Slide ' + (i + 1) + '"'}>
      </button>`;
      
    carouselItems +=
      `<div class="carousel-item ${i === 0 ? 'active' : ''}">
       <img src="${images[i]}" class="d-block activity-card-image"> 
       </div>`;
   }
   
   photoGallery.innerHTML = 
   `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

      <div class="carousel-indicators">
        ${carouselIndicators}
      </div>
       
      <div class="carousel-inner"> 
        ${carouselItems}
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
     </div>`;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
 // console.log(adventure);
  if(adventure.available == true)
  {
      const soldtag = document.getElementById("reservation-panel-sold-out");
      soldtag.setAttribute("style","display:none");
      const avtag = document.getElementById("reservation-panel-available");
      avtag.setAttribute("style","display:block");
      const costper = document.getElementById("reservation-person-cost");
      costper.innerHTML = adventure.costPerHead;
  }
  else
  {
    const soldtag = document.getElementById("reservation-panel-sold-out");
    soldtag.setAttribute("style","display:block");
    const avtag = document.getElementById("reservation-panel-available");
    avtag.setAttribute("style","display:none");
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 // console.log(adventure);
  //console.log(persons);
  var totalcost = adventure.costPerHead * persons;
  //console.log(totalcost);
  const tag = document.getElementById("reservation-cost");
  tag.innerHTML=totalcost


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  var form=document.getElementById('myForm')

  
form.addEventListener('submit', function(e){
 e.preventDefault()
 
const formData = new FormData(form);
 var fname = formData.get("name");
  var fdate = formData.get("date");
   var fperson = formData.get("person");

   const update = {
    //title: 'A blog post by Kingsley',
    name:fname,
    date:fdate,
    person:fperson,
    adventure: adventure.id
    };
  
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };

//  var name=document.getElementById('name').value
//  var date=document.getElementById('date').value
//  var person= (document.getElementById('reservation-cost').value) / adventure.costPerHead
 //var id = adventure.id
//  
fetch(config.backendEndpoint+'/reservations/new', options)
  .then(data => {
      if (!data.ok) {
        window.alert("Faliure");
        throw Error(data.status);
       }
       else{
        window.alert("Success");
       }
       return data.json();
      }).then(update => {
      console.log(update);
      // {
      //
      //title: 'A blog post by Kingsley',
      //
      // body: data
      //
     
})
      .catch(e => {
      console.log(e);
      });
});
}

 
  
    
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved == true)
{
  const res = document.getElementById("reserved-banner");
  res.setAttribute("style","display:block");
}
else{
  const res = document.getElementById("reserved-banner");
  res.setAttribute("style","display:none"); 
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
