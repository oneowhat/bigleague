<template>
<div class="modal fade" id="modalMatch" tabindex="-1" role="dialog" aria-labelledby="modalMatch">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Match Results</h4>
      </div>
      <div class="modal-body bl-modal-body">
        <div class="alert alert-warning hidden" :class="{ 'hidden': !message }">
          {{message}}
        </div>
        <form @submit.prevent="save">
          <div class="form-group">
            <label for="title" class="control-label">{{ match.homeCoachId | coachName }} score</label>
            <input v-model="match.homeScore" type="number" min="0" max="14" placeholder="Home score" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="location" class="control-label">{{ match.awayCoachId | coachName }} score</label>
            <input v-model="match.awayScore" type="number" min="0" max="14" placeholder="Away score" class="form-control" required />
          </div>
          <br />
          <div class="form-group text-center">
            <button @click="cancelEdit" type="button" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="!saveEnabled">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {store} from '../store.js';
import {bl} from '../store.js';

export default {
  data() {
    return {
      message: ''
    }
  },
  props: ['match', 'coaches', 'failMessage'],
  computed: {
    saveEnabled: function() {
      return (this.match.homeScore >= 0 && this.match.awayScore >= 0)
          && (this.match.homeScore >= 12 || this.match.awayScore >= 12);
    }
  },
  filters: {
    coachName: function(id) {
      var coach = bl.first(this.coaches, function(coach) {
        return coach.id === id;
      });
      return coach ? coach.name : '';
    }
  },
  methods: {
    cancelEdit: function() {
      $('#modalMatch').modal('hide');
    },
    save: function() {
      var vm = this;
      this.$http.put(store.api + '/api/matches', this.match)
        .then((response) => {
          if(response.status === 200) {
            $('#modalMatch').modal('hide');
            this.match.reportedAt = new Date();
          }
        }, (response) => {
          vm.message = store.defaultError;
        });
    }
  }
};

</script>
