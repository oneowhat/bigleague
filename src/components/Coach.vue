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
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import data from '../data.js';

export default {
  data() {
    return {
      campaign: {},
      coach: {}
    }
  },
  mounted() {
    this.fetchCampaign();
  },
  methods: {
    fetchCampaign: function() {
      var vm = this;
      var coach;
      var coachName = this.$route.params.coach;
      data.campaign.byTitle(this.$route.params.campaign, (response) => {
          vm.campaign = response.json();
          coach = bl.first(vm.campaign.coaches, function(coach) {
            return coach.name === coachName;
          });
          if(coach) {
            vm.coach = coach;
          } else {
            store.currentMessage = "Coach '" + coachName + "' cannot be found";
            vm.$router.push('/404');
          }
        }, (response) => {
          store.currentMessage = "Campaign '" + title + "' cannot be found";
          vm.$router.push('/404');
        });
    }
  }
}

</script>

<style scoped>

</style>
