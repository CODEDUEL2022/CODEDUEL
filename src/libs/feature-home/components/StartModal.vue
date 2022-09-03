<template>
  <div class="overlay">
    <div class="modal">
      <div class="contents">
        <span>Choose Game Mode.</span>
        <img src="/src/libs/ui/assets/bi_people-fill.png" />
        <span>or</span>
        <img src="/src/libs/ui/assets/bi_robot.png" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "StartModal",
    props: [],
  };
</script>
<style lang="scss" scoped>
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .modal {
      margin: 5rem;
      width: fit-content;
      padding: 1rem 3rem;
      position: relative;
      border: 4px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;

      &::before {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: -3px;
        bottom: -3px;
        left: 10px;
        right: 10px;
      }

      &::after {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: 10px;
        bottom: 10px;
        left: -3px;
        right: -3px;
      }

      span {
        position: relative;
        z-index: 1;
        font-size: 28px;
        letter-spacing: 0.15em;
        @keyframes neon {
          0% {
            text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
          }
          100% {
            text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 0px #d3fffd;
          }
        }
        animation: neon 2s infinite alternate;
      }

      .contents {
        z-index: 10;
      }
    }
  }
</style>
