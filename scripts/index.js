//This button manage the view more and view less functionality


let ViewMoreCity = () => {
    let viewMoreButton = document.getElementsByClassName('btn btn-secondary')[0];
    if (viewMoreButton.innerText === "View More") {
        document.getElementById("addedCityCards").style.display="block";
        viewMoreButton.innerText ='View Less';
    }
    else {
        document.getElementById("addedCityCards").style.display="none";
        viewMoreButton.innerText ='View More';
    }
}
   
    



