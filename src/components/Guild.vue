<template>
  <div>
    <div>
      <h1>{{guild.name}}</h1>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <h4>Captains</h4>
        <div v-for="captain in guild.captains">
          <a href="javascript:;" @click="setPlayer(captain)">{{captain.name}}</a>
        </div>
        <h4>Mascots</h4>
        <div v-for="mascot in guild.mascots">
          <a href="javascript:;" @click="setPlayer(mascot)">{{mascot.name}}</a>
        </div>
        <h4>Players</h4>
        <div v-for="player in guild.players">
          <a href="javascript:;" @click="setPlayer(player)">{{player.name}}</a>
        </div>
        <h4 v-if="!isUnion">Union Players</h4>
        <div v-if="!isUnion" v-for="player in union">
          <a href="javascript:;" @click="setPlayer(player)">{{player.name}}</a>
        </div>
      </div>
      <div class="col-sm-8">
        <player :player="activePlayer"></player>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';
import Player from './Player.vue';

export default {
  components: { Player },
  data() {
    return {
      user: store.user,
      guild: {},
      union: [],
      activePlayer: {
        name: ''
      }
    }
  },
  mounted() {
    this.fetchGuild();
  },
  computed: {
    isUnion: function() {
      return this.guild.name === 'The Union';
    }
  },
  methods: {
    fetchGuild: function() {
      var guildName = this.$route.params.guild;
      var vm = this;
      store.guilds.forEach(function(item) {
        if(item.name == guildName) {
          vm.guild = item;
        }
        if(item.name === 'The Union') {
          vm.union = item.players.filter(function(player) {
            return player.selective.indexOf(guildName) > -1;
          });
        }
      });
    },
    setPlayer: function(player) {
      this.activePlayer = player;
    }
  }
}
</script>
