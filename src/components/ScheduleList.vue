<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <button @click="previousRound()" :disabled="!previousEnabled" class="btn btn-default">< Previous Round</button>
      </div>
      <div class="col-sm-4 text-center">
        {{currentRound | roundLabel}}
      </div>
      <div class="col-sm-4 text-right">
        <button @click="nextRound()" :disabled="!nextEnabled" class="btn btn-default">Next Round ></button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Home</th>
          <th>Away</th>
          <th>Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in selectedRound.matches">
          <td>{{ match.homeCoachId | coachName }}</td>
          <td>{{ match.awayCoachId | coachName }}</td>
          <td>{{ match | score }}</td>
          <td class="text-right">
            <button @click="editMatch(match)" class="btn btn-primary"
              :class="{ 'hidden': match.reported_at }"
              :disabled="match.reported_at || !isCurrentRound">Record Match Results</button>
            <button @click="editMatch(match)" class="btn btn-default"
              :class="{ 'hidden': !match.reported_at }">Change Match Results</button>
          </td>
        </tr>
      </tbody>
    </table>
    <match-editor :match.sync="match" :coaches="campaign.coaches"></match>
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import MatchEditor from './MatchEditor.vue'

export default {
  components: { MatchEditor },
  data() {
    return {
      match: {}
    }
  },
  props: ['campaign', 'currentRound'],
  filters: {
    roundLabel: function(currentRound) {
      return "Round " + (currentRound + 1);
    },
    coachName: function(id) {
      var coach = this.coachById(id);
      return coach ? coach.name : "";
    },
    score: function(match) {
      return match.reportedAt
        ? match.homeScore + " - " + match.awayScore
        : "-------";
    }
  },
  computed: {
    previousEnabled: function() {
      return this.currentRound > 0;
    },
    nextEnabled: function() {
      return this.currentRound < this.campaign.rounds.length - 1;
    },
    selectedRound: function() {
      var round = this.campaign.rounds[this.currentRound];
      if(!round)
        round = { matches: [] };

      return round;
    },
    isCurrentRound: function() {
      return this.currentRound === this.campaign.round;
    }
  },
  methods: {
    previousRound: function() {
      this.currentRound--;
    },
    nextRound: function() {
      this.currentRound++;
    },
    coachById: function(id) {
      return bl.first(this.campaign.coaches, function(coach) {
        return coach.id === id;
      });
    },
    editMatch: function(match) {
      this.match = match;
      $('#modalMatch').modal('show');
    }
  }
}

</script>

<style scoped>

</style>
