<template>
  <div>
    <div v-show="!editing">
      <div v-for="campaign in campaigns" v-link="{ name: 'campaign', params: { campaign: campaign.id }}">
        {{campaign.name}}
      </div>
      <div v-if="campaigns.length === 0" class="alert alert-info">
        No campaigns yet, start one!
      </div>
      <button @click="newCampaign" class="btn btn-primary" type="button">Start a new campaign</button>
    </div>
    <div v-show="editing">
      
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      campaigns: [],
      editing: false,
      campaign: {
        title: '',
        location: '',
        users: []
      }
    }
  },
  ready() {
    this.fetchCampaigns();
  },
  methods: {
    fetchCampaigns: function() {
      this.$http.get(store.api + '/api/campaigns')
        .then((response) => {
          this.campaigns = response.json();
        });
    },
    newCampaign: function() {
      this.editing = true;
    },
    insert: function() {
      var request = { name: this.name };
      var fetch = this.fetchCampaigns;
      this.$http.post(store.api + '/api/campaigns', request)
        .then((response) => {
          if (response.status === 201) {
            this.campaigns.push(request);
          }
        });
    }
  }
}
</script>