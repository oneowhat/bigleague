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
        <tr v-for="match in selectedRound">
          <td>{{ match.coach_one.id | coachName }}</td>
          <td>{{ match.coach_two.id | coachName }}</td>
          <td>{{ match | score }}</td>
          <td class="text-right">
            <button class="btn btn-primary"
              :class="{ 'hidden': match.reported_at }"
              :disabled="match.reported_at || !isCurrentRound">Record Match Results</button>
            <button class="btn btn-default"
              :class="{ 'hidden': !match.reported_at }">Change Match Results</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';

export default {
  props: ['campaign', 'coaches', 'currentRound'],
  filters: {
    roundLabel: function(currentRound) {
      return "Round " + (currentRound + 1);
    },
    coachName: function(id) {
      var coach = this.coachById(id);
      return coach ? coach.name : "";
    },
    score: function(match) {
      return match.reported_at
        ? match.coach_one.score + " - " + match.coach_two.score
        : "-------";
    }
  },
  computed: {
    previousEnabled: function() {
      return this.currentRound > 0;
    },
    nextEnabled: function() {
      return this.currentRound < this.campaign.rounds.length;
    },
    selectedRound: function() {
      return this.campaign.rounds[this.currentRound]
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
      return bl.first(this.coaches, function(coach) {
        return coach._id === id;
      });
    }
  }
}

</script>

<style scoped>

</style>
