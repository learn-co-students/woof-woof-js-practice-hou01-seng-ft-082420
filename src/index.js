URLBase = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {
    fetch(URLBase).then(res => res.json()).then(pups => pups.forEach(pup => createPupCard(pup)));

    function createPupCard(pup) {
        //clickable top menu w/dog names
        const dogBar = document.querySelector("#dog-bar")
        const span = document.createElement('span')
        span.innerText = pup.name
        span.addEventListener('click', e => {
            let pups = document.querySelectorAll(".pups")
            for (let pup of pups){
                pup.style.display = 'none'
            }
            dogDiv.style.display = 'block'
        })
        
        const dogDivContainer = document.querySelector("#dog-info")
        const dogDiv = document.createElement('div')
        dogDiv.className = "pups"
        dogDiv.style.display = 'none'

        //here's where we're append dog info to dogDiv
        const img = document.createElement('img')
        img.src = pup.image

        const h3 = document.createElement('h3')
        h3.innerText = pup.name

        const btn = document.createElement('button')
        btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
        //btn event listener
        btn.addEventListener('click', e => {
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    //Look @ object name in DB!
                    //line 45 reads if the value of "pup.isGoodDog" is true, make it NOT(!) true
                    //if it's false, make it NOT(!) false
                    "isGoodDog": pup.isGoodDog =!pup.isGoodDog
                })
            })
            .then(res => res.json())
            .then(editedPup => editedPup.isGoodDog ? btn.innerText = "Bad Dog!" : btn.innerText = "Good Dog!")
            
            //this works too
            // .then(function(editedPup){
            //     if(btn.innerText == "Good Dog!"){
            //         btn.innerText = "Bad Dog!"
            //     }else{
            //         btn.innerText = "Good Dog!"
            //     }
            //     })

        })

        //appending section
        dogBar.append(span)
        dogDivContainer.append(dogDiv)
        dogDiv.append(img, h3, btn)
    }
});//DOMContentLoaded ends here!