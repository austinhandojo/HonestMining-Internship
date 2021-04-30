<template>
  <div class="text-center">
    <i
      v-if="type === 'danger'"
      class="text-danger font-40 fas fa-exclamation-circle" />
    <i
      v-if="type === 'warning'"
      class="text-yellow font-40 fas fa-exclamation-triangle" />
    <br >
    <span
      :class="type === 'danger' ? 'text-danger' : 'text-gray'"
      class="d-inline-block mt-20"
    >{{ message }}</span>
    <br >
    <span
      v-if="action"
      class="d-inline-flex text-primary cursor-pointer"
      @click="$emit('try-again')"
    >Try again</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'danger'
    },

    message: {
      type: String,
      default: ''
    },

    action: {
      type: Boolean,
      default: true
    }
  }
};
</script>
