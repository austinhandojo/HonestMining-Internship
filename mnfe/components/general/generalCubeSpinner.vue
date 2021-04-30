<template>
  <div 
    class="d-flex align-items-center justify-content-center" 
    style="height: 100%;">
    <div 
      :style="`height: ${ height }; `" 
      class="d-flex justify-content-center align-items-center">
      <div 
        :style="`transform: scale(${ scale });`" 
        class="spinner-inner">
        <div class="cube panelLoad">
          <div class="cube-face cube-face-front">
            <img 
              src="/img/logo-mini.png" 
              alt>
          </div>
          <div class="cube-face cube-face-back">
            <img 
              src="/img/logo1.png" 
              alt>
          </div>
          <div class="cube-face cube-face-left">
            <img 
              src="/img/logo2.png" 
              alt>
          </div>
          <div class="cube-face cube-face-right">
            <img 
              src="/img/logo3.png" 
              alt>
          </div>
          <div class="cube-face cube-face-bottom">
            <img 
              src="/img/logo-mini.png" 
              alt>
          </div>
          <div class="cube-face cube-face-top">
            <img 
              src="/img/logo-mini.png" 
              alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      height: '150px',
      scale: 1
    };
  },

  created() {
    switch (this.size) {
      case 'large':
        this.scale = 1.25;
        this.height = `200px`;
        break;
      case 'medium':
        this.scale = 0.75;
        this.height = `110px`;
        break;
      case 'small':
        this.scale = 0.5;
        this.height = `80px`;
        break;
      case 'tiny':
        this.scale = 0.25;
        this.height = `40px`;
        break;
      default:
        this.scale = 1;
        this.height = `150px`;
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  * {
    box-sizing: border-box;
  }
}

.cube {
  width: 80px;
  height: 80px;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.5s 0.1s;
  perspective: 9999px;
  color: #333;
  opacity: 1;
  position: relative;

  &.panelLoad {
    z-index: 11;
    top: 50%;
    animation: letter-cube-panel 2.2s infinite forwards;

    .cube-face {
      font-family: 'Open Sans', sans-serif;
      font-size: 50px;
      color: #41b883;
      box-shadow: inset 0 0 0 1px #268cb8, 0 0 1px 1px #268cb8;
    }
  }

  .cube-face {
    width: inherit;
    height: inherit;
    position: absolute;
    background: white;
    box-shadow: inset 0 0 0 1px #333, 0 0 1px 1px #333;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
  }

  .cube-face-front {
    transform: translate3d(0, 0, 40px);
    font-size: 57px;
  }

  .cube-face-back {
    transform: rotateY(180deg) translate3d(0, 0, 40px);
  }

  .cube-face-left {
    transform: rotateY(-90deg) translate3d(0, 0, 40px);
  }

  .cube-face-right {
    transform: rotateY(90deg) translate3d(0, 0, 40px);
  }

  .cube-face-top {
    transform: rotateX(90deg) translate3d(0, 0, 40px);
  }

  .cube-face-bottom {
    transform: rotateX(-90deg) translate3d(0, 0, 40px);
  }
}

@keyframes letter-cube-panel {
  0% {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  20% {
    transform: rotateY(90deg) rotateZ(0deg);
  }
  40% {
    transform: rotateX(45deg) rotateZ(45deg);
  }
  60% {
    transform: rotateX(90deg) rotateY(180deg) rotateX(90deg);
  }
  80% {
    transform: rotateX(310deg) rotateZ(230deg);
  }
  100% {
    transform: rotateX(360deg) rotateZ(360deg);
  }
}
</style>
