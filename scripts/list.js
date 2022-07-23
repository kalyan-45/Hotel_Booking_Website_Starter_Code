let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "5353f5c491mshc8fec11dc4a9bb2p1654a9jsn01a9c2d668b1";

//function for view city on the map view


let initMap = locations => {
    let center = { lat: parseFloat(locations[0][1]), lng: parseFloat(locations[0][2]) };
    let map = new google.maps.Map(document.getElementById('mapView'), {
        zoom: 10,
        center: center
    });
    let infoWindow = new google.maps.InfoWindow({});
    let marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', ((marker, count) => {
            return function () {
                infoWindow.setContent(locations[count][0]);
                infoWindow.open(map, marker);
            }
        })(marker, count));
    }
}


//Function for accessing the city and predent it

let initList = hotelList => {
    let hotelListElement = document.getElementById('listView');
    hotelList.forEach(hotel => {
        let hotelLinkElement = document.createElement("a");
        hotelLinkElement.setAttribute("href", `detail.html?id=` + hotel.result_object.location_id);
        hotelListElement.appendChild(hotelLinkElement);
        let hotelContainer = document.createElement("div");
        hotelContainer.setAttribute("class", "hotelList");
        hotelLinkElement.appendChild(hotelContainer);
        let hotelImage = "<img src=" + hotel.result_object.photo.images.medium.url + " alt='" + hotel.result_object.name + "' class='hotel-image-small'/>";
        hotelContainer.innerHTML = hotelImage;
        let hotelDetailsContainer = document.createElement("div");
        hotelDetailsContainer.setAttribute("class", "info");
        hotelContainer.appendChild(hotelDetailsContainer);
        let hotelName = hotel.result_object.name;
       
            hotelDetailsContainer.innerHTML = "<h4>" + hotel.result_object.name + "</h4>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>" + hotel.result_object.rating + " <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p style='font-size: small'>" + hotel.result_object.address + "</p>";
     
            hotelDetailsContainer.innerHTML = "<h3>" + hotel.result_object.name + "</h3>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>" + hotel.result_object.rating + " <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p>" + hotel.result_object.address + "</p>";
        
    });
}

//Function for display the hotels in selected city

let fetchHotelListAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data;
            let locations = [];
            hotelList = result.filter(item => item.result_type == "lodging");
            hotelList.forEach(item => {
                locations.push([item.result_object.name + "<br><a href=\"detail.html?id=" + item.result_object.location_id + "\">Book Hotel</a>", item.result_object.latitude, item.result_object.longitude]);
            });
            document.getElementById("loader").style.display = "none";
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("viewLink").style.visibility = "visible";
            
            initList(hotelList);
            initMap(locations);
           
        }
    });

    xhr.open("GET", API_URL + "locations/search?lang=en_US&limit=100&query=" + urlParams.get('city'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

fetchHotelListAPI();