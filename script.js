const peliculasContainer = document.querySelector('main.peliculas');
const searchInput = document.querySelector('.buscarInput');
let generos = [];
const renderPeliculas = peliculas => {
       peliculasContainer.innerHTML = '';
       const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
       peliculas.forEach(pelicula => {
              const imagen = pelicula.poster_path ? `
           <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : ''
              peliculasContainer.innerHTML += `
           <div class="pelicula">
               <h3 class="title">${pelicula.title}
           </h3>
           ${imagen}
       </div>`
       })
}


document.querySelector('.buscarInput').addEventListener('keyup', event => {
              if (event.key === 'Enter') {
                     axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + event.target.value)
                            .then(res => {
                                   const peliculas = res.data.results;
                                   renderPeliculas(peliculas)
                            })
              }
       })

const getMoviesType =(type) =>{

              axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-EN`)
                     .then(res => {
                            const peliculas = res.data.results;
                            renderPeliculas(peliculas)
                     })

}
getMoviesType('popular')
function renderGenres() {
       axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a')
       .then(res=>{
              const genresArray=res.data.genres;
              const basicMenu=` <li class="nav-ite">
              <a class="nav-link" href="#">home</a>
       </li>
       <li class="nav-ite " id="newsButton" onclick="getMoviesType('upcoming')">
              <a class="nav-link" href="#">news</a>
       </li>
       ` 
       document.getElementById('menuGenres').innerHTML=basicMenu
              genresArray.forEach(genre=>{

                     document.getElementById('menuGenres').innerHTML+=` <li class="nav-ite">
                     <a class="nav-link" href="#">${genre.name}</a>
              </li>`
              })
       })
}
renderGenres();




 axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
       .then(res => {
              const genders = res.data.genres;
              generos.forEach(genero => {
                     document.querySelector('.navbar-nav ml-auto').innerHTML += ` <a class="dropdown-item" href="#" id=${genero.id} 
                  onclick="getMoviesByGenre(event, ${genero.id})">${genero.name}</a>`;
              })
       })
       .catch(error => console.error(error))
searchInput.addEventListener("input", function (event) {
       if ('' == this.value) {
              document.querySelector('.divMovies').innerHTML = '';
       }
})
document.querySelector('.imgNav').addEventListener('keyup', event =>{
      if('keyup'=== getMoviesType('popular'));
})