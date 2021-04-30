<template>
  <div class="text-center">
    <i
      v-if="type === 'danger'"
      class="text-danger font-40 fas fa-exclamation-circle" />
    <i
      v-if="type === 'warning'"
      class="text-yellow font-40 fas fa-exclamation-triangle" />
    <br >
    <p
      v-if="message"
      :class="type === 'danger' ? 'text-danger' : 'text-gray'"
      class="d-inline-block mt-20 mb-0"
    >{{ message }}</p>
    <slot />
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
    }
  }
};
</script>
