const URLBase = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML is loaded!! good luck Texas SE-082420!')

    fetch (URLBase).then(res => res.json()).then(pups => pups.forEach(pup => createPupCard(pup))); 


    function createPupCard(pup){

        const dogContainer = document.querySelector("#dog-summary-container")
        //divDogInfo is the div that will hold all our shown info. it is already appended to parent div
        const divDogInfo = document.querySelector('#dog-info')
        //assign this a class so we can iterate through each pup with this class
        newDiv = document.createElement('div')
        // console.log(newDiv)
        newDiv.className = "pup"
        
        //line 17 hides the dog info from the user, UNTIL event listener is set up for click(line25)
        newDiv.style.display = 'none'
        
        //grab divBar
        const divBar = document.querySelector("#dog-bar")
        //create, assign dog name and append the span - look at near bottom of function to see all append statements
        const span = document.createElement('span')
        span.innerText = pup.name
        //now we need to make an event listener that listens for the click of the span
        span.addEventListener('click', function(e) {
            let pups = document.querySelectorAll(".pup")
            console.log(newDiv)
            console.log(e.target)
            for (let pup of pups){
                pup.style.display = 'none'
                // console.log(pup)
            }
            //shouldn't this be styling the newDiv???
            divDogInfo.style.display = 'block'
            console.log(newDiv)
        })



        const img = document.createElement('img')
        img.src = `${pup.image}`

        const h3 = document.createElement('h3')
        h3.innerText = pup.name

        const btn = document.createElement('button')
        //ternary function
        btn.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
        btn.dataset.id = pup.id
        btn.addEventListener('click', (e) => {
            // console.log(e)
            // if(e.target.innerText.includes("Good")) {
            //     e.target.innerText = "Bad Dog!"
            //     newValue = false
            // }   else{
            //     e.target.innerText = "Good Dog!"
            //     newValue = true
            // }
        })

        const br1 = document.createElement('br')
        const br2 = document.createElement('br')
        
        newDiv.append(img, h3, btn, br1, br2)
        divDogInfo.append(newDiv)
        divBar.append(span)
        // console.log(dogContainer)

        //when we click on pup name, we want to see individual dog info

    }



});//end of DOMContentLoaded


