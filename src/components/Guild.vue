<template>
  <div>
    {{guild.name}}
  </div>
  <div v-for="model in models">
    {{model|json}}
  </div>
  <div v-if="user.admin">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Name</label>
        <div class="col-sm-9">
          <input v-model="model.name" type="text" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="guild" class="col-sm-2 control-label">Guild</label>
        <div class="col-sm-9">
          {{guild.name}}
        </div>
      </div>
      <div class="form-group">
        <label for="role" class="col-sm-2 control-label">Role</label>
        <div class="col-sm-9">
          <select class="form-control" v-model="model.role">
            <option v-for="role in roles" :value="role">{{role}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="gender" class="col-sm-2 control-label">Gender</label>
        <div class="col-sm-9">
          <select class="form-control" v-model="model.gender">
            <option v-for="gender in genders" :value="gender">{{gender}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="race" class="col-sm-2 control-label">Race & Ethnicity</label>
        <div class="col-sm-9">
          <input v-model="races" type="text" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="position" class="col-sm-2 control-label">Position</label>
        <div class="col-sm-9">
          <select class="form-control" v-model="model.position">
            <option v-for="position in positions" :value="position">{{position}}</option>
          </select>
        </div>
      </div>
    </form>
    {{model | json}}
  </div>
</template>

<script>
import {store} from '../store.js';

export default {
  data() {
    return {
      user: store.user,
      roles: store.roles,
      genders: store.genders,
      positions: store.positions,
      guild: {},
      models: [],
      races: '',
      model: {
        name: "",
        guild: "",
        role: "",
        gender: "",
        race: [],
        position: "",
        jog: 0,
        sprint: 0,
        tac: 0,
        kick: 0,
        kickrange: 0,
        def: 0,
        arm: 0,
        influence: 0,
        maxinf: 0
      }
    }
  },
  ready() {
    this.fetchGuild();
  },
  methods: {
    fetchGuild: function() {
      this.$http.get(store.api + '/api/guilds/' + this.$route.params.guild)
        .then((response) => {
          var data = response.json();
          this.guild = data.guild;
          this.models = data.models;
        });
    },
    insertModel: function() {
      var model = this.model;
      model.guild = this.guild.name;
      model.race = this.races.split(',');
      console.log(model);
    }
  }
}
</script>