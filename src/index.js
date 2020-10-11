document.addEventListener("DOMContentLoaded", function(){
    console.log("the Dom has loaded")
    whereToBegin()
    const filtBtn = document.querySelector('#good-dog-filter')
    filtBtn.addEventListener('click', e => {
        e.preventDefault()
        pupFilter()
    })
});
const UrlBase = "http://localhost:3000/pups"

function whereToBegin(){
const UrlBase = "http://localhost:3000/pups"
fetch(UrlBase).then(res => res.json()).then(pups => pups.forEach(pup => pupSpan(pup)))

}

function pupSpan(pup){
    const bar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.innerText = pup.name
    span.className = `good-dog-${pup.isGoodDog}`
    span.id = `pupId-${pup.id}`
    bar.append(span)

    span.addEventListener('click', () => {
        // console.log("clicky")
        if(typeof(document.querySelector('img')) != 'undefined' && document.querySelector('img') != null){
            // console.log("pic is displayed")
            changeDisplayedPup(pup)
        } else {
        displayPup(pup)
        }
    })
    // pupFilter()
}

function displayPup(pup){
    console.log("This will be the display!")
    console.log(pup)
    const dogInfoContainer = document.querySelector('#dog-info')

    const img = document.createElement('img')
    img.src = pup.image

    const h2 = document.createElement('h2')
    h2.innerText = pup.name

    const button = document.createElement('button')
    button.id = 'good-bad-btn'
    if(pup.isGoodDog == true){
        button.innerText = "Good Dog!"
    } else if (pup.isGoodDog == false) {
        button.innerText = "Bad Dog!"
    }

    dogInfoContainer.append(img, h2, button)

    button.addEventListener('click', e => {
        e.preventDefault()
        console.log('good/bad click')
        let pupSPan = document.querySelector(`#pupId-${pup.id}`)
        console.log("PUP SPAN!!!", pupSPan)
        let dogStatus = pup.isGoodDog
        if(dogStatus == true){
            dogStatus = false
            console.log(dogStatus)
        } else {
            dogStatus = true
            console.log(dogStatus)
        }
            img.remove()
            h2.remove()
            button.remove()
        console.log(UrlBase + `/${pup.id}`)
        fetch(UrlBase + `/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: dogStatus
            })
        })
        .then(res => res.json()).then(pup => displayPup(pup))
        pup.isGoodDog = dogStatus
        pupSPan.className = `good-dog-${pup.isGoodDog}`
    })
}

function changeDisplayedPup(pup) {
    const img = document.querySelector('img')
    const h2 = document.querySelector('h2')
    const button = document.querySelector('#good-bad-btn')
    img.remove()
    h2.remove()
    button.remove()
    displayPup(pup)
}

function pupFilter() {
    const filtBtn = document.querySelector('#good-dog-filter')
    // let filter = false
    let goodPups = document.querySelectorAll('.good-dog-true')
    let badPups = document.querySelectorAll('.good-dog-false')
        if(filtBtn.innerText == "Filter good dogs: OFF"){
            filtBtn.innerText = "Filter good dogs: ON"
            console.log("On")

            console.log(goodPups, badPups)
            for( const pup of badPups){
            pup.style.display = "none"
            }
        } else {
            filtBtn.innerText = "Filter good dogs: OFF"
            for( const pup of badPups){
                // pup.style.display = "block"
                pup.removeAttribute('style')
                }
            // filter = false
        }
}