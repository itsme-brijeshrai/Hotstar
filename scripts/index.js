const carousel = document.querySelector('.carousel');
let sliders =[]

let sliderIndex =0

const createSlide = () =>{
    if(sliderIndex >= movies.length){
        sliderIndex =0
    }

    //creating DOM element

    let slider = document.createElement('div')
    let imgElement = document.createElement('img')
    let content = document.createElement('div')
    let h1 = document.createElement('h1')
    let p = document.createElement('p')

    // attaching all elements
    imgElement.appendChild(document.createTextNode(''));
    h1.appendChild(document.createTextNode(movies[sliderIndex].name))
    p.appendChild(document.createTextNode(movies[sliderIndex].des))
    content.appendChild(h1)
    content.appendChild(p)
    slider.appendChild(content)
    slider.appendChild(imgElement)
    carousel.appendChild(slider)

    // setting up image

    imgElement.src = movies[sliderIndex].image
    sliderIndex++

    // setting elements classname

    slider.className = 'slider'
    content.className = 'slider-content'
    h1.className = 'movie-title'
    p.className = 'movie-des'
    sliders.push(slider)

    // adding sliding effect

    if(sliders.length){
        sliders[0].style.marginLeft=`calc(-${100*(sliders.length-2)}% - ${30 *(sliders.length - 2)}px)`
    }
}

for(let i=0;i<3; i++){
    createSlide()
}

setInterval(() => {
    createSlide()
}, 3000);


// card slider

let cardContainers = [...document.querySelectorAll('.movies-list')]
let preBtns = [...document.querySelectorAll('.pre-btn')]
let nxtBtns = [...document.querySelectorAll('.nxt-btn')]

// console.log(cardContainers)
cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width

    nxtBtns[i].addEventListener('click',()=>{
        item.scrollLeft +=containerWidth - 200
    })

    preBtns[i].addEventListener('click',()=>{
        item.scrollLeft -=containerWidth + 200
    })
});

// let movie_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
const api_key ='1fe93dc16602339750c6dcc610dd1c0d'
let img_url = 'https://image.tmdb.org/t/p/w500'
let genres_list_http = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
let movie_genres_http = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=`
async function searchMeal(){
    try{
        const res = await fetch(genres_list_http)
        let data = await res.json()
        genres = data.genres
       genres.forEach(element => {
        search(element.id, element.name)
       });
    }
    catch(err){
        console.log(err)
    }
}

searchMeal()

async function search(id, name){
    try{
        const res = await fetch(movie_genres_http+id)
        let data = await res.json()
        let results =data.results
        appenda(results,name)
    }
    catch(err){
        console.log(err)
    }
}

function appenda(results,name){
    let movies = document.querySelector('#movies')
    let title = document.createElement('h1')
    title.className='title'
    title.innerText=`Popular in ${name}`

    movies.append(title)

    let  movies_list = document.createElement('div')
    movies_list.className='movies-list'

    let pre = document.createElement('button')
    pre.className='pre-btn' 
    let pre_image = document.createElement('img')
    pre_image.src = './images/pre.png'
    pre.append(pre_image)

    let nxt = document.createElement('button')
    nxt.className='nxt-btn' 
    let nxt_image = document.createElement('img')
    nxt_image.src = './images/nxt.png'
    nxt.append(nxt_image)

    movies_list.append(pre,nxt)
  
    results.forEach(e => {
        
        // console.log(e)

        let card_container = document.createElement('div')
        card_container.className='card-container'

        let card = document.createElement('div')
        card.className='card'
    
        let card_img = document.createElement('img')
        card_img.className='card-img'
        card_img.src=img_url+e.poster_path

        let card_body = document.createElement('div')
        card_body.className='card-body'
        let name = document.createElement('h2')
        name.className ='name'
        name.innerText= e.original_title

        let des = document.createElement('h6')
        des.className ='des'
        des.innerText=e.overview

        let watchlist_btn = document.createElement('button')
        watchlist_btn.className ='watchlist-btn'
        watchlist_btn.innerHTML='<i class="fa-solid fa-plus"></i>'
        watchlist_btn.innerText='add to watchlist'

        card_body.append(name,des,watchlist_btn)
        card.append(card_img,card_body)
        card_container.append(card)
        movies_list.append(card_container)
        card_container.addEventListener('click',()=>{
             getMovie(e.id)
        })
    });
 
    movies.append(movies_list)
}

async function getMovie(id){
    console.log(id)
    try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1fe93dc16602339750c6dcc610dd1c0d`)
        let datas = await res.json()
        

        localStorage.setItem('data',JSON.stringify(datas));

        window.location.href="show_movie.html"
    }
    catch(err){
        console.log(err)
    }
}


let id
async function serachMovies(){
    // https://www.omdbapi.com/?apikey=6a41ddca&s=om_shanti_om
   
   try{
    const query = document.querySelector('.search-box').value
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1fe93dc16602339750c6dcc610dd1c0d&query=${query}&page=1`)
    const data = await res.json();
    const movies = data.results
    return movies
   } catch(err){
    console.log('err:',err)
   }
}

async function main(){
    let data = await serachMovies()
    if(data == undefined){
        return false
    }
    appendMovie(data)
    console.log(data)
}

function appendMovie(ele){
   
    let  search_details = document.getElementById('search_details')
    search_details.innerHTML=null
    for(let i=0;i<ele.length;i++){
        let details_div = document.createElement('div')
        let detailsDiv = document.createElement('div')
        detailsDiv.className='detailsDiv'
        detailsDiv.style.display='flex'
        detailsDiv.style.flexDirection='column'
        detailsDiv.style.gap='2px'
        detailsDiv.padding='2px 0'
        details_div.className='details_div'
        let poster = document.createElement('img');
        poster.style.height="90px"
        poster.src= img_url+ele[i].poster_path
        details_div.style.display='flex'
        details_div.style.flexDirection='row'
        details_div.style.gap='5%'
        details_div.style.border='1px solid white'
        let title = document.createElement('h5');
        title.className='title_inner'
        title.style.marginTop="8px"
        title.innerText = ele[i].original_title
        let vote_average = document.createElement('h5');
        vote_average.innerText = `rating: ${ele[i].vote_average}`
        let lan = document.createElement('h5');
        lan.innerText = `language: ${ele[i].original_language}`
        
        detailsDiv.append(title,vote_average,lan)
        details_div.append(poster,detailsDiv)
        search_details.append(details_div)
        search_details.style.display='revert'

        details_div.addEventListener('click',()=>{
             getMovie(ele[i].id)
        })
        document.getElementById('search_details').focus();
        // document.querySelector('search-box').value=null
    }
    
}

function debounce(func,delay){
    if(id){
        clearTimeout(id)
    }
    id = setTimeout(()=>{
        func();
    },delay)
}
