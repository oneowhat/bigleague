<template>
  <div>
    <div v-show="!editing" transition="expand">
      <div v-for="campaign in campaigns" v-link="{ name: 'campaign', params: { campaign: campaign.title }}">
        {{campaign.title}}
      </div>
      <div :class="{ 'hidden': campaigns.length > 0 }" class="alert alert-info hidden">
        No campaigns yet, start one!
      </div>
      <button @click="newCampaign" class="btn btn-primary" type="button">Start a new campaign</button>
    </div>
    <div v-show="editing" transition="expand">
      <form @submit.prevent="insert()" class="form-horizontal">
        <campaign-editor 
          :campaign="campaign" 
          :editing="true">
        </campaign-editor>
        <div class="form-group">
          <div class="col-sm-9 col-sm-offset-3">
            <button @click="cancelEdit()" type="button" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';
import CampaignEditor from './CampaignEditor.vue';

export default {
  components: { CampaignEditor },
  data() {
    return {
      campaigns: [],
      editing: false,
      campaign: {
        title: '',
        location: '',
        passphrase: '',
        longshanks: store.user.name,
        coaches: []
      }
    }
  },
  ready() {
    this.fetchCampaigns();
  },
  methods: {
    fetchCampaigns: function() {
      this.$http.get(store.api + '/api/campaigns/' + store.user.name)
        .then((response) => {
          this.campaigns = response.json();
        });
    },
    newCampaign: function() {
      this.editing = true;
    },
    cancelEdit: function() {
      this.editing = false;
    },
    insert: function() {
      this.campaign.coaches.push(store.user.name);
      this.campaign.longshanks = store.user.name;
      var request = this.campaign;
      
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