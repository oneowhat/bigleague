<template>
  <div>
    <div v-show="!editing">
      <div v-for="campaign in campaigns" v-link="{ name: 'campaign', params: { campaign: campaign.id }}">
        {{campaign.title}}
      </div>
      <div :class="{ 'hidden': campaigns.length > 0 }" class="alert alert-info hidden">
        No campaigns yet, start one!
      </div>
      <button @click="newCampaign" class="btn btn-primary" type="button">Start a new campaign</button>
    </div>
    <div v-show="editing">
      <form @submit.prevent="insert()" class="form-horizontal">
        <div class="form-group">
          <label for="title" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-9">
            <input v-model="campaign.title" type="text" placeholder="Title" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label for="location" class="col-sm-2 control-label">Location</label>
          <div class="col-sm-9">
            <input v-model="campaign.location" type="text" placeholder="Location" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label for="joinCode" class="col-sm-2 control-label">Join code</label>
          <div class="col-sm-9">
            <input v-model="campaign.joinCode" type="text" placeholder="Join code" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-9 col-sm-offset-2">
            <button @click="cancelEdit()" type="button" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
    {{campaigns | json}}
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
        joinCode: '',
        longshanks: '',
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