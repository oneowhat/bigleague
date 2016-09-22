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
              :class="{ 'hidden': match.reportedAt }"
              :disabled="match.reportedAt || !isCurrentRound">Record Match Results</button>
            <button @click="editMatch(match)" class="btn btn-default"
              :class="{ 'hidden': !match.reportedAt }">Change Match Results</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <div class="text-center">
      <button @click="confirmFinalizeRound" type="button" class="btn btn-primary"
        :disabled="!finalizeEnabled" :class="{ 'hidden': currentRound === campaign.rounds.length - 1 }">
        Finalize Round</button>
      <button @click="confirmFinalize" type="button" class="btn btn-primary"
        :disabled="!finalizeEnabled" :class="{ 'hidden': currentRound !== campaign.rounds.length - 1 }">
        Finalize Campaign</button>
    </div>
    <match-editor :match.sync="match" :coaches="campaign.coaches"></match-editor>
    <confirm-dialog :model="confirmModel"></confirm-dialog>
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import ConfirmDialog from './ConfirmDialog.vue'
import MatchEditor from './MatchEditor.vue'

export default {
  components: { MatchEditor, ConfirmDialog },
  data() {
    return {
      match: {},
      confirmModel: {
        message: "",
        confirm: function() { }
      }
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
    },
    matchButtonLabel: function(match) {
      return match.reportedAt ? "Change" : "Record";
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
    },
    finalizeEnabled: function() {
      var allReported = true;
      this.selectedRound.matches.forEach(function(match) {
        if (!match.reportedAt) {
          allReported = false;
        }
      });
      return this.isCurrentRound && allReported;
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
    },
    confirmFinalizeRound: function() {
      this.confirmModel.message = "Once the round is finalized you can no longer edit match data, are you sure you want to proceed?";
      this.confirmModel.confirm = this.finalizeRound;
      $('#modalConfirm').modal('show');
    },
    finalizeRound: function() {
      this.$dispatch('finalizeRound');
      $("#modalConfirm").modal('hide');
    },
    confirmFinalize: function() {
      this.confirmModel.message = "Once the campaign is finalized you will no longer be able to edit any data, are you sure you want to proceed?";
      this.confirmModel.confirm = this.finalizeCampaign;
      $('#modalConfirm').modal('show');
    },
    finalizeCampaign: function() {

    }
  }
}

</script>

<style scoped>

</style>
