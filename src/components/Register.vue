<template>
  <div>
    <form @submit.prevent="onSubmit()" v-show="!registered">
      <h2>Register</h2>
      <div class="alert alert-danger hidden" :class="{ 'hidden': !message }">
        {{message}}
      </div> 
      <label for="inputName" class="sr-only">User name (what others will see)</label>
      <input v-model="name" type="text" id="inputName" class="form-control" placeholder="User name" required autofocus />
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required />
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
      <label for="inputConfirm" class="sr-only">Confirm password</label>
      <input v-model="confirm" type="password" id="inputPassword" class="form-control" placeholder="Confirm password" required />
      <button class="btn btn-lg btn-primary btn-block" :disabled="!isValid" type="submit">Register</button>
    </form>
    <div v-show="registered" class="registered">
      <div class="alert alert-success">
        Successfully registered! Sign in to begin using Big League...
      </div>
      <button v-link="{ path: '/login' }" type="button" class="btn btn-lg btn-primary">Sign in</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm: '',
      registered: false,
      message: ''
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
      this.$http.post(store.api + '/register', request)
        .then((response) => {
          var data = response.json();
          if (data.success) {
            this.registered = true;
          } else {
            this.message = data.message;
          }
        });
    }
  }
};
</script>

<style scoped>

form, div.registered {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}

</style>