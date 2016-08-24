<template>
  <div>
    <div class="alert alert-success hidden" :class="{ 'hidden': successMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
      {{successMessage}}
    </div>
    <div class="alert alert-success hidden" :class="{ 'hidden': failMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
      {{failMessage}}
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Title</label>
      </div>
      <div class="col-sm-4">{{campaign.title}}</div>
      <div class="col-sm-3">
        <div>
          <button @click="edit()" type="button" class="btn btn-default">Edit</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Location</label>
      </div>
      <div class="col-sm-7">{{campaign.location}}</div>
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Coach pass phrase</label>
      </div>
      <div class="col-sm-7">{{campaign.passphrase}}</div>
    </div>
    <hr>
    <coaches :coaches="coaches" : campaign-id="campaign._id"></coaches>
    <campaign-editor
      :campaign="campaign"
      :cancel-edit="cancelEdit"
      :message="failMessage">
    </campaign-editor>
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import CampaignEditor from './CampaignEditor.vue';
import Coaches from './Coaches.vue';

export default {
  components: {
    CampaignEditor,
    Coaches
  },
  data() {
    return {
      user: store.user,
      campaign: {},
      coaches: [],
      newCoach: {
        name: '',
        email: '',
        confirmed: false,
        user_id: {}
      },
      successMessage: '',
      failMessage: ''
    }
  },
  ready() {
    this.fetchCampaign();
    this.fetchCoaches();
  },
  methods: {
    fetchCampaign: function() {
      var campaignName = this.$route.params.campaign;
      var vm = this;
      this.$http.get(store.api + '/api/campaign/' + campaignName)
        .then((response) => {
          this.campaign = response.json().campaign;
        });
    },
    fetchCoaches: function() {
      var campaignName = this.$route.params.campaign;
      var vm = this;
      this.$http.get(store.api + '/api/coaches/' + campaignName)
        .then((response) => {
          this.coaches = response.json();
        });
    },
    edit: function() {
      $('#modalCampaign').modal('show');
    },
    cancelEdit: function() {
      $('#modalCampaign').modal('hide');
    },
    update: function() {
      var vm = this;
      this.$http.put(store.api + '/api/campaigns', this.campaign)
        .then((response) => {
          if(response.status === 200) {
            vm.successMessage = "Campaign updated."
            vm.editing = false;
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });
    },
    dismissMessages: function() {
      this.successMessage = '';
      this.failMessage = '';
    }
  }
};

</script>

<style scoped>

</style>
