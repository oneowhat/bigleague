<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Your Campaigns</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns">
          <td>
            <router-link :to="{ name: 'campaign', params: { campaign: campaign.title }}">{{campaign.title}}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div :class="{ 'hidden': campaigns.length > 0 }" class="alert alert-info hidden">
      No campaigns yet, start one!
    </div>
    <button @click="newCampaign" class="btn btn-primary" type="button">Start a new campaign</button>
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
import CampaignEditor from './CampaignEditor.vue';

export default {
  components: { CampaignEditor },
  data() {
    return {
      failMessage: '',
      campaigns: [],
      campaign: {
        title: '',
        location: '',
        passPhrase: '',
        userId: store.user.id,
        coaches: [],
        rounds: [{ matches: [] }],
        round: 0
      }
    }
  },
  mounted() {
    this.fetchCampaigns();
  },
  computed: {
    initialized: function() {
      return this.campaign.rounds.length > 0;
    }
  },
  methods: {
    fetchCampaigns: function() {
      this.$http.get(store.api + '/api/campaigns/' + store.user.id)
        .then((response) => {
          this.campaigns = response.json();
        });
    },
    newCampaign: function() {
      $('#modalCampaign').modal('show');
    },
    cancelEdit: function() {
      $('#modalCampaign').modal('hide');
    },
    save: function() {
      var request = this.campaign;

      var fetch = this.fetchCampaigns;
      this.$http.post(store.api + '/api/campaigns', request)
        .then((response) => {
          if (response.status === 201) {
            this.campaigns.push(request);
            $('#modalCampaign').modal('hide');
          }
        });
    }
  }
}
</script>
