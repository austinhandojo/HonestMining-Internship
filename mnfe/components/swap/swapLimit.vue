<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading">
      <h3 class="card-title text-uppercase">Swap Daily Limit</h3>
    </div>
    <div class="card-body">
      <div class="font-size-13-px text-right">
        <strong class="text-default">0000</strong>
        / 0000
      </div>
      <div class="mt-2">
        <div class="progress">
          <div
            :style="`width: ${ '50' }%`"
            :aria-valuenow="50"
            class="progress-bar bg-primary"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  </div>
</template>
