<template>
  <div>
    <div class="alert alert-success hidden" :class="{ 'hidden': successMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert"
        aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{successMessage}}
    </div>
    <div class="alert alert-success hidden" :class="{ 'hidden': failMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert"
        aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{failMessage}}
    </div>
    <div class="row">
      <div class="col-sm-5 text-right">
        <label class="control-label">Title</label>
      </div>
      <div class="col-sm-4">{{campaign.title}}</div>
      <div class="col-sm-3">
        <div v-show="!editing">
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
    <form @submit.prevent="update()" v-show="editing">
      <campaign-editor
        :campaign="campaign"
        :cancel-edit="cancelEdit">
      </campaign-editor>
    </form>
    <table class="table">
      <caption>Coaches</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr is="coach" v-for="coach in coaches"
          :coach="coach"
          :editing="false"
          :show-cancel="true"
          :save="updateCoach">
        </tr>
        <tr is="coach"
          :coach="newCoach"
          :editing="true"
          :show-cancel="false"
          :save="addCoach">
        </tr>
      </tbody>
    </table>
    {{campaign|json}}
  </div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import CampaignEditor from './CampaignEditor.vue';
import Coach from './Coach.vue';

export default {
  components: { CampaignEditor, Coach },
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
      editing: false,
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
      this.editing = true;
    },
    cancelEdit: function() {
      this.editing = false;
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
    addCoach: function() {

      var vm = this;
      var coach = bl.clone(this.newCoach);
      coach.campaign_id = this.campaign._id;

      this.$http.post(store.api + '/api/coaches', coach)
        .then((response) => {
          if(response.status === 201) {
            vm.successMessage = "Coach " + coach.name + " added.";
            vm.coaches.push(coach);
            this.newCoach.name = '';
            this.newCoach.email = '';
          } else {
            vm.failMessage = response.message;
          }
        }, (response) => {
          failMessage = store.defaultError;
        });

    },
    updateCoach: {

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
