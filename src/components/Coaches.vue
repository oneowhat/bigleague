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
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Guild</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr is="coach-list-item" v-for="coach in campaign.coaches"
        :campaign="campaign"
        :coach="coach"
        :show-cancel="true"
        :save="updateCoach">
      </tr>
      <tr v-show="!showNew">
        <td></td>
        <td></td>
        <td class="text-right">
          <a @click="add()" href="javascript:;">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>
        </td>
      </tr>
      <tr is="coach-list-item" v-show="showNew"
        :campaign="campaign"
        :coach="newCoach"
        :show-cancel="false"
        :save="addCoach">
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import CoachListItem from './CoachListItem.vue';

export default {
  components: {
    CoachListItem
  },
  data() {
    return {
      newCoach: {
        name: '',
        email: '',
        guild: ''
      },
      showNew: false,
      failMessage: '',
      successMessage: ''
    }
  },
  props: ['campaign'],
  methods: {
    add: function() {
      this.showNew = true;
    },
    addCoach: function() {
      var vm = this;
      var coach = bl.clone(this.newCoach);
      coach.campaignId = this.campaign.id;

      this.$http.post(store.api + '/api/coaches', coach)
        .then((response) => {
          if(response.status === 201) {
            vm.successMessage = "Coach " + coach.name + " added.";
            vm.campaign.coaches.push(coach);
            vm.reset();
          } else {
            vm.failMessage = response.message;
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });

    },
    updateCoach: function(coach, cb) {
      var vm = this;

      this.$http.put(store.api + '/api/coaches', coach)
        .then((response) => {
          if(response.status === 200) {
            vm.successMessage = "Coach " + coach.name + " updated.";
            if(cb) cb(response);
          } else {
            vm.failMessage = response.message;
          }
        }, (response) => {
          vm.failMessage = store.defaultError;
        });
    },
    reset: function() {
      this.newCoach.name = '';
      this.newCoach.guild = '';
      this.newCoach.email = '';
    },
    dismissMessages: function() {
      this.successMessage = '';
      this.failMessage = '';
    }
  }
}

</script>

<style scoped>

</style>
