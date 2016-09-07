<template>
  <div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Name</label>
      </div>
      <div class="col-sm-7">{{coach.name}}</div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Guild</label>
      </div>
      <div class="col-sm-7">{{coach.guild}}</div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">League Points</label>
      </div>
      <div class="col-sm-7">{{coach.leaguePoints}}</div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Campaign Points</label>
      </div>
      <div class="col-sm-7">{{coach.campaignPoints}}</div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Favours</label>
      </div>
      <div class="col-sm-7">{{coach.favours}}</div>
    </div>

    {{coach|json}}
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';

export default {
  data() {
    return {
      coach: {}
    }
  },
  route: {
    data: function(transition) {
      return this.$http.get(store.api + '/api/coach/' + transition.to.params.coach)
        .then((response) => {
          return { coach: response.json() };
        });
    }
  }
}

</script>

<style scoped>

</style>
