<template>
  <div>
    <div class="alert alert-danger">
      {{message}}
    </div>
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      message: store.currentMessage
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
