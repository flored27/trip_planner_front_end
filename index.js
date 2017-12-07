let loginForm = document.getElementById('login-form')
let loginButton = document.getElementById('loginButton')
let emailForm = document.getElementById('email')
let username = document.getElementById('username')
let emailBox = document.createElement('div')
let sideBarAppend = document.getElementById('side-bar')
let listgroup = document.getElementById('itin-container')
let placeWhereItineraryLoads = document.getElementById('itinerary-detail')
let createButton = document.getElementById('createButton')
let searchButton = document.getElementById('searchButton')
let searchField = document.getElementById('searchLocation')
const userURL = 'http://localhost:3000/api/v1/users'
const itineraryURL = 'http://localhost:3000/api/v1/itineraries'
const locationURL = 'http://localhost:3000/api/v1/locations'
const stopURL = 'http://localhost:3000/api/v1/stops'

document.addEventListener('DOMContentLoaded', function() {
  //search button stuff from the nav bar
  searchButton.addEventListener('click', function(event){
    event.preventDefault()
    let descriptionLocationVal;
    //clears the page so that the form stuff can load
    while (placeWhereItineraryLoads.hasChildNodes()) {
      placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild)
    }
    fetch(locationURL).then(data => data.json()).then(location => {
      let descriptionLocationVal = Array.from(location.filter(function (loc) {
        return loc.name === searchField.value
      }).map(function (loc) { return loc.name} ))
    })
  })

  // create an itinerary....not including the location
  createButton.addEventListener('click', function (event) {
    event.preventDefault()
    // clears the page so that the form stuff can load
    while (placeWhereItineraryLoads.hasChildNodes()) {
      placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild)
    }
    //create the input elements for the itinerary form
    let itineraryName = document.createElement('input')
    itineraryName.className = 'form-control'
    let itineraryDescription = document.createElement('input')
    itineraryDescription.className = 'form-control'
    let startDate = document.createElement('input')
    startDate.className = 'form-control'
    let endDate = document.createElement('input')
    endDate.className = 'form-control'
    placeWhereItineraryLoads.innerHTML =  `
    <div class="card" style="width: 70%; text-align: center; width: 500px;height: 400px; padding-top: 20px; opacity: .8;">
    <div class="container">
    <form>
    <div class="form-group" id="itineraryName"><label> Name </label></div>
    <div class="form-group" id="itineraryDescription"><label>Description</label></div>
    <div class="form-group" id="Date">
    <div id="startDate">
    <label> Start Date</label>
    </div>
    <div id="endDate">
    <label> End Date</label>
    </div>
    </div>
    <button type="button" id="submitForm" class="btn btn-info">Create Itinerary</button>
    </form>
    </div>
    </div>`
    document.getElementById("itineraryName").appendChild(itineraryName)
    document.getElementById("itineraryDescription").appendChild(itineraryDescription)
    document.getElementById("startDate").appendChild(startDate)
    document.getElementById("endDate").appendChild(endDate)

    let userId = parseInt(document.querySelector('.list-group-item').className.split(" ")[1])

    let submitForm = document.getElementById('submitForm')
    submitForm.addEventListener('click', (event) => {
      while (listgroup.hasChildNodes()) {
        listgroup.removeChild(listgroup.lastChild);
      }
      event.preventDefault();
      fetch(itineraryURL, {
        method: 'POST',
        body: JSON.stringify({user_id: userId,
          name: itineraryName.value,
          description: itineraryDescription.value,
          start_date: startDate.value,
          end_date: endDate.value
        }),
        headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'}
      }).then(res => res.json()).then(data => {
        fetch(userURL).then(data => data.json()).then(user => displayItinerary(user))
      })
    })
  })

  //
  let addLocation = document.getElementById("addLocation")
  addLocation.addEventListener('click', function(event) {
    event.preventDefault()
    //clears the page so that the form stuff can load
    while (placeWhereItineraryLoads.hasChildNodes()) {
      placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild);
    }
    let descriptionCity = document.createElement('input')
    descriptionCity.className = "form-control"
    let descriptionStreet = document.createElement('input')
    descriptionStreet.className = "form-control"
    let descriptionState = document.createElement('input')
    descriptionState.className = "form-control"
    let descriptionPostal = document.createElement('input')
    descriptionPostal.className = "form-control"
    let locationBoxDataList = document.createElement("DATALIST")
    locationBoxDataList.id = "locations"
    let descriptionLocationName = document.createElement('input')
    descriptionLocationName.className = "form-control"
    descriptionLocationName.setAttribute('list', locationBoxDataList.id)
    descriptionLocationName.appendChild(locationBoxDataList)
    placeWhereItineraryLoads.innerHTML =  `
    <div class="row">
    <div class="col-md-4">
    <div class="card" style="width: 50%; text-align: center; width: 500px;height: 600px; padding-top: 20px; opacity: .8;">
    <div class="container">
    <form>
    <div class="form-group" id="descriptionLocationName"><label> Location Name </label></div>
    <div class="form-group" id="descriptionStreet"><label>Street</label></div>
    <div class="form-group" id="descriptionCity"><label>City</label></div>
    <div class="form-group" id="descriptionState"><label>State</label></div>
    <div class="form-group" id="descriptionPostal"><label>Postal Code</label></div>
    <div class="form-group" id="connectToItinerary"><label> Add to Existing Itinerary </label><select class="form-control" id="dropDownList"></select></div>
    <div class="form-group" id="hiddenId" style="display: none;"></div>
    <button type="button" id="addYourLocation" class="btn btn-info">Add Location</button>
    </form>
    </div>
    </div>
    </div>
    </div>`

    document.getElementById("descriptionLocationName").appendChild(descriptionLocationName)
    document.getElementById("descriptionStreet").appendChild(descriptionStreet)
    document.getElementById("descriptionCity").appendChild(descriptionCity)
    document.getElementById("descriptionState").appendChild(descriptionState)
    document.getElementById("descriptionPostal").appendChild(descriptionPostal)
    addItineraryList()
    //populates data set with locations
    fetch(locationURL).then(data => data.json()).then(location => {
      location.forEach(loc => {
        let option = document.createElement('option')
        option.value = loc.name
        locationBoxDataList.appendChild(option)
      })
      //for now this is where the rest of the form autopopulates when you select a location
      descriptionLocationName.addEventListener('change', function (event) {
        event.preventDefault()
        fetch(locationURL).then(data => data.json()).then(location => {
          let descriptionLocationVal = location.filter(function (loc) {
            return loc.name === descriptionLocationName.value
          })
          descriptionStreet.value = descriptionLocationVal[0].street_address
          descriptionCity.value = descriptionLocationVal[0].city
          descriptionState.value = descriptionLocationVal[0].state
          descriptionPostal.value = descriptionLocationVal[0].postal_code
          document.getElementById('hiddenId').innerText = descriptionLocationVal[0].id
        })
      })
    })
  })
  function addItineraryList() {
    console.log("Hello")
    let userId = parseInt(document.querySelector('.list-group-item').className.split(" ")[1]);
    let itineraryList = document.getElementsByClassName(`list-group-item ${userId}`);

    let sel = document.getElementById('dropDownList');
    let fragment = document.createDocumentFragment();

    Array.prototype.forEach.call(itineraryList, function(itinerary, index) {
      let opt = document.createElement('option');
      opt.innerHTML = `${itinerary.id.split("-")[0]}`
      opt.value = `${itinerary.id.split("-")[1]}`
      fragment.appendChild(opt)
    })
    sel.appendChild(fragment)
    let addButton = document.getElementById('addYourLocation')
    addButton.addEventListener('click', (event) => {
      let ourItinId = document.getElementById('dropDownList').value
      let ourLocationId = document.getElementById('hiddenId').innerText
      fetch(stopURL, {
        method: 'POST',
        body: JSON.stringify({itinerary_id: `${ourItinId}`,
          location_id: `${ourLocationId}`
        }),
        headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
    })
  }
  // this is the end of where the userlocation form stuff is for now
  // loads users itineraries for now
  fetch(userURL).then(data => data.json()).then(user => userData(user))

  // code for loading users itineraries in side bar
  function userData (user) {
    loginButton.addEventListener('click', function(event) {
      event.preventDefault()
      document.getElementById("username").style.display="none";
      document.getElementById("loginButton").style.display="none";
      createButton.style.display="block";
      document.getElementById("addLocation").style.display="block";
      //filters user JSON object to return record that is equal to the user input for email
      displayItinerary(user)
    })
  }
  function displayItinerary(user){
    let userFilter = user.filter(function (user) {
      return user.email === emailForm.value
    })

    //creates the actual list elements with an id equal to the trip name, etc to show up in the left hand bar ofthe page
    userFilter[0].user_trips.forEach(trip => {
      let userTrip = document.createElement('li')
      // debugger
      userTrip.id = `${trip.name}-${trip.id}`
      userTrip.innerText = trip.name
      userTrip.style = "margin: 2.5px"
      userTrip.className = "list-group-item " + userFilter[0].id
      // debugger
      listgroup.appendChild(userTrip)

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
            return itin.name === (userTrip.id.split("-")[0])
          })
          // creating the place on the page where the itinerary info loads
          let itineraryArea = document.createElement('div')
          placeWhereItineraryLoads.appendChild(itineraryArea)
          itineraryArea.innerHTML = `
          <div class="card" style="text-align: center; padding-top: 25px; width: 600px; height: 200px; opacity: .75">

          <h6>This Trip:</h6>
          <h1> ${itineraryFilter[0].name} </h1>
          <p> ${itineraryFilter[0].description}</p>
          <p id="idItinerary" style="display: none;">${itineraryFilter[0].id}</p>
          <h6>Things to do:</h6>
          </div>
          <button type="button" id="deleteItinerary" class="btn btn-warning">Delete</button>`
          itineraryFilter[0].destinations.forEach(destination => {
            let locationArea = document.createElement('div')
            locationArea.className = "card"
            locationArea.style = "margin: 5px 25px 5px 25px; width: 550px; height: 225px; opacity: .75"
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
          let deleteButton = document.getElementById("deleteItinerary")
          deleteButton.addEventListener('click', function(event) {
            event.preventDefault()
            let x = document.getElementById("itin-container").childNodes

            for (let i = 1; i < x.length; i++) {
              if (x[i].innerText === document.getElementsByTagName('h1')[0].innerText) {
                document.getElementById("itin-container").removeChild(x[i])
              }
            }


            let card = document.getElementById('idItinerary')
            let valueIneed = card.innerText

            fetch(`http://localhost:3000/api/v1/itineraries/${valueIneed}`, {
              method: 'delete',
              headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'}
            })
            while (placeWhereItineraryLoads.hasChildNodes()) {
              placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild);
            }
          })
        })

      })
    })
  }




})
