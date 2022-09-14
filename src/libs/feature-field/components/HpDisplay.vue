<template>
  <div class="hp-monitor">
    <div class="you">
      <div class="flex">
        <span class="user-name">{{ yourName }}</span
        ><span>HP:{{ yourHP }}</span>
      </div>
      <div class="hp-frame" id="your-hp-frame">
        <div id="bar-you"></div>
        <div id="mark-you"></div>
      </div>
    </div>
    <div class="opponent">
      <div class="flex">
        <span class="user-name">{{ opponentName }}</span
        ><span>HP:{{ opponentHP }}</span>
      </div>
      <div class="hp-frame" id="opponent-hp-frame">
        <div id="bar-opponent"></div>
        <div id="mark-opponent"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HPDisplay",
    props: ["yourName", "yourHP", "opponentName", "opponentHP"],
    updated() {
      const yoursHPbar = document.getElementById("bar-you");
      const opponentHPbar = document.getElementById("bar-opponent");
      const yoursBarMark = document.getElementById("mark-you");
      const opponentBarMark = document.getElementById("mark-opponent");
      yoursHPbar.style.width = this.yourHP / 2 + "%";
      opponentHPbar.style.width = this.opponentHP / 2 + "%";
      if (this.yourHP <= 0) {
        yoursHPbar.style.width = 0;
        yoursBarMark.style.width = 0;
        yoursBarMark.style.boxShadow = "none";
      }
      if (this.opponentHP <= 0) {
        opponentHPbar.style.width = 0;
        opponentBarMark.style.width = 0;
        opponentBarMark.style.boxShadow = "none";
      }
    },
  };
</script>

<style scoped lang="scss">
  .hp-monitor {
    width: 70%;
    letter-spacing: 0.1em;

    .you {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      .flex {
        display: flex;
        justify-content: space-between;
        span {
          flex-basis: 50%;
          text-align: right;
          text-shadow: 0 0 10px #ff5e00;
        }
        .user-name {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .opponent {
      font-size: 1.15rem;
      .flex {
        display: flex;
        span {
          flex-basis: 50%;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: 0 0 10px #d3fffd;
        }
        .user-name {
          text-align: left;
        }
      }
    }
    .hp-frame {
      background-color: #ffffff5e;
      height: 0.8rem;
      width: 100%;
      display: flex;
      align-items: center;
    }

    #bar-you {
      height: 0.9rem;
      background: linear-gradient(to right, #ffd000, #ff8844);
      transition: 300ms;
      width: 100%;
    }

    #mark-you {
      width: 3px;
      height: 3px;
      border-radius: 3px;
      background-color: #ffffff;
      filter: saturate(300%);
      box-shadow: 0 0 5px 3px #fff1d3, 0 0 7px 7px #ffbc95;
    }

    #bar-opponent {
      height: 0.9rem;
      background: linear-gradient(to right, #00fff2, #30a4a7);
      transition: 300ms;
      width: 100%;
    }

    #mark-opponent {
      width: 3px;
      height: 3px;
      border-radius: 3px;
      background-color: #ffffff;
      filter: saturate(300%);
      box-shadow: 0 0 5px 3px #d3fffd, 0 0 7px 7px #73fff8;
    }

    .moveHPBar {
      animation: purupuru_anim 1.5s;
      @keyframes purupuru_anim {
        0% {
          transform: translate(0, 0);
        }
        5% {
          transform: translate(-5px, -0);
        }
        10% {
          transform: translate(5px, 0);
        }
        15% {
          transform: translate(-5px, -0);
        }
        20% {
          transform: translate(5px, 0);
        }
        25% {
          transform: translate(-5px, -0);
        }
        30% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    }
  }
</style>
