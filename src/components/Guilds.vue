<template>
  <div>
    <div v-for="guild in activeGuilds" v-link="{ name: 'guild', params: { guild: guild.name }}">
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
      guilds: store.guilds
    }
  },
  computed: {
    activeGuilds: function() {
      return this.guilds.filter(function(guild) {
        return guild.active;
      });
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.guild {
  
}

</style>