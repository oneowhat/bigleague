<template>
<div class="modal fade" id="modalCampaign" tabindex="-1" role="dialog" aria-labelledby="modalCampaign">
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
            <label for="title" class="control-label">Title</label>
            <input v-model="campaign.title" type="text" placeholder="Title" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="location" class="control-label">Location</label>
            <input v-model="campaign.location" type="text" placeholder="Location" class="form-control" />
          </div>
          <div class="form-group">
            <label for="passphrase" class="control-label">Coach pass phrase</label>
            <input v-model="campaign.passphrase" type="text" placeholder="Coach pass phrase" class="form-control" />
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

export default {
  props: ['campaign', 'cancelEdit', 'failMessage', 'save']
};

</script>
