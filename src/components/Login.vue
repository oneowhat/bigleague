<template>
  <div>
    <form @submit.prevent="onSubmit()">
      <h2>Sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      var request = {
        email: this.email,
        password: this.password
      };
      this.$http.post('http://localhost:3000/login', request)
        .then((response) => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>

form {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}

</style>