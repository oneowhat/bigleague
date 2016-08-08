<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="onSearch()">Search</button>
    <button @click="onInsert()">Insert</button>
	  {{guilds | json}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello World vue!',
      guilds: [],
    };
  },
  methods: {
    onSearch() {
      this.$http({ url: 'http://localhost:3000', method: 'GET' })
        .then((response) => {
          this.guilds = response.json();
        });
    },
    onInsert() {
      this.$http({ url: 'http://localhost:3000/insert', method: 'POST' })
        .then((response) => {
          console.log(response);
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
