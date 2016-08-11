<template>
  <div>
    {{guild.name}}
  </div>
  <div v-for="model in models">
    {{model|json}}
  </div>
  <div v-if="user.admin">
    <form @submit.prevent="insertModel()" class="form-horizontal">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Name</label>
        <div class="col-sm-9">
          <input v-model="model.name" type="text" class="form-control" />
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
      <div class="form-group">
        <label for="jog" class="col-sm-2 control-label">mov</label>
        <div class="col-sm-1">
          <input v-model="model.jog" type="number" class="form-control" />
        </div>
        <div class="col-sm-1">
          <input v-model="model.sprint" type="number" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="tac" class="col-sm-2 control-label">Tac</label>
        <div class="col-sm-1">
          <input v-model="model.tac" type="number" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="kick" class="col-sm-2 control-label">Kick</label>
        <div class="col-sm-1">
          <input v-model="model.kick" type="number" class="form-control" />
        </div>
        <div class="col-sm-1">
          <input v-model="model.kickrange" type="number" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="def" class="col-sm-2 control-label">Def</label>
        <div class="col-sm-1">
          <input v-model="model.def" type="number" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="arm" class="col-sm-2 control-label">Arm</label>
        <div class="col-sm-1">
          <input v-model="model.arm" type="number" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="kick" class="col-sm-2 control-label">Inf</label>
        <div class="col-sm-1">
          <input v-model="model.influence" type="number" class="form-control" />
        </div>
        <div class="col-sm-1">
          <input v-model="model.maxinf" type="number" class="form-control" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
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
      var fetch = this.fetchGuild;
      var reset = this.reset;
      
      model.guild = this.guild.name;
      model.race = this.races.split(',');
      
      this.$http.post(store.api + '/api/models', model)
        .then((response) => {
          if (response.status === 201) {
            this.models.push(model);
            reset();
          }
        });
    },
    reset: function() {
      this.model = {
        name: "",
        guild: "",
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
      };
      this.races = '';
    }
  }
}
</script>