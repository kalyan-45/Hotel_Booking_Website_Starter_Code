let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "857b416201msha9db847cc82160dp1c8858jsn52ea58982558";

let paramid = urlParams.get('id');
console.log(paramid);




//fetch hotel photos
let fetchHotelPhotosAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let carouselParentElement = document.getElementById("imageSlider");
            let result = JSON.parse(this.responseText).data;
            let size = Math.min(result.length, 5);
        
            for (let i = 0; i < size; i++) {
                let div = document.createElement("div");
                div.classList.add("carousel-item");
                if (i == 0)
                    div.classList.add("active");
                let image = document.createElement("img");
                image.setAttribute("class", "carousel-image");
                image.classList.add("d-block");
                image.classList.add("w-100");
                image.src = result[i].images.large.url;
                div.appendChild(image);
                carouselParentElement.appendChild(div);
            }
           
        }
    });
    
    xhr.open("GET", API_URL + "photos/list?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

fetchHotelPhotosAPI();

//let fetchHotelDetai() function fetch the detail of the hotel

let fetchHotelDetail = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function(){
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data[0];
            document.getElementById("hotel-name").innerText = result.name;
            const rating = result.rating;
            printRating(rating);
            let amenities = result.amenities;
            for(let i = 0; i < Math.min(amenities.length, 10); i++) {
                let liElement =  document.createElement("li")
                liElement.innerText = amenities[i].name;
                document.getElementById("amenities").appendChild(liElement);
            }


            let paraDescription = document.getElementById("description");
            paraDescription.innerText =  result.description;

           
        }
    });
    xhr.open("GET", API_URL + "hotels/get-details?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
    xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

    xhr.send();
}

function printRating(rating) {
    let intRating = parseInt(rating);
    let ratingString = "";
    let i = 0;
    let isPositiverating = true;
    const ratingDiv = document.getElementById("rating");
    for (i = 0; i < intRating; i++) {
      ratingString = ratingString + `<i class="fa-solid fa-star rating"></i>`;
    }
    if (rating.length > 1 && rating[2] != "0") {
      isPositiverating = false;
      ratingString =
        ratingString + `<i class="fa-solid fa-star-half-stroke rating"></i>`;
  
      i = i + 1;
    }
    for (let j = i; j < 5; j++) {
      ratingString = ratingString + `<i class="fa-solid fa-star"></i>`;
    }
  
    ratingDiv.innerHTML = ratingString;
  }

fetchHotelDetail();

// Take inputs i.e. Adult, From Date & To Date and calculate the total price of the booking
let dispalyTotalPrice = () => {
    const price_room = 1000;
    let elementAdult = document.getElementById('adult');
    let elementName = document.getElementById('name');
    let elementFromDate = document.getElementById('from-date');
    let elementToDate = document.getElementById('to-date');
    let elementPrice = document.getElementById('total');

    let dateOfToDate = new Date(elementToDate.value);
    let dateOfFromDate = new Date(elementFromDate.value);

    let hideBeforeDate = elementFromDate.value;
    elementToDate.min = hideBeforeDate;

    let days = (dateOfToDate - dateOfFromDate) / (24 * 3600 * 1000);
    
    if(elementAdult.value && elementToDate.value && elementFromDate.value) {
        elementPrice.value = "Rs." + parseInt(elementAdult.value) * price_room * days;
    }
    else {
        elementPrice.value = "Rs.0";
    }
}


function setIdOfTheHotel() {
    const refToID = document.getElementById("id");
    refToID.value = paramid;
  }
  setIdOfTheHotel();