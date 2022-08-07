let elForm = document.querySelector(".form")
let moviesArray = movies.slice(0,12);


function normalizedArray(array) {
    let newArray = []

    array.forEach(item => {
        let newObject = {}
        
        newObject.title = item.Title.toString()
        newObject.movieYear = item.movie_year
        newObject.categories = item.Categories.split("|")
        newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`
        newObject.imgSrc = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
        newObject.movieRating = item.imdb_rating
        
        
        newArray.push(newObject)
    });
    
    return newArray 
}



let elMovieWrapper = document.querySelector(".movie__wrapper")
let elTemplate = document.querySelector("#movie_card").content

let newArray = normalizedArray(moviesArray) 

function render(array,wrapper) {
    wrapper.innerHTML = null
    let tempFragment = document.createDocumentFragment()
    
    for (const item of array) {
        let templateItem = elTemplate.cloneNode(true)
        
        templateItem.querySelector(".movie__img").src = item.imgSrc
        templateItem.querySelector(".movie__title").textContent = item.title
        templateItem.querySelector(".movie__year").textContent = item.movieYear
        templateItem.querySelector(".movie__rating").textContent = item.movieRating
        templateItem.querySelector(".movie__url").href = item.videoUrl
        
        tempFragment.appendChild(templateItem)
    }
    wrapper.appendChild(tempFragment)
}

render(newArray,elMovieWrapper)


elForm.addEventListener("submit" , function (event) {
    event.preventDefault()

    let elInput = document.querySelector(".item").value.trim()

    let inputArray = []
    
    for (let i = 0; i < newArray.length; i++) {
        
        if(elInput <= newArray[i].movieRating) {
            inputArray.push(newArray[i])
        }   
    }

    render(inputArray,elMovieWrapper)
})


let select = document.querySelector(".select")
    

function search(array) {
    let categoriesArray = []
    for (const item of array) {
        for (const itemCategorie of item.categories) {
            if(!categoriesArray.includes(itemCategorie)) {
                categoriesArray.push(itemCategorie)
            }
        }
    }
    return categoriesArray
}

let finded = search(newArray)

function renderCategorie(array) {
    
    for (let i = 0; i < array.length; i++) {
        let newOption = document.createElement("option")
        newOption.textContent = finded[i]
        select.appendChild(newOption)
    }
}

renderCategorie(newArray)


select.addEventListener("input" , () => {

    let filteredMovie = newArray.filter(function(item) {
        return item.categories.includes(select.value)
    })

    if(select.value != "all") {
        render(filteredMovie, elMovieWrapper)
    }else {
        render(newArray, elMovieWrapper)
    }
})