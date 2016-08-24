<template>
  <tr>
    <td>
      <span v-show="!editing">{{coach.name}}</span>
      <input v-show="editing" v-model="coach.name" type="text" class="form-control" required />
    </td>
    <td>
      <span v-show="!editing">{{coach.guild}}</span>
      <select v-show="editing" v-model="coach.guild" class="form-control">
        <option value="">- Select Guild -</option>
        <option v-for="guild in guilds" :value="guild.name">{{guild.name}}</option>
      </select>
    </td>
    <td class="actions">
      <button v-show="!editing" @click="edit()" type="button" class="btn btn-default">Edit</button>
      <button v-show="editing && showCancel" @click="cancel()" type="button" class="btn btn-default">Cancel</button>
      <button v-show="editing" @click="save(coach, cancel)" :disabled="!enableSave" type="button" class="btn btn-primary">Save</button>
    </td>
  </tr>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user,
      guilds: store.guilds
    }
  },
  props: ['coach', 'editing', 'showCancel', 'save'],
  computed: {
    enableSave: function() {
      return this.coach.name.length > 1
        && this.coach.guild !== '';
    }
  },
  methods: {
    edit: function() {
      this.editing = true;
    },
    cancel: function() {
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
