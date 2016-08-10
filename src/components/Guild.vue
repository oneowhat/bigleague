<template>
  <div>
    {{guild.name}}
  </div>
  <div v-for="model in models">
    {{model|json}}
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      guild: {},
      models: []
    }
  },
  ready() {
    this.fetchGuild();
  },
  methods: {
    fetchGuild: function() {
      this.$http.get(store.api + '/api/guilds/' + this.$route.params.guild)
        .then((response) => {
          var data = response.json();
          this.guild = data.guild;
          this.models = data.models;
        });
    }
  }
}
</script>