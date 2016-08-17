<template>
  <div>
    {{campaign.title}}
  </div>
</template>

<script>
import {store} from '../store.js';
  
export default {
  data() {
    return {
      user: store.user,
      campaign: {
        title: ''
      },
      
    }
  },
  ready() {
    this.fetch();
  },
  methods: {
    fetch: function() {
      this.$http.get(store.api + '/api/campaign/' + this.$route.params.campaign)
        .then((response) => {
          var data = response.json();
          this.campaign = data.campaign;
        });
    }
  }
};

</script>

<style scoped>
  
</style>