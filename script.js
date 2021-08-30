const movieContainer = document.querySelector(".movies-container");
const allMovies = document.querySelector(".movies");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnClose = document.querySelector(".modal__close");

const inputSearch = document.querySelector(".input");
const modal = document.querySelector('.modal');

const btnTheme = document.querySelector('.btn-theme');
const containerHtml = document.querySelector('.container');
const subtitle = document.querySelector('.subtitle');

function changeTheme(){
    btnTheme.addEventListener('click', () => {

        if(btnTheme.src.includes("light")){
            btnTheme.src = "./assets/dark-mode.svg"
            containerHtml.style.setProperty('background-color', 'rgba(0, 0, 0, 0.9)' );
            subtitle.style.setProperty('color', '#E5E5E5');
            btnPrev.src = "./assets/seta-esquerda-branca.svg";
            btnNext.src = "./assets/seta-direita-branca.svg";
            
        }else{
            btnTheme.src = "./assets/light-mode.svg"
            containerHtml.style.setProperty('background-color', '#E5E5E5');
            subtitle.style.setProperty('color', '#000');
            btnPrev.src = "./assets/seta-esquerda-preta.svg";
            btnNext.src = "./assets/seta-direita-preta.svg";
        }
    });
}

changeTheme();

let movieData = [];

function populatingMovies(movieData){
   
    const divMovie = document.querySelectorAll('.movie');
    const movieTitle = document.querySelectorAll('.movie__title');
    const movieRating = document.querySelectorAll('.movie__rating');
    
    console.log(divMovie)
      for( let i = 0; i < 5; i++){
           divMovie[i].style.backgroundImage = `url(${movieData[i].poster_path})`;
           movieTitle[i].textContent = movieData[i].title;
           movieRating[i].textContent = movieData[i].vote_average;
           divMovie[i].dataset.id = movieData[i].id;
    }
 
    function openModal(searchId){
        modal.style.display = 'flex';
        fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${searchId.dataset.id}?language=pt-BR`).then(fetchResponse => {
            const jsonResponse = fetchResponse.json();
            
            jsonResponse.then(body => {
                const modalTitle = document.querySelector('.modal__title');
                const imgDoModal = document.querySelector('.modal__img');
                const modalDescription = document.querySelector('.modal__description');
                const voteAverage = document.querySelector('.modal__average');
                const modalGenres = document.querySelector('.modal__genres');

                const {backdrop_path, title, vote_average, overview, genres} = body

                modalTitle.textContent = title;
                imgDoModal.src = backdrop_path;
                modalDescription.textContent = overview;
                voteAverage.textContent = vote_average;
                // modalGenres.textContent = genres.map(item => item.name).join(", ");
               
            });
        });
    }

    divMovie.forEach((imagem, index) => {
        imagem.addEventListener('click', (event) => {

            openModal(event.target);
        });
    });

    btnClose.addEventListener('click', (event) => {
        modal.style.display = 'none'
    })

  }

  function creatingMovies(){
      for(let i = 0; i < 5; i++){

          const divMovie = document.createElement('div');
          divMovie.classList.add('movie');

          divMovie.setAttribute('data', 'id');

          const movieInfo = document.createElement('div');
          movieInfo.classList.add('movie__info');

          const movieTittle = document.createElement('span');
          movieTittle.classList.add('movie__title');

          const movieRatingImg = document.createElement('img');
          movieRatingImg.src = "./assets/estrela.svg";
          
          const movieRating = document.createElement('span');
          movieRating.classList.add('movie__rating');
            
          allMovies.append(divMovie);
          movieInfo.append(movieTittle, movieRating, movieRatingImg);
          divMovie.append(movieInfo);

      } 
  }


fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false").then(fetchResponse => {
    
    const jsonResponse = fetchResponse.json();

    jsonResponse.then(body => {
        
            movieData = body.results;

            creatingMovies();
            populatingMovies(movieData);
            
            btnNext.addEventListener('click', () => {
                const movies = document.querySelectorAll('.movie');
                const titleMovie = movies[4].querySelector('.movie__title').textContent;
                const index = movieData.findIndex(movie => movie.title === titleMovie);

                if(index === movieData.length - 1){
                    movies.forEach((movie, index) => {
                        const img = document.createElement('img');
                        img.setAttribute('src', '../assets/estrela.svg');

                        const title = movie.querySelector('.movie__title');
                        const rating = movie.querySelector('.movie__rating');
                                               
                        movie.style.backgroundImage = `url(${movieData[index].poster_path})`;
                        title.textContent = movieData[index].title;
                        rating.textContent = movieData[index].vote_average;
                        movie.dataset.id = movieData[index].id;
 
                    });
                    
                }else{
                    let increment = 1;
                    movies.forEach(movie => {
                        const img = document.createElement('img');
                        img.setAttribute('src', '../assets/estrela.svg');

                        const title = movie.querySelector('.movie__title');
                        const rating = movie.querySelector('.movie__rating');
                                               
                        movie.style.backgroundImage = `url(${movieData[index + increment].poster_path})`;
                        title.textContent = movieData[index + increment].title;
                        rating.textContent = movieData[index + increment].vote_average;
                        movie.dataset.id = movieData[index + increment].id;
 
                        increment++

                    });
                }

            });

            btnPrev.addEventListener('click', () => {
                const movies = document.querySelectorAll('.movie');
                const tituloFilme = movies[0].querySelector('.movie__title').textContent;
                const index = movieData.findIndex(movie => movie.title === tituloFilme);
                

                if(index === 0){
                    const img = document.createElement('img');
                    img.setAttribute('src', '../assets/estrela.svg');

                    let decrement = 5;
                    movies.forEach(movie => {
                        
                        const title = movie.querySelector('.movie__title');
                        const rating = movie.querySelector('.movie__rating');
                        
                        movie.style.backgroundImage = `url(${movieData[movieData.length - decrement].poster_path})`;
                        title.textContent = movieData[movieData.length - decrement].title;
                        rating.textContent = movieData[movieData.length - decrement].vote_average;
                        movie.dataset.id = movieData[index].id;
                        decrement--

                    });

                    
                }else{
                    let decrement = 5;
                    movies.forEach(movie => {

                        const img = document.createElement('img');
                        img.setAttribute('src', '../assets/estrela.svg');
                        
                        const title = movie.querySelector('.movie__title');
                        const rating = movie.querySelector('.movie__rating');
                        
                        movie.style.backgroundImage = `url(${movieData[index - decrement].poster_path})`;
                        title.textContent = movieData[index - decrement].title;
                        rating.textContent = movieData[index - decrement].vote_average;
                        movie.dataset.id = movieData[index - decrement].id;
                        decrement--

                    });
                }

            }); 
    });
});

function getHighlight(){
    const divHighlight = document.querySelector('.highlight');
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR%27').then(response => {
        
        const jsonResponse = response.json();
        
        jsonResponse.then(body => {
            const videoHighlight = divHighlight.querySelector('.highlight__video');
    
            const titleHighlight = divHighlight.querySelector('.highlight__title');
            const ratingHighlight = divHighlight.querySelector('.highlight__rating');
            const lounchHighlight = divHighlight.querySelector('.highlight__launch');
            const genresHighlight = divHighlight.querySelector('.highlight__genres');
            const descriptionHighlight = divHighlight.querySelector('.highlight__description');
    
            const {backdrop_path, title,vote_average, genres, release_date, overview} = body;

            videoHighlight.style.backgroundImage = `url(${backdrop_path})`;
            titleHighlight.textContent = title;
            ratingHighlight.textContent = vote_average;
            lounchHighlight.textContent = release_date;
            genresHighlight.textContent = genres.map(item => item.name).join(", ");
            descriptionHighlight.textContent = overview;
        });
    });
}

getHighlight();

function getVideoHighlight(){
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(response =>{
        const jsonResponse = response.json();

        jsonResponse.then(body => {
            let urlVideo = body.results[0].key

           const tagLink = document.querySelector('.highlight__video-link');

           tagLink.href = "https://www.youtube.com/watch?v=" + urlVideo
        })
    })
}

getVideoHighlight();

function inputEnter(){

    inputSearch.addEventListener('keydown', (event) => {
        if(event.key !== 'Enter') return;

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${inputSearch.value}`).then(fetchResponse => {
    
        const jsonResponse = fetchResponse.json();

        jsonResponse.then(body => {
                movieData = []
                movieData = body.results;
                console.log(movieData);

                populatingMovies(movieData);

            });
        });
       
    });
}
    
inputEnter();

