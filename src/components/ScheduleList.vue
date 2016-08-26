<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <button @click="previousRound()" :disabled="!previousEnabled" class="btn btn-default">< Previous Round</button>
      </div>
      <div class="col-sm-4 text-center">
        {{roundNumber | roundLabel}}
      </div>
      <div class="col-sm-4 text-right">
        <button @click="nextRound()" :disabled="!nextEnabled" class="btn btn-default">Next Round ></button>
      </div>
    </div>
    {{}}
  </div>
</template>

<script>


export default {
  props: ['campaign', 'coaches', 'roundNumber'],
  filters: {
    roundLabel: function(roundNumber) {
      return "Round " + (roundNumber + 1);
    }
  },
  computed: {
    previousEnabled: function() {
      return this.roundNumber > 0;
    },
    nextEnabled: function() {
      return this.roundNumber < this.campaign.rounds.length;
    }
  },
  methods: {
    previousRound: function() {
      this.roundNumber--;
    },
    nextRound: function() {
      this.roundNumber++;
    }
  }
}

</script>

<style scoped>

</style>
