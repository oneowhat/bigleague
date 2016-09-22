<template>
<div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirm">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Are you sure?</h4>
      </div>
      <div class="modal-body bl-modal-body">
        <div class="alert alert-warning">
          {{model.message}}
        </div>
        <div class="form-group text-center">
          <button data-dismiss="modal" type="button" class="btn btn-default">Cancel</button>
          <button @click="model.confirm" type="button" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['model']
};
</script>
