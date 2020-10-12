const dogsURL = "http://localhost:3000/pups"

function getDogs(){
    fetch(dogsURL)
    .then(res => res.json())
}
const fetchDogs = () => {
    fetch(dogsURL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => createDog(dog)) )
}

const createDog = (dog) => {
    //create span element for puppy
    const dogBar = document.getElementById('dog-bar')
    const span = document.createElement('span')
    const dogInfo = document.getElementById('dog-summary-container')
    span.innerText = dog.name
    span.addEventListener("click", function(e){
        getSingleDog(e.target.id)
    })
    span.setAttribute("id", dog.id)

    dogBar.append(span)
}

const createDogCard = (dog) => {
    const dogInfo = document.getElementById('dog-info')

    const div = document.createElement('div')
    div.classList.add("dog-info-card")
    div.setAttribute("dogId", dog.id)

    const img = document.createElement('img')
    img.setAttribute('src', dog.image)

    const h2 = document.createElement('h2')
    h2.innerText = dog.name

    const goodBtn = document.createElement('button')
    if (dog.isGoodDog === true){
        goodBtn.innerText = "Good Dog!"
    } else {
        goodBtn.innerText = "Bad Dog!"
    }
    goodBtn.addEventListener("click", function(e){
        dog.isGoodDog = !dog.isGoodDog
        fetch(dogsURL + `/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then (res => res.json())
        .then (function(dog){
            if (dog.isGoodDog === true){
                goodBtn.innerText = "Good Dog!"
            } else {
                goodBtn.innerText = "Bad Dog!"
            }
        })
    })

    div.append(img, h2, goodBtn)
    dogInfo.append(div)
}

function getSingleDog(id) {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""
    fetch(dogsURL + `/${id}`)
    .then(res => res.json())
    .then(dog => createDogCard(dog))
}


document.addEventListener("DOMContentLoaded", function(e){
    console.log("Loaded up Aleks")
    fetchDogs();

})