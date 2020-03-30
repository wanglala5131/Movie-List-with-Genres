(function () {
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const ALL_URL = 'api/v1/movies'
  const SINGLE_URL = 'api/v1/' //+id
  const IMG_URL = 'posters/'   //加電影名
  const movieList = document.querySelector('#movie-list')
  const movieCards = document.querySelector('#movie-cards')
  const data = []
  let currentIndex

  //nav-pill
  for (let type in genres) {
    let li = document.createElement('li')
    let songListHtmlContent =
      `<a class="nav-link" data-toggle="pill" data-index="${type}" href="#">${genres[type]}</a>`
    li.innerHTML = songListHtmlContent
    movieList.append(li)
  }

  //get API data
  axios
    .get(BASE_URL + ALL_URL)
    .then(response => {
      data.push(...response.data.results)

      //讓一開始為第一頁Action
      let currentData = data.filter(item => item.genres.includes(1))
      displayMovieData(currentData)
      currentIndex = 1 //把index存起來，用在showActive上
      showActive()
    })
    .catch(err => {
      console.log(err)
    })


  //////---event listen---//////////

  //用filter篩選
  movieList.addEventListener('click', event => {
    let index = Number(event.target.dataset.index)
    let currentData = data.filter(item => item.genres.includes(index))
    if (currentData.length === 0) {
      movieCards.innerHTML = `<p>NO DATA</p>`
    } else {
      displayMovieData(currentData)
    }
    currentIndex = index //把index存起來，用在showActive上
    showActive()
  })





  ///////////--function--//////////////
  function displayMovieData(data) {
    let htmlContent = ''
    data.forEach(item => {
      htmlContent += `
          <div class="card" style="width: 14rem;">
            <img class="card-img-top" src="${BASE_URL}posters/${item.image}" alt="Card image cap">
            <div class="card-body" data-id="${item.id}">
              <h5>${item.title}</h5>`

      //另外加上genres的標籤，並把數字轉成文字，再放入htmlContent中
      let genresHTML = ''
      for (let type in genres) {
        for (let singleMovieType of item.genres) {
          if (Number(type) === singleMovieType)
            genresHTML += `<span class="single-genres">${genres[type]}</span>`
        }
      }
      htmlContent += genresHTML
      //最後加上所需的</div>
      htmlContent += `</div>
          </div>`

      movieCards.innerHTML = htmlContent
    })
  }
  //如果為當前頁，就增加active的class
  function showActive() {
    for (let activeItem of movieList.children) {
      if (currentIndex === Number(activeItem.children[0].dataset.index)) {
        activeItem.classList.add('active')
      } else {
        activeItem.classList.remove('active')
      }
    }
  }
})()