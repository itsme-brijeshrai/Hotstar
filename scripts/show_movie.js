let datas = JSON.parse(localStorage.getItem('data'))

let movie_container = document.querySelector('#movie_container')
let banner = document.createElement('img')
banner.src=`https://image.tmdb.org/t/p/w500${datas.backdrop_path}`

let title = document.createElement('h1')
title.className='original_title'
title.innerText=datas.original_title

let movie_detail = document.createElement('div')
movie_detail.className='movie_detail'
let genre = document.createElement('p')
genre.className='genre'
genre.innerText = datas.genres[0].name

let english_name = document.createElement('p')
english_name.className='english_name'
english_name.innerText = ` ${datas.spoken_languages[0].english_name} `

let release_date = document.createElement('p')
release_date.innerText = ` ${datas.release_date.split('-')[0]}`

let det = document.createElement('p')
det.className='det'
det.innerText=datas.overview

let movie_btn = document.createElement('div')
movie_btn.className='movie_btn'
let movie_wish = document.createElement('button')
movie_wish.innerHTML='<i class="fa-solid fa-plus"></i><br>WATCHLIST'
movie_wish.className = "movie_wish"
let movie_share = document.createElement('button')
movie_share.className='movie_share'
movie_share.innerHTML=' <i class="fa-solid fa-share-nodes"></i><br>SHARE'



movie_btn.append(movie_wish,movie_share)

movie_detail.append(genre,english_name,release_date)
movie_container.append(banner,title,movie_detail,det,movie_btn)