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
      <div class="col-sm-7">{{campaign.passPhrase}}</div>
    </div>
    <ul class="nav nav-tabs">
      <li @click="setTab('coaches')" :class="{ 'active': activeTab === 'coaches' }">
        <a href="javascript:;">Coaches</a>
      </li>
      <li @click="setTab('schedule')" v-show="initialized" :class="{ 'active': activeTab === 'schedule' }">
        <a href="javascript:;">Schedule</a>
      </li>
    </ul>
    <coaches v-show="activeTab === 'coaches'" :campaign="campaign"></coaches>
    <div v-show="activeTab === 'schedule'">
      <br>
      <schedule-list
        :campaign="campaign"
        :current-round="campaign.round"
        :finalize="finalizeRound">
      </schedule-list>
    </div>

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
import ScheduleList from './ScheduleList.vue';

export default {
  components: {
    CampaignEditor,
    Coaches,
    ScheduleList
  },
  data() {
    return {
      user: store.user,
      campaign: {
        round: 0,
        rounds: [{ matches: [] }],
        coaches: []
      },
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
  mounted() {
    this.fetchCampaign();
  },
  computed: {
    initialized: function() {
      return this.campaign.rounds.length > 0;
    },
    enableSchedule: function() {
      return !this.initialized && this.campaign.coaches.length >= 8;
    }
  },
  methods: {
    fetchCampaign: function() {
      var campaignName = this.$route.params.campaign;
      var vm = this;
      this.$http.get(store.api + '/api/campaign/' + campaignName)
        .then((response) => {
          this.campaign = response.json();
        });
    },
    edit: function() {
      $('#modalCampaign').modal('show');
    },
    cancelEdit: function() {
      $('#modalCampaign').modal('hide');
    },
    save: function(callback) {
      var vm = this;
      this.$http.put(store.api + '/api/campaigns', this.campaign)
        .then((response) => {
          if(response.status === 200) {
            vm.successMessage = "Campaign updated."
            vm.editing = false;
            $('#modalCampaign').modal('hide');
            if(callback) callback();
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });
    },
    addSchedule: function() {
      var vm = this;
      this.$http.post(store.api + '/api/schedule', { campaign: this.campaign.id })
        .then((response) => {
          if(response.status === 201) {
            vm.fetchCampaign();
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
    },
    finalizeRound: function(callback) {
      this.campaign.round++;
      this.save(callback);
    }
  }
};

</script>

<style scoped>

</style>
