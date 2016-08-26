<template>
  <div>
    <div class="alert alert-success hidden" :class="{ 'hidden': successMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
      {{successMessage}}
    </div>
    <div class="alert alert-danger hidden" :class="{ 'hidden': failMessage.length === 0 }">
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
    <ul class="nav nav-tabs">
      <li @click="setTab('coaches')" :class="{ 'active': activeTab === 'coaches' }">
        <a href="javascript:;">Coaches</a>
      </li>
      <li @click="setTab('matches')" v-show="initialized" :class="{ 'active': activeTab === 'matches' }">
        <a href="javascript:;">This Weeks Matches</a>
      </li>
      <li @click="setTab('history')" v-show="initialized" :class="{ 'active': activeTab === 'history' }">
        <a href="javascript:;">Match History</a>
      </li>
    </ul>
    <coaches
      v-show="activeTab === 'coaches'"
      :coaches="coaches"
      :campaign="campaign">
    </coaches>

    <div v-show="!initialized" class="row">
      <div class="col-sm-12 text-center">
        <button @click="addSchedule()" type="button" class="btn btn-primary"
          :disabled="!enableSchedule">Create League Schedule</button>
      </div>
    </div>

    <campaign-editor
      :campaign="campaign"
      :cancel-edit="cancelEdit"
      :message="failMessage"
      :save="save">
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
      campaign: {
        rounds: []
      },
      coaches: [],
      newCoach: {
        name: '',
        email: '',
        confirmed: false,
        user_id: ''
      },
      successMessage: '',
      failMessage: '',
      activeTab: 'coaches'
    }
  },
  ready() {
    this.fetchCampaign();
  },
  computed: {
    initialized: function() {
      return this.campaign.rounds.length > 0;
    },
    enableSchedule: function() {
      return !this.initialized && this.coaches.length >= 8;
    }
  },
  methods: {
    fetchCampaign: function() {
      var campaignName = this.$route.params.campaign;
      var vm = this;
      this.$http.get(store.api + '/api/campaign/' + campaignName)
        .then((response) => {
          this.campaign = response.json().campaign;
          this.fetchCoaches();
        });
    },
    fetchCoaches: function() {
      var vm = this;
      this.$http.get(store.api + '/api/coaches/' + this.campaign._id)
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
    save: function() {
      var vm = this;
      this.$http.put(store.api + '/api/campaigns', this.campaign)
        .then((response) => {
          if(response.status === 200) {
            vm.successMessage = "Campaign updated."
            vm.editing = false;
            $('#modalCampaign').modal('hide');
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });
    },
    addSchedule: function() {
      var vm = this;
      this.$http.post(store.api + '/api/schedule', { campaign: this.campaign._id })
        .then((response) => {
          if(response.status === 201) {
            vm.campaign.rounds = response.json();
            vm.successMessage = "Schedule created."
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });
    },
    dismissMessages: function() {
      this.successMessage = '';
      this.failMessage = '';
    },
    setTab: function(tab) {
      this.activeTab = tab;
    }
  }
};

</script>

<style scoped>

</style>
