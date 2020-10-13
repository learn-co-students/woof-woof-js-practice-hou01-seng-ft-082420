function createDogName(dog){
    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.innerHTML = dog.name
    dogSpan.classList.add(`good-${dog.isGoodDog}`)
    dogBar.append(dogSpan)
    dogSpan.addEventListener('click', function(e){
        const dogInfo = document.querySelector('#dog-info')
        dogInfo.innerHTML = null
        createDogInfo(dog)
    })


}

function createDogInfo(dog){
    const dogInfo = document.querySelector('#dog-info')
    const img = document.createElement('img')
    img.setAttribute('src', dog.image)
    const h2 = document.createElement('h2')
    h2.innerHTML = dog.name
    const goodBadBtn = document.createElement('button')
    if(dog.isGoodDog== true){
        goodBadBtn.innerHTML = "Good Dog!"
    }else{
        goodBadBtn.innerHTML = "Bad Dog!"
    }
    dogInfo.append(img, h2, goodBadBtn)

    dogId = dog.id
    buttonId = dog.id

    goodBadBtn.addEventListener('click', function(e){
        dog.isGoodDog = !dog.isGoodDog
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then(function(resposne){
            return resposne.json()
        })
        .then(function(obj){
            if(dog.isGoodDog === true){
                goodBadBtn.innerHTML = "Good Dog!"
            }else{
                goodBadBtn.innerHTNL = "Bad Dog!"
            }
        })
    })
}


document.addEventListener("DOMContentLoaded", function(e){
    fetch('http://localhost:3000/pups')
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        for (const dog of json)
        createDogName(dog)
    })
    
    // const goodBadFilterBtn = document.getElementById('good-dog-filter')
    // const dogBar = document.querySelector('#dog-bar')
    // goodBadFilterBtn.addEventListener('click', function(e){
    //     const goodDogs = document.querySelectorAll('.good-true')
    //     console.log(goodDogs)
    //     dogBar.append(goodDogs.forEach(doggo => createDogName(doggo)))
    // })

})