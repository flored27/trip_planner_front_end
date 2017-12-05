
function getItineraries(){
  fetch('http://localhost:3000/api/v1/itineraries').then(data => data.json()).then(object => console.log(object))
}

//login
let loginForm = document.getElementById("login-form")
let loginButton = document.getElementById("loginButton")
let emailForm = document.getElementById("email")
let username = document.getElementById("username")
let emailBox = document.createElement("div")
let aBC = document.getElementsByClassName("abc")
// loginButton.addEventListener('click', deleteLoginBar)

  function deleteLoginBar(event) {
  event.preventDefault()
  let newForm = document.getElementById("abc2")

  aBC.innerHTML = newForm.innerHTML;
}
// loginForm.appendChild(emailBox)
// emailBox.innerHTML = `
// <label>Email</label>
// <input></input>
// <label>Password</label>
// <input></input>`


let createItinerary = document.createElement("button")
