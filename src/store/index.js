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
    device: "http://192.168.1.5:52323/dmr.xml"
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
          "device": state.device,
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
        const response = await axios.post(`http://${window.location.host.split(':')[0]}:5000/playPause`,
        {
          "device": state.device,
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
