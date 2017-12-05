let loginForm = document.getElementById("login-form")
let loginButton = document.getElementById("loginButton")
let emailForm = document.getElementById("email")
let username = document.getElementById("username")
let emailBox = document.createElement("div")
let sideBarAppend = document.getElementById('side-bar')
let listgroup = document.getElementsByClassName('list-group')
let placeWhereItineraryLoads = document.getElementById('itinerary-detail')
let createButton = document.getElementById("createButton")
const userURL = 'http://localhost:3000/api/v1/users'
const itineraryURL = 'http://localhost:3000/api/v1/itineraries'
const locationURL = 'http://localhost:3000/api/v1/locations'

document.addEventListener('DOMContentLoaded', function() {

// fetch('http://localhost:3000/api/v1/itineraries').then(data => data.json()).then(itinerary => itineraryStuff(itinerary))

  //create an itinerary
    createButton.addEventListener('click', function(event) {
      //clears the page so that the form stuff can load
      while (placeWhereItineraryLoads.hasChildNodes()) {
        placeWhereItineraryLoads.removeChild(placeWhereItineraryLoads.lastChild);
      }
     let itineraryDescription = document.createElement('input')
     let itineraryName = document.createElement('input')
     let descriptionCity = document.createElement('input')
     let descriptionStreet = document.createElement('input')
     let descriptionState = document.createElement('input')
     let descriptionPostal = document.createElement('input')
     let locationBoxDataList = document.createElement("DATALIST")
     locationBoxDataList.id = "locations"

     let descriptionLocationName = document.createElement('input')
     descriptionLocationName.setAttribute('list', locationBoxDataList.id)
     descriptionLocationName.appendChild(locationBoxDataList)

     placeWhereItineraryLoads.appendChild(itineraryDescription)
     placeWhereItineraryLoads.appendChild(itineraryName)
     placeWhereItineraryLoads.appendChild(descriptionLocationName)
     placeWhereItineraryLoads.appendChild(descriptionStreet)
     placeWhereItineraryLoads.appendChild(descriptionCity)
     placeWhereItineraryLoads.appendChild(descriptionState)
     placeWhereItineraryLoads.appendChild(descriptionPostal)

     //populates data set with locations
     fetch(locationURL).then(data => data.json()).then(location => {
       location.forEach(loc => {
         let option = document.createElement('option')
         option.value = loc.name
         locationBoxDataList.appendChild(option)
       })
     })

     descriptionLocationName.addEventListener('change', function(event){
       event.preventDefault()
        fetch(locationURL).then(data => data.json()).then(location => {
       let descriptionLocationVal = location.filter(function (loc) {
         return loc.name === descriptionLocationName.value
       })
        descriptionStreet.value = descriptionLocationVal[0].street_address
        descriptionCity.value = descriptionLocationVal[0].city
        descriptionState.value = descriptionLocationVal[0].state
        descriptionPostal.value = descriptionLocationVal[0].postal_code
        })
      })
    })


  // loads users itineraries for now
  fetch(userURL).then(data => data.json()).then(user => userData(user))

  // code for loading users itineraries in side bar
  const userData = (user) => {
    loginButton.addEventListener('click', function(event) {
      event.preventDefault()
      //filters user JSON object to return record that is equal to the user input for email
      let userFilter = user.filter(function (user) {
        return user.email === emailForm.value
      })

      //creates the actual list elements with an id equal to the trip name, etc to show up in the left hand bar ofthe page
      userFilter[0].user_trips.forEach(trip => {
        let userTrip = document.createElement('li')
        userTrip.id = trip.name
        userTrip.innerText = trip.name
        userTrip.className = "list-group-item"
        listgroup[0].appendChild(userTrip)

        //loads itinerary information
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
            <h1> ${itineraryFilter[0].name} </h1>
            <p> ${itineraryFilter[0].description}</p>`
             itineraryFilter[0].destinations.forEach(destination => {
               let locationArea = document.createElement('div')
               locationArea.innerHTML = `
              <h3>${destination.name}</h3>
               <h4>${destination.street_address}</h4>
               <h5>${destination.city}</h5>
               <h5>${destination.state}</h5>
               <h5>${destination.zip}</h5>`
               itineraryArea.appendChild(locationArea)

             })
           })
          })

        })
      })
    }






})
