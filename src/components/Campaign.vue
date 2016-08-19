<template>
  <div>
    <div class="alert alert-success hidden" :class="{ 'hidden': successMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{successMessage}}
    </div> 
    <div class="alert alert-success hidden" :class="{ 'hidden': failMessage.length === 0 }">
      <button v-on:click="dismissMessages" type="button" class="close close-alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      {{failMessage}}
    </div> 
    <form @submit.prevent="update()" class="form-horizontal">
      <campaign-editor 
        :campaign="campaign" 
        :editing.sync="editing">
      </campaign-editor>
      <div class="form-group">
        <div v-show="editing" class="col-sm-9 col-sm-offset-3">
          <button @click="cancelEdit()" type="button" class="btn btn-default">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
        <div v-show="!editing" class="col-sm-9 col-sm-offset-3">
          <button @click="edit()" type="button" class="btn btn-default">Edit</button>
        </div>
      </div>
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
        <tr is="coach" v-for="coach in campaign.coaches" 
          :coach="coach"
          :editing="false"
          :show-cancel="true">
        </tr>
        <tr is="coach"
          :coach="newCoach"
          :editing="true"
          :show-cancel="false">
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
      campaign: {
        coaches: []
      },
      newCoach: {
        name: '',
        email: ''
      },
      editing: false,
      successMessage: '',
      failMessage: ''
    }
  },
  ready() {
    this.fetchCampaign();
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
      var coach = bl.clone(this.newCoach);
      this.campaign.coaches.push(coach);
      this.newCoach.name = '';
      this.newCoach.email = '';
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