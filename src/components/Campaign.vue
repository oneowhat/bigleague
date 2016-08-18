<template>
  <div>
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
  </div>
</template>

<script>
import {store} from '../store.js';
import CampaignEditor from './CampaignEditor.vue';
  
export default {
  components: { CampaignEditor },
  data() {
    return {
      user: store.user,
      campaign: {},
      editing: false
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
      /*
      this.$http.put(store.api + '/api/campaign/' + campaignName, this.campaign)
        .then((response) => {
          this.campaign = response.json().campaign;
        });
        */
    }
  }
};

</script>

<style scoped>
  
</style>