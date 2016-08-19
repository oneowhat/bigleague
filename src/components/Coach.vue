<template>
  <tr>
    <td>
      <span v-show="!editing">{{coach.name}}</span>
      <input v-show="editing" v-model="coach.name" type="text" class="form-control" required />
    </td>
    <td>
      <span v-show="!editing">{{coach.email}}</span>
      <input v-show="editing" v-model="coach.email" type="email" class="form-control" />
    </td>
    <td>
      <button v-show="!editing" @click="edit()" type="button" class="btn btn-default">Edit</button>
      <button v-show="editing && showCancel" @click="cancel()" type="button" class="btn btn-default">Cancel</button>
      <button v-show="editing" @click="save()" type="button" class="btn btn-primary">Save</button>
    </td>
  </tr>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user
    }
  },
  props: ['coach', 'editing', 'showCancel', 'save'],
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