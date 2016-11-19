<template>
<div>

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
      match: {}
    }
  },
  mounted() {
    this.fetchCampaign();
  },
  methods: {
    fetchCampaign: function() {
      var vm = this;
      var match;
      var id = this.$route.params.match;
      data.campaign.byTitle(this.$route.params.campaign, (response) => {
          vm.campaign = response.json();
          match = bl.first(vm.campaign.matches, function(match) {
            return match.id === id;
          });
          if(match) {
            vm.match = match;
          } else {
            store.currentMessage = "Match '" + id + "' cannot be found";
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
