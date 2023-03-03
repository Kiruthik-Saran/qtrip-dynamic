
import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const reserv =  await fetch(config.backendEndpoint+'/reservations/');
    const data = await reserv.json();
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  const banner = document.getElementById("no-reservation-banner");
  const tab = document.getElementById("reservation-table-parent");
  if(reservations.length>0)
  {
  banner.setAttribute("style","display:none");
  tab.setAttribute("style","display:block");
  }
  else
  {
  banner.setAttribute("style","display:block");
  tab.setAttribute("style","display:none");
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
     */
  //console.log(reservations[0].date[2]);
  
  //console.log(event.toLocaleTimeString());



  const parent = document.getElementById("reservation-table");

    for(let i=0;i<reservations.length;i++)
    {
      // const event = new Date(reservations[i].time);
      // const options = { day: 'numeric', month: 'long',   year: 'numeric', time:'long'};
      // const datestr = event.toLocaleString('en-IN', options);
      // const tiestr = event.toLocaleString('en-IN');
      // const timestr = tiestr.split(",");
      //console.log(timestr[1]);
      //const datetime = datestr +","+timestr[1];

      const datefit = new Date(reservations[i].date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      const timefit =new Date(reservations[i].time).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).replace(" at", ",")

      const row = document.createElement("tr");
     // row.setAttribute("id",reservations[i].id);

      const td1 = document.createElement("td");
      td1.innerHTML = `<b>${reservations[i].id}</b>`;

      const td2 = document.createElement("td");
      td2.innerHTML = reservations[i].name;

      const td3 = document.createElement("td");
      td3.innerHTML =reservations[i].adventureName;

      const td4 = document.createElement("td");
      td4.innerHTML = reservations[i].person;

      const td5 = document.createElement("td");
      td5.innerHTML = datefit;

      const td6 = document.createElement("td");
      td6.innerHTML = reservations[i].price;

      const td7 = document.createElement("td");
      td7.innerHTML = timefit;

      const td8 = document.createElement("td");
      td8.setAttribute("id",reservations[i].id);
      

      const atag = document.createElement("a");
      atag.setAttribute("href","http://35.154.224.94:8081/frontend/pages/adventures/detail/?adventure="+reservations[i].adventure);

      const buttontag = document.createElement("button");
      buttontag.setAttribute("class","reservation-visit-button");
      buttontag.innerHTML = "Visit Adventure";

      atag.append(buttontag);
      td8.append(atag);




      
      row.append(td1);
      row.append(td2);
      row.append(td3);
      row.append(td4);
      row.append(td5);
      row.append(td6);
      row.append(td7);
      row.append(td8);
      // row.innerHTML = `<td><b>${reservations[i].id}<b></td>
      // <td>${reservations[i].name}</td>
      // <td>${reservations[i].adventureName}</td>
      // <td>${reservations[i].person}</td>
      // <td>${reservations[i].date.replace("-","/").replace("-","/")}</td>
      // <td>${reservations[i].price}</td>
      // <td>${datetime}</td>
      // <td></td>`
      parent.append(row);
    }
}

export { fetchReservations, addReservationToTable };
