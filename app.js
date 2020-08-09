// DOM ---------------------------------------------------------------------
const map_dom = document.querySelector("#map")
const lat_input = document.querySelector("#lat")
const lon_input = document.querySelector("#lon")
const copied_msg = document.querySelector(".copied_msg")
const mobile_arrow = document.querySelector(".mobile_arrow")
const mobile_arrow_icon = document.querySelector(".mobile_arrow i")
const coords_box = document.querySelector(".coords_box")

// Map initital options
const options = {
  lat: 45.717369079589844,
  long: 4.7925190925598145,
  zoom: 12.5
}


// Address to GPS Coords setup
const AUTOCOMPLETE_APP_ID = "plX06UFD072B"
const AUTOCOMPLETE_API_KEY = "0666e0dda3e3ca871d3085176c6470ac"

const placesAutocomplete = places({
  appId: AUTOCOMPLETE_APP_ID,
  apiKey: AUTOCOMPLETE_API_KEY,
  container: document.querySelector('#address'),
  type: "address"
})

placesAutocomplete.on('change', e => {
  lon_input.value = e.suggestion.latlng.lng
  lat_input.value = e.suggestion.latlng.lat

  options.lat = e.suggestion.latlng.lat
  options.lon = e.suggestion.latlng.lng

  mymap.setView([options.lat, options.long], options.zoom)
})


// Map Initialisation ---------------------------------------------------------------------

const mymap = L.map('map')
mymap.setView([options.lat, options.long], options.zoom)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWF4aW1lLWJmIiwiYSI6ImNrOGZ3OXA4azA3Mm4zZ25vZDh2dTIycjAifQ.yauLa5uwQ-hV6clg6hDS7A'
}).addTo(mymap)


// Copied Message ---------------------------------------------------------------------
lat_input.addEventListener("click", event => {
  if(lat_input.value !== ""){
    lat_input.select()
    document.execCommand("copy")
    copied_msg.classList.add("visible")
    setTimeout(() => copied_msg.classList.remove("visible"), 3000)
  }
})

lon_input.addEventListener("click", event => {
  if(lon_input.value !== ""){
    lon_input.select()
    document.execCommand("copy")
    copied_msg.classList.add("visible")
    setTimeout(() => copied_msg.classList.remove("visible"), 3000)
  }
})

mymap.addEventListener('click', e => {
  lati = e.latlng.lat
  lng = e.latlng.lng

  lat_input.value = lati
  lon_input.value = lng
})


// Cursor styling ---------------------------------------------------------------------
mymap.addEventListener("mousedown", () => map_dom.style.cursor = "grabbing" )
mymap.addEventListener("mouseup", () => map_dom.style.cursor = "crosshair" )


// Mobile show popup ---------------------------------------------------------------------
mobile_arrow.addEventListener("click", () => {
  coords_box.classList.toggle("open")
  if(mobile_arrow_icon.className === "fas fa-angle-up"){
    mobile_arrow_icon.className = "fas fa-angle-down"
  } else {
    mobile_arrow_icon.className = "fas fa-angle-up"
  }
})