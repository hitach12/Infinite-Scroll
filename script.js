const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader')

let photosArray= [];
let ready = false; 
let totalImages = 0;
let imagesLoaded=0;
//Unsplash api
const count = 30;
const apiKey='gNFunxoCG-0CevfRGIHWnksGAPaf7uSDtHdHOiD9VY8';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;




function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded == totalImages){
        ready= true;
        loader.hidden=true;
        console.log('ready = ', ready)
    }
}

//Create elements for links and phtos , add to dom 

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('total images' , totalImages)
    photosArray.forEach((photo) => {
        const item =document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');

        const img =document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);

        img.addEventListener('load',imageLoaded)

    });


}
//Get photos from unsplash api 

async function getPhotos(){
    try {
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
    } catch (error) {
        alert(error)
    }
}


//check to see if scrolling near bottom of page , load more photoss

window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false
        getPhotos();
        console.log("load more ! ")

    }
})


//on Load
getPhotos();