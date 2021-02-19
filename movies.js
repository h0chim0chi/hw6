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
    let datastore = firebase.firestore()
    let response = await fetch (`https://api.themoviedb.org/3/movie/now_playing?api_key=ad954a96a4790dd1aa181b4d7fd71bbb&language=en-US`) 
    let json = await response.json()
    let movies = json.results 
    console.log(Movies)
  
    for (let i=0; i<movies.length; i++) {
      let movie = movies[i]
      let reference = await datastore.collection('watched').doc('${movie.id}').get()
      let watchedmovie = reference.data()
      let poster = movies[i].poster_path
      if (watchedmovie) {
        opacityfeature = 'opacity-20'
      }
  
document.querySelector('.movies').insertAdjacentHTML('beforeend',` 
  <div class="w-1/5 p-4 movie-${movies.id} ${opacityfeature}">
  <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-full">
  <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
    </div>
      `)

document.querySelector(`.movie-${movie.id}`).addEventListener('click', async function(event) {
  event.preventDefault()
  let watchedindicator = document.querySelector(`.movie-${movie.id}`)
  watchedindicator.classList.add('opacity-20')
  await datastore.collection('watched').doc(`${movie.id}`).set({})
      }) 
    }
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