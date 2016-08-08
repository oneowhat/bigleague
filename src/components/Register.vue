<template>
  <div>
    <form @submit.prevent="onSubmit()">
      <h2>Register</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
      <label for="inputConfirm" class="sr-only">Confirm password</label>
      <input v-model="confirm" type="password" id="inputPassword" class="form-control" placeholder="Confirm password" required />
      <button class="btn btn-lg btn-primary btn-block" :disabled="!isValid" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirm: ''
    };
  },
  computed: {
    isValid() {
      return this.password && this.password === this.confirm;
    }
  },
  methods: {
    onSubmit() {
      var request = {
        email: this.email,
        password: this.password
      };
      this.$http.post('http://localhost:3000/register', request)
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