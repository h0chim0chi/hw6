// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=ad954a96a4790dd1aa181b4d7fd71bbb&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault()
  let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ad954a96a4790dd1aa181b4d7fd71bbb&language=en-US`)
  console.log(response)

  let json = await response.json()
  let movielist = json.results
  console.log(movielist)
  
  let ds = firebase.firestore()
  let watchedlist = await ds.collection('watched').get()
  let watchedmovies = watchedlist.docs

    for (let i=0; i<movies.length; i++) {
      let movie = movies[i]
      let movieId = movie.id
      let dsMovie = await ds.collection('watched').doc(`${movieId}`).get()
      let dsData = dsMovie.data()
      console.log(dsData)
      let moviePoster = movie.poster_path
      let movieDomElement = document.querySelector(`.movies`)
      movieDomElement.insertAdjacentHTML(`beforeend`, `
      <div class="movie-${movieId} w-1/5 p-4">
        <img src="https://image.tmdb.org/t/p/w500${moviePoster}" class="w-full">
        <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">Watched</a>
      </div>
      `)

      if(dsData){
          let movieclicked = document.querySelector(`.movie-${movieId}`)
          movieclicked.classList.add('opacity-20')
      }  

  let watchedbutton = document.querySelector(`.movie-${movieId}`)
  console.log(watchedbutton)
    
  watchedbutton.addEventListener(`click`, async function(event){
      event.preventDefault()
      let movieclicked = document.querySelector(`.movie-${movieId}`)
      movieclicked.classList.add('opacity-20')
      await ds.collection(`watched`).doc(`${movieId}`).set({})
    })



  
 //       let reference = await datastore.collection('watched').doc(`${movie}`).get()
 //       let movie_select = reference.data()
      
 //       if(movie_select){
 //         let watchedmovie = document.querySelector(`.movie-${movie}`)
 //         watchedmovie.classList.add('opacity-20')
      }
 //         let watchedindicator = document.querySelector(`.movie-${movie}`)
 //         console.log(watchedindicator)
          
 //         watchedindicator.addEventListener(`click`, async function(event){
  //        event.preventDefault()
          
  //        let watchedmovie = document.querySelector(`.movie-${movie}`)
   //       watchedmovie.classList.add('opacity-20')
    //      await datastore.collection(`watched`).doc(`${movie}`).set({})
        
  //      })
    //  }
    
  // })