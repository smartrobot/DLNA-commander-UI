<template>
  <v-container>
    <v-row>
      <v-lazy v-model="isActive" :options="{
        threshold: .10
      }" min-height="200" transition="fade-transition" class="mx-auto pm-6 pa-6" v-for="movie in movies"
        :key="movie.id">
        <v-card max-width="300">
          <v-img class="white--text align-end" height="400px" v-bind:src=movie.thumbUrl></v-img>
          <v-card-subtitle>{{ movie.title }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="orange" text v-on:click=playMovie(movie)>
              Play
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-lazy>
    </v-row>

    <v-row class="pm-6 pa-10">
      <v-footer v-bind="localAttrs" :padless="padless">
        <v-card flat tile width="100%" class="blue lighten-1 text-center">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon v-on:click=playPause()>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'Home',
  components: {
    VueSlider
  },
  data() {
    return {
      isActive: false,
      
      //Holder values for vue slider
      value1: 0,
      formatter1: '{value}%',

      icons: [
        'mdi-play'
      ],
      items: ['fixed'],
      padless: false,
      variant: 'default',
    };
  },

  methods: {
    ...mapActions(["getMovies", "playMovie", 'playPause'])
  },

  computed: {
    localAttrs() {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = true
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
    ...mapGetters(["movies"]),
  },
  created() {

    function connect() {
      return new Promise(function (resolve, reject) {
        var server = new WebSocket(`ws://${window.location.host.split(':')[0]}:5000/ws`);
        server.onopen = function () {
          resolve(server);
        };

        server.onerror = function (err) {
          reject(err);
        };
      });
    }

    connect()
      .then(function (server) {
        console.log("WebSocket Client Connected!");
        server.onmessage = (message) => {
          data = message.data;
          console.log(data)
        };
      })

      .catch(function (err) {
        // error here
        console.log(err);
      });

    this.getMovies();

  },

}
</script>
