<template>
  <div class="flex">
    <div id="loading-content"></div>
    <v-img
      class="osTip"
      height="48"
      width="48"
      :src="require(`../../ui/assets/OSfield_tip/${currentFieldImg}`)"
    ></v-img>
    <div class="os-info">
      <div class="name">{{ currentFieldName }}</div>
      <div>Next >> {{ nextFieldName }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["currentFieldName", "currentFieldImg", "nextFieldName"],
  };
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
    position: relative;
    text-align: left;
    text-shadow: 0 0 7px #d3fffd;
    font-size: 1.25rem;
    margin-left: 3rem;
    .osTip {
      position: absolute;
      top: 16px;
      left: 40px;
    }
    .os-info {
      min-width: 200px;
      .name {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem 0;
        border-bottom: solid 1px #d3fffd;
        letter-spacing: 0.15rem;
      }
    }
  }

  #loading-content {
    display: block;
    width: 5rem;
    height: 5rem;
    margin: 0 1.5rem;
    border: 2px solid #fff;
  }

  #loading-content:after {
    content: "";
    position: absolute;
    border: 2px solid #fff;
    left: 6px;
    right: 6px;
    top: 6px;
    bottom: 6px;
  }

  #loading-content:before {
    content: "";
    position: absolute;
    border: 2px solid #fff;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
  }

  #loading-content {
    border: 2px solid transparent;
    border-top-color: #d3fffd;
    border-bottom-color: #d3fffd;
    border-radius: 50%;
    -webkit-animation: loader 9s linear infinite;
    -moz-animation: loader 9s linear infinite;
    -o-animation: loader 9s linear infinite;
    animation: loader 9s linear infinite;
  }

  #loading-content:before {
    border: 1px solid transparent;
    border-top-color: #d3fffd;
    border-bottom-color: #d3fffd;
    border-radius: 50%;
    -webkit-animation: reverse-loader 3s linear infinite;
    -moz-animation: reverse-loader 3s linear infinite;
    -o-animation: reverse-loader 3s linear infinite;
    animation: reverse-loader 3s linear infinite;
  }

  #loading-content:after {
    border: 3px solid transparent;
    border-top-color: #d3fffd;
    border-bottom-color: #d3fffd;
    border-radius: 60%;
    -webkit-animation: loader 5s linear infinite;
    animation: loader 5s linear infinite;
    -moz-animation: loader 5s linear infinite;
    -o-animation: loader 5s linear infinite;
  }

  @-webkit-keyframes loaders {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes reverse-loader {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }
</style>
