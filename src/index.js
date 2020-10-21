let dogURL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {

    fetch(dogURL).then(response => response.json())
    .then(dogArray => dogArray.forEach(dog => renderDogCard(dog)))

    const renderDogCard = (dog) => {

        // {id: 1, name: "Mr. Bonkers", isGoodDog: true,
        // image: "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_1.jpg"}

        const dogBar = document.querySelector('#dog-bar')
        
        let span = document.createElement('span')
        span.className = "dog-name"
        span.innerText = dog.name

        dogBar.append(span)

        span.addEventListener("click", () => {

            let dogInfoContainer = document.querySelector("#dog-info")
            
            //resetting so that it clears each time new dog name is clicked
            dogInfoContainer.innerText = ""
    
            let image = document.createElement('img')
            image.src = dog.image
    
            let name = document.createElement('h2')
            name.innerText = dog.name
    
            let status = document.createElement("button")
            status.innerText = dog.isGoodDog == true ? "Good Dog!" : "Bad Dog!"

            dogInfoContainer.append(image, name, status)

            status.addEventListener("click", () => {
                
                let patchOption = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": 'application/json',
                            Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: dog.isGoodDog = !dog.isGoodDog
                    })
                }

                fetch(`${dogURL}/${dog.id}`, patchOption)
                .then(response => response.json())
                .then(dog => {
                    if (status.innerText == "Good Dog!") {
                        status.innerText = "Bad Dog!"
                    } else {
                        status.innerText = "Good Dog!"
                    }
                })        
            })
    
        })
       
    }


})

