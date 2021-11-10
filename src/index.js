const ramenMenu = document.getElementById('ramen-menu'); 
const form = document.getElementById('new-ramen'); 
let ramenData = ""
let ramenId = 1; 

function getRamen(){
    fetch('http://localhost:3000/ramens')
        .then(resp => resp.json())
        .then(data => {
            ramenMenu.innerHTML = ""; 
            ramenData = data; 
            for (let ramen of data){
                let ramenImg = document.createElement('img'); 
                ramenImg.setAttribute('src', ramen.image); 
                ramenImg.setAttribute ('id', ramen.id)
                ramenMenu.appendChild(ramenImg); 
                document.getElementById(ramen.id).addEventListener('click', viewRamen)
            }
            viewRamen(); 
        })

}

function viewRamen(event){
    if (event) {
    ramenId = event.target.id;
    }
    //console.log(ramenId); 
   // console.log(ramenData); 
    for (let item of ramenData){
        if (item.id == ramenId){
            document.querySelector('#ramen-detail img').setAttribute('src', item.image); 
            document.querySelector('#ramen-detail h2').textContent = item.name; 
            document.querySelector('#ramen-detail h3').textContent = item.restaurant; 
            document.querySelector('#rating-display').textContent = item.rating; 
            document.querySelector('#comment-display').textContent = item.comment; 
        }
    }
}

function addRamen(event){
    event.preventDefault(); 
    console.log('new ramen!')
    let postObj = {
        name: document.getElementById('new-name').value, 
        restaurant: document.getElementById('new-restaurant').value,
        image:document.getElementById('new-image').value,
        rating:document.getElementById('new-rating').value,
        comment:document.getElementById('new-comment').value,
    }
    fetch('http://localhost:3000/ramens', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json',
        },
        body: JSON.stringify(postObj)
    } )
        .then( () => {
            document.getElementById('new-name').value = "";
            document.getElementById('new-restaurant').value = "";
            document.getElementById('new-image').value = "";
            document.getElementById('new-rating').value ="";
            document.getElementById('new-comment').value = "";
            getRamen();
        }); 
        
}

document.addEventListener('DOMContentLoaded', getRamen)
form.addEventListener('submit', addRamen)