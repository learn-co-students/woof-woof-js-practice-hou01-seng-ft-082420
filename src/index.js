URLBase = "http://localhost:3000/pups/"

document.addEventListener('DOMContentLoaded', () => {

    fetch(URLBase)
    .then(res => res.json())
    .then(pups => {
        console.log(pups)
        pups.forEach(pup => createPupCard(pup))
    });

    function createPupCard(pup) {
        const dogBar = document.querySelector('#dog-bar')
        const span = document.createElement('span')
        span.innerText = pup.name
        span.addEventListener('click', e => {
            let pups = document.querySelectorAll(".pups")
            for(let pup of pups){
                pup.style.display = 'none'
            }
            dogDiv.style.display = 'block'
        })


        const dogDivContainer = document.querySelector('#dog-info')
        const dogDiv = document.createElement('div')
        dogDiv.className = "pups"
        dogDiv.style.display = 'none'
        const img = document.createElement('img')
        img.src = pup.image

        const h2 = document.createElement('h2')
        h2.innerText = pup.name

        const btn = document.createElement('button')
        btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

        btn.addEventListener('click', e => {

            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify({
                    "isGoodDog" : pup.isGoodDog =! pup.isGoodDog
                })
            })
            .then(res =>res.json)
            // .then(editedPup => editedPup.isGoodDog ? btn.innerText = "Bad Dog!" : btn.inner)
            .then(function(editedPup){
                if(btn.innerText == "Good Dog!"){
                    btn.innerText = "Bad Dog!"
                }else{
                    btn.innerText = "Good Dog!"
                }
            })
        })


        dogBar.append(span)
        dogDiv.append(img,h2,btn)
        dogDivContainer.append(dogDiv)
    }

}); //this is the end of the DOM Content Loaded