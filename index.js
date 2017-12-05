
function getItineraries(){
  fetch('http://localhost:3000/api/v1/itineraries').then(data => data.json()).then(object => console.log(object))
}

//login
let loginForm = document.getElementById("login-form")
let emailBox = document.createElement("div")
loginForm.appendChild(emailBox)
emailBox.innerHTML = `
<label>Email</label>
<input></input>
<label>Password</label>
<input></input>`

let createItinerary = document.createElement("button")
