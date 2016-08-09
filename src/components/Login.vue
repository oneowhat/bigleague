<template>
  <div>
    <form @submit.prevent="onSubmit()">
      <h2>Sign in</h2>
      <div class="alert alert-danger hidden" :class="{ 'hidden': !message }">
        {{message}}
      </div> 
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth.js';
import {store} from '../store.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    onSubmit() {
      var router = this.$route.router;
      var request = {
        email: this.email,
        password: this.password
      };
      this.$http.post(store.api + '/login', request)
        .then((response) => {
          var data = response.json();
          if(response.status === 401) {
            this.message = data.message;
          } else {
            auth.login(data);
            router.go('/');
          }
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