<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>
        </tr>
      </thead>
    </table>
    <div v-for="guild in guilds">
      {{guild.name}}
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      name: '',
      guilds: []
    }
  },
  ready() {
    this.fetchGuilds();
  },
  methods: {
    fetchGuilds: function() {
      this.$http.get(store.api + '/api/guilds')
        .then((response) => {
          this.guilds = response.json();
        });
    },
    insert: function() {
      var request = { name: this.name };
      var fetch = this.fetchGuilds;
      this.$http.post(store.api + '/api/guilds', request)
        .then((response) => {
          if (response.status === 201) {
            this.guilds.push(request);
          }
        });
    }
  }
}
</script>