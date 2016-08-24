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
</div>

</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';
import Coach from './Coach.vue';

export default {
  components: {
    Coach
  },
  data() {
    return {
      newCoach: {
        name: '',
        email: '',
        guild: '',
        confirmed: false,
        user_id: {}
      },
      failMessage: '',
      successMessage: ''
    }
  },
  props: ['coaches', 'campaignId'],
  methods: {
    addCoach: function() {
      var vm = this;
      var coach = bl.clone(this.newCoach);
      coach.campaign_id = this.campaignId;

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
    dismissMessages: function() {
      this.successMessage = '';
      this.failMessage = '';
    }
  }
}

</script>

<style scoped>

</style>
