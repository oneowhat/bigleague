<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="onSearch()">Poop</button>
	{{campaigns | json}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World vue!',
      campaigns: [],
    };
  },
  methods: {
    onSearch() {
      this.$http({ url: 'http://localhost:3000', method: 'GET' })
        .then(function (response) {
          this.campaigns = response;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
