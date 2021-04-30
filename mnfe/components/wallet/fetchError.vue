<template>
  <div class="min-height-300 d-flex align-items-center justify-content-center flex-column">
    <img
      :src="$assets.genBobSad"
      :srcset="`${ $assets.genBobSad_2x } 2x`"
      width="90"
      height="auto"
      class="mb-20"
      alt
    >

    <p class="m-0 text-danger w-50 text-center">
      <slot />
    </p>
  </div>
</template>
