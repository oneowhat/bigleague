<template>
  <h1>{{player.name}}</h1>
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