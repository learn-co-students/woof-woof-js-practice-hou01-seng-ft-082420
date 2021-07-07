document.addEventListener("DOMContentLoaded", function() {
    const dogBar = document.querySelector('#dog-bar')
    
    const dogsURL = 'http://localhost:3000/pups/'
    fetch(dogsURL)
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => {renderDogName(dog)}))
    
    function renderDogName(dog){
        
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.className = "dogSpan"
    dogSpan.addEventListener('click', function(e){
        //e.preventDefault()
        createDog(dog)
    })

       
    dogBar.append(dogSpan)
}
function createDog(dog){
    const h2 = document.createElement('h2')
    h2.innerText = dog.name
    
    const img = document.createElement('img')
    img.src = dog.image
    
    const status = document.createElement('button')
    status.innerText = (dog.isGoodDog ? 'goodDog' : 'badDog')
    status.addEventListener("click", () => {
        // if(status.innerText === "goodDog") {
        //     status.innerText = "badDog"
        // } else {
        //     status.innerText = "goodDog" 
        // }  //op..mistic way
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": dog.isGoodDog = !dog.isGoodDog //only for boolean
            })
        })
        .then(createDog(dog))
        
    })
    
    const dogInfo = document.querySelector('#dog-info')
  
    dogInfo.innerHTML = ""
    dogInfo.append(h2,img,status)

    
}
    
})