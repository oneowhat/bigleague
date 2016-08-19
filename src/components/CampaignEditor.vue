<template>
  <div>
    <div class="form-group">
      <label for="title" class="col-sm-3 control-label">Title</label>
      <div class="col-sm-7">
        <input v-model="campaign.title" v-show="editing" type="text" placeholder="Title" class="form-control" required />
        <span v-show="!editing">{{campaign.title}}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="location" class="col-sm-3 control-label">Location</label>
      <div class="col-sm-7">
        <input v-model="campaign.location" v-show="editing" @change="locationChanged" type="text" placeholder="Location" class="form-control" />
        <span v-show="!editing">{{campaign.location}}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="joinCode" class="col-sm-3 control-label">Join code</label>
      <div class="col-sm-5">
        <input v-model="campaign.joinCode" v-show="editing" type="text" placeholder="Join code" class="form-control" />
        <span v-show="!editing">{{campaign.joinCode}}</span>
      </div>
      <div class="col-sm-2" v-show="editing">
        <button @click="generateCode()" type="button" class="btn btn-default">Generate Code</button>
      </div>
    </div>
    <div class="form-group">
      <label for="acceptJoinRequests" class="col-sm-3 control-label">Accept join requests</label>
      <div class="col-sm-7">
        <input v-model="campaign.acceptJoinRequests" v-show="editing" type="checkbox" :disabled="joinRequestsDisabled" />
        <span v-show="!editing">{{ campaign.acceptJoinRequests | boolString }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';
  
export default {
  data() {
    return {
      user: store.user
    }
  },
  props: ['campaign', 'editing'],
  computed: {
    joinRequestsDisabled: function() {
      return this.campaign.location === '';
    }
  },
  filters: {
    boolString: function(val) {
      return val ? 'Yes' : 'No';
    }
  },
  methods: {
    generateCode: function() {
      var text = [];
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for(var i = 0; i < 7; i++) {
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
      }
      
      this.campaign.joinCode = text.join('');
    },
    locationChanged: function() {
      if(this.campaign.location === '') {
        this.campaign.acceptJoinRequests = false;
      }
    }
  }
};

</script>

<style scoped>
  
</style>