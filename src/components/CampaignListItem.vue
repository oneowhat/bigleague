<template>
  <div>
    <router-link :to="{ name: 'campaign', params: { campaign: campaign.title }}">{{campaign.title}}</router-link>
  </div>
</template>

<script>

export default {
  props: ['campaign']
};

</script>

<style scoped>

</style>
