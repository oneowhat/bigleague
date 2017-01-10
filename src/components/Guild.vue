<template>
  <div>
    <div>
      <h1>{{guild.name}}</h1>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <h4>Captains</h4>
        <div v-for="captain in captains">
          <a href="javascript:;" @click="setPlayer(captain)">{{captain.name}}</a>
        </div>
        <h4>Mascots</h4>
        <div v-for="mascot in mascots">
          <a href="javascript:;" @click="setPlayer(mascot)">{{mascot.name}}</a>
        </div>
        <h4>Players</h4>
        <div v-for="player in players">
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

function playerIsPosition(player, positionId) {
  return player.positionId === positionId;
}

function filterPlayers(players, positionId) {
  return players.filter(function(p) {
    return playerIsPosition(p, positionId);
  });
}

export default {
  components: { Player },
  data() {
    return {
      user: store.user,
      guild: { players: [] },
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
    captains: function() {
      return filterPlayers(this.guild.players, 1);
    },
    mascots: function() {
      return filterPlayers(this.guild.players, 2);
    },
    players: function() {
      return filterPlayers(this.guild.players, 3);
    },
    isUnion: function() {
      return this.guild.name === 'The Union';
    }
  },
  methods: {
    fetchGuild: function() {
      var id = this.$route.params.guild;
      var vm = this;
      this.$http.get(store.api + '/api/guild/' + id)
        .then((response) => {
          vm.guild = response.json();
        }, (response) => {
          console.log(response);
        });
    },
    setPlayer: function(player) {
      this.activePlayer = player;
    }
  }
}
</script>
