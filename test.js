function displayItinerary(user){
  let userFilter = user.filter(function (user) {
    return user.email === emailForm.value
  })

  //creates the actual list elements with an id equal to the trip name, etc to show up in the left hand bar ofthe page
  userFilter[0].user_trips.forEach(trip => {
    let userTrip = document.createElement('li')
    userTrip.id = trip.name
    userTrip.innerText = trip.name
    userTrip.className = "list-group-item " + userFilter[0].id
    listgroup[0].appendChild(userTrip)

    //loads itinerary information when you click on that item in the side bar
    userTrip.addEventListener('click', function(event) {
      event.preventDefault()
      //removes childNodes so when you click a new itinerary the previous itinerary is removed
      while (placeWhereItineraryLoads.hasChildNodes()) {
        placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild);
      }
      //loads itinerary information..continued
      fetch('http://localhost:3000/api/v1/itineraries').then(data => data.json()).then(itinerary => {
        // filters for a particular user
        let itineraryFilter = itinerary.filter(itin => {
          return itin.name === userTrip.id
        })
        // creating the place on the page where the itinerary info loads
        let itineraryArea = document.createElement('div')
        placeWhereItineraryLoads.appendChild(itineraryArea)
        itineraryArea.innerHTML = `
        <div class="card" style="text-align: center; padding-top: 25px; width: 400px; height: 200px; opacity: .75">
        <h6>This Trip:</h6>
        <h1> ${itineraryFilter[0].name} </h1>
        <p> ${itineraryFilter[0].description}</p>
        <h6>Things to do:</h6>
        </div>`
        itineraryFilter[0].destinations.forEach(destination => {
          let locationArea = document.createElement('div')
          locationArea.className = "card"
          locationArea.style = "margin-left: 25px; width: 350px; height: 225px; opacity: .75"
          locationArea.innerHTML = `
          <div class="card-body">
          <h4 style="text-align:center">${destination.name}</h6>
          <br>
          <h6 style="text-align:center">${destination.street_address}</h4>
          <h5 style="text-align:center">${destination.city}, ${destination.state} ${destination.zip}</h5>
          <br>
          </div>`
          itineraryArea.appendChild(locationArea)
        })
      })
    })
  })
}


{
  method: 'POST',
  body: JSON.stringify({itinerary_id: ,
    location_id: ,
  }),
  headers: {'Content-Type': 'application/json',
    'Accept': 'application/json'}
}
