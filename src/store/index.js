import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  created() {},

  
  destroyed() {},

  state: {
    movies: null,
    play: null,
  },

  getters: {
    movies: (state) => state.movies,
    play: (state) => state.play
  },

  mutations: {
    movies: (state, movies) => (state.movies = movies),
    play: (state, play) => (state.movies = play),
  },
  
  actions: {
    async getMovies({commit, state}){
      try {
        const response = await axios.get(`http://${window.location.host.split(':')[0]}:5000/`);
        commit("movies", response.data)
      }catch(err){
        console.log(err)
      }
    },
    async playMovie({commit, state}, movie){
      try {
        console.log(movie.files[0].url)
        const response = await axios.post(`http://${window.location.host.split(':')[0]}:5000/play`,
        {
          "title": movie.title,
          "device": "http://192.168.1.65:52323/dmr.xml",
          "file_path": movie.files[0].file,
          "videoUrl":movie.files[0].url
        }
        );
        //commit("play", response.data)
      }catch(err){
        console.log(err)
      }
    },
    async playPause({commit, state}){
      try {
        //console.log(movie.files[0].url)
        const response = await axios.post(`http://${window.location.host.split(':')[0]}:5000/playPause`,
        {
          "device": "http://192.168.1.65:52323/dmr.xml",
        }
        );
        //commit("play", response.data)
      }catch(err){
        console.log(err)
      }
    },
  },
  modules: {},
  plugins: [],
})
