<template>
  <tr>
    <td>
      <router-link v-if="!editing && coach.id" :to="{ name: 'coach', params: { campaign: campaign.title, coach: coach.name }}">
        {{coach.name}}
      </router-link>
      <input v-show="editing" v-model="coach.name" type="text" class="form-control" required />
    </td>
    <td>
      <span v-show="!editing">{{coach.guild}}</span>
      <select v-show="editing" v-model="coach.guild" class="form-control">
        <option value="">- Select Guild -</option>
        <option v-for="guild in guilds" :value="guild.name">{{guild.name}}</option>
      </select>
    </td>
    <td class="actions text-right">
      <button v-show="!editing && enableEdit" @click="edit" type="button" class="btn btn-default">Edit</button>
      <button v-show="editing && showCancel" @click="cancel" type="button" class="btn btn-default">Cancel</button>
      <button v-show="editing" @click="saveCoach" :disabled="!enableSave" type="button" class="btn btn-primary">Save</button>
    </td>
  </tr>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      editing: false,
      user: store.user,
      guilds: store.guilds.filter(function (guild) {
        return guild.active;
      })
    }
  },
  mounted() {
    if (!this.coach.id) {
      this.editing = true;
    }
  },
  props: ['campaign', 'coach', 'showCancel', 'save'],
  computed: {
    enableEdit: function() {
      console.log(this.campaign.round)
      return this.campaign.round <= 0;
    },
    enableSave: function () {
      return this.coach.name.length > 1
        && this.coach.guild !== '';
    }
  },
  methods: {
    edit: function () {
      this.editing = true;
    },
    cancel: function() {
      this.editing = false;
    },
    saveCoach: function() {
      this.save(this.coach);
      this.editing = false;
    }
  }
}
</script>

<style scoped>

.actions {
  width: 20%;
}

</style>
