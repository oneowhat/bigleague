<template>
<div class="modal fade" id="modalMatch" tabindex="-1" role="dialog" aria-labelledby="modalMatch">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Campaign</h4>
      </div>
      <div class="modal-body bl-modal-body">
        <div class="alert alert-warning hidden">
          {{message}}
        </div>
        <form @submit.prevent="save()">
          <div class="form-group">
            <label for="title" class="control-label">Home score</label>
            <input v-model="match.homeScore" type="number" min="0" placeholder="Home score" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="location" class="control-label">Away score</label>
            <input v-model="match.awayScore" type="number" min="0" placeholder="Away score" class="form-control" required />
          </div>
          <br />
          <div class="form-group text-center">
            <button @click="cancelEdit" type="button" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {bl} from '../store.js';

export default {
  props: ['match', 'coaches', 'failMessage', 'save'],
  computed: {

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
    }
  }
};

</script>
