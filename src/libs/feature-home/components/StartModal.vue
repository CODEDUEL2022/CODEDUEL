<template>
  <div class="overlay" @click="$emit('handleModalClose')">
    <div class="modal">
      <div class="contents">
        <div>
          <span>Choose Game Mode.</span>
          <div class="select">
            <div class="select-icon" @click="$emit('handleChangeContent')">
              <span>
                <img src="../../ui/assets/bi_people-fill.svg" />
                <br />
                Play with Human
              </span>
            </div>
            <span>or</span>
            <div class="select-icon">
              <span>
                <img src="../../ui/assets/bi_robot.svg" />
                <br />
                Play with CPU
              </span>
            </div>
          </div>
          <div class="close-btn">
            <span @click="isStartModalOpen = false">back</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "StartModal",
    props: ["isStartModalOpen"],
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
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;

      &::before {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: -8px;
        bottom: -8px;
        left: 40px;
        right: 40px;
      }

      &::after {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: 40px;
        bottom: 40px;
        left: -8px;
        right: -8px;
      }

      span {
        position: relative;
        z-index: 10;
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

        .select {
          display: flex;
          align-items: center;
          padding: 1rem;

          .select-icon {
            margin: 1rem;
            min-width: 165px;
            span {
              font-size: 1.15rem;
            }
            &:hover {
              cursor: pointer;
            }
          }
        }

        .close-btn {
          position: relative;
          margin: 1rem;
          cursor: pointer;

          span {
            z-index: 10;
            text-align: center;
            font-size: 1.5rem;
            padding: 0.5rem 1.5rem;
            background-color: rgb(18, 81, 100, 0.6);
          }
        }
      }
    }
  }
</style>
