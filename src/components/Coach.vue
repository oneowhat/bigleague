<template>
  <tr>
    <td>
      {{coach.name}}
    </td>
    <td>
      {{coach.email}}
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
  props: ['coach', 'editing'],
  methods: {
  }
}
</script>