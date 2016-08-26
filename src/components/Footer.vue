<template>
  <div class="footer">
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user
    }
  }
}
</script>

<style scoped>

</style>