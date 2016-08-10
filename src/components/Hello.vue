<template>
  <div id="hello">
    <img class="logo" src="../assets/logo.png">
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to BIG LEAGUE for Guild Ball',
      guilds: [],
    };
  },
  methods: {
  
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}

#hello {
  text-align: center;
}

</style>
