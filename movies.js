// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  let db = firebase.firestore()
  
    let response = await fetch (`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`) 
    let json = await response.json()
    let Movies = json.results 
    console.log(Movies)
  
    for (let i=0; i<movies.length; i++) {
      let MovieName = Movies[i].id
      let poster = movies[i].poster_path
    
    
  
  
      document.querySelector('.movies').insertAdjacentHTML('beforeend',` 
       <div class="w-1/5 p-4 movie-${MovieName}">
        <img src="https://image.tmdb.org/t/p/w500/${poster}" class="w-full">
        <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
       </div>
          `)
  
          let docRef = await db.collection('watched').doc(`${MovieName}`).get()
          let movie_select = docRef.data()
      
          if(movie_select){
            let watchedmovie = document.querySelector(`.movie-${MovieName}`)
            watchedmovie.classList.add('opacity-20')
        }
           let watchedindicator = document.querySelector(`.movie-${MovieName}`)
          console.log(watchedindicator)
          watchedindicator.addEventListener(`click`, async function(event){
          event.preventDefault()
          let watchedmovie = document.querySelector(`.movie-${MovieName}`)
          watchedmovie.classList.add('opacity-20')
          await db.collection(`watched`).doc(`${MovieName}`).set({})
        
        })
      }
    
   })