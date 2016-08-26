<template>
  <div>
    <div transition="expand">
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
              <a v-link="{ name: 'campaign', params: { campaign: campaign.title }}">{{campaign.title}}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div :class="{ 'hidden': campaigns.length > 0 }" class="alert alert-info hidden">
        No campaigns yet, start one!
      </div>
      <button @click="newCampaign" class="btn btn-primary" type="button">Start a new campaign</button>
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
import CampaignEditor from './CampaignEditor.vue';

export default {
  components: { CampaignEditor },
  data() {
    return {
      campaigns: [],
      campaign: {
        title: '',
        location: '',
        passphrase: '',
        longshanks: store.user.name,
        coaches: [],
        initialized: false
      }
    }
  },
  ready() {
    this.fetchCampaigns();
  },
  methods: {
    fetchCampaigns: function() {
      this.$http.get(store.api + '/api/campaigns/' + store.user.name)
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
      this.campaign.longshanks = store.user.name;
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
