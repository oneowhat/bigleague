<template>
  <h2>{{player.name}}</h2>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user
    }
  },
  props: ['player'],
  methods: {
  }
}
</script>