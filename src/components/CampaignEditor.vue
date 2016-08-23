<template>
  <div>
    <div class="form-group">
      <label for="title" class="control-label">Title</label>
      <input v-model="campaign.title" type="text" placeholder="Title" class="form-control" required />
    </div>
    <div class="form-group">
      <label for="location" class="control-label">Location</label>
        <input v-model="campaign.location" type="text" placeholder="Location" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label for="passphrase" class="control-label">Coach pass phrase</label>
      <input v-model="campaign.passphrase" type="text" placeholder="Coach pass phrase" class="form-control" />
    </div>
    <div class="form-group text-center">
      <button @click="cancelEdit" type="button" class="btn btn-default">Cancel</button>
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['campaign', 'cancelEdit']
};

</script>
