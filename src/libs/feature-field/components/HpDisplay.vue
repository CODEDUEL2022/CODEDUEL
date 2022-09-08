<template>
  <div class="hp-monitor">
    <div class="you">
      <div class="flex">
        <span class="user-name">You</span><span>HP:{{ yourLife }}</span>
      </div>
      <div id="hp-frame">
        <div id="bar-you"></div>
        <div id="mark-you"></div>
      </div>
    </div>
    <div class="opponent">
      <div class="flex">
        <span class="user-name">Opponent</span
        ><span>HP:{{ opponentLife }}</span>
      </div>
      <div id="hp-frame">
        <div id="bar-opponent"></div>
        <div id="mark-opponent"></div>
      </div>
    </div>
    <div id="btns-wrap">
      <div id="decrease-you" @click="alterYourLife(-10)">-</div>
      <div id="increase-you" @click="alterYourLife(10)">+</div>
      <div id="decrease-opponent" @click="alterOpponentLife(-10)">-</div>
      <div id="increase-opponent" @click="alterOpponentLife(10)">+</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HPDisplay",
    props: ["yourName", "yourHP", "opponentName", "opponentHP"],
    data() {
      return {
        yourLife: 200,
        opponentLife: 200,
      };
    },
    mounted() {
      const yours = document.getElementById("bar-you");
      const opponents = document.getElementById("bar-opponent");
      this.yourHP = yours.style.width;
      this.opponentHP = opponents.style.width;
      yours.style.width = this.yourLife / 2 + "%";
      opponents.style.width = this.opponentLife / 2 + "%";
    },
    methods: {
      alterYourLife: function (value) {
        const lifeBar = document.getElementById("bar-you"); // ライフバー
        const lifeMark = document.getElementById("mark-you"); // ライフの光部分
        const increaseYou = document.getElementById("increase-you"); // + ボタン
        const decreaseYou = document.getElementById("decrease-you");
        this.place = lifeBar.style.width;

        this.yourLife += value;
        if (this.yourLife <= 0) {
          this.yourLife = 0;
          setTimeout(function () {
            lifeMark.style.visibility = "hidden";
          }, 300);
        } else {
          if (this.yourLife > 200) {
            this.yourLife = 200;
          }
          lifeMark.style.visibility = "visible";
        }
        lifeBar.style.width = this.yourLife / 2 + "%";
      },
      alterOpponentLife: function (value) {
        const lifeBar = document.getElementById("bar-opponent"); // ライフバー
        const lifeMark = document.getElementById("mark-opponent"); // ライフの光部分
        const increaseYou = document.getElementById("increase-opponent"); // + ボタン
        const decreaseYou = document.getElementById("decrease-oppponent");
        this.place = lifeBar.style.width;

        this.opponentLife += value;
        if (this.opponentLife <= 0) {
          this.opponentLife = 0;
          setTimeout(function () {
            lifeMark.style.visibility = "hidden";
          }, 300);
        } else {
          if (this.opponentLife > 200) {
            this.opponentLife = 200;
          }
          lifeMark.style.visibility = "visible";
        }
        lifeBar.style.width = this.opponentLife / 2 + "%";
      },
    },
  };
</script>

<styled scoped lang="scss">
.hp-monitor {
  width: 70%;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px #d3fffd;
  .you {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    .flex {
      display: flex;
      justify-content: space-between;
      span {
        flex-basis: 50%;
        text-align: right;
      }
      .user-name {
        text-align: left;
      }
    }
  }
  .opponent {
    font-size: 1.25rem;
    .flex {
      display: flex;
      span {
        flex-basis: 50%;
        text-align: right;
      }
      .user-name {
        text-align: left;
      }
    }
  }
  #hp-frame {
    background-color: #d3fffd;
    height: 0.8rem;
    display: flex;
    align-items: center;

    #bar-you {
      height: 0.75rem;
      background-color: rgb(0, 255, 255);
      transition: 300ms;
    }

    #mark-you {
      width: 3px;
      height: 3px;
      border-radius: 3px;
      background-color: rgb(255, 255, 255);
      filter: saturate(300%);
      box-shadow: 0 0 5px 3px rgb(200, 255, 255), 0 0 7px 7px rgb(100, 255, 255);
    }

    #bar-opponent {
      height: 0.75rem;
      background-color: rgb(0, 255, 255);
      transition: 300ms;
    }

    #mark-opponent {
      width: 3px;
      height: 3px;
      border-radius: 3px;
      background-color: rgb(255, 255, 255);
      filter: saturate(300%);
      box-shadow: 0 0 5px 3px rgb(200, 255, 255), 0 0 7px 7px rgb(100, 255, 255);
    }
  }

  #btns-wrap {
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;

    #increase-you,
    #decrease-you {
      margin-top: 10px;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background-color: dodgerblue;
      text-align: center;
      line-height: 30px;
    }
    #increase-you:active,
    #decrease-you:active {
      transform: translate(2px, 2px);
    }
    #increase-opponent,
    #decrease-opponent {
      margin-top: 10px;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background-color: #39b8bb;
      text-align: center;
      line-height: 30px;
    }
    #increase-opponent:active,
    #decrease-opponent:active {
      transform: translate(2px, 2px);
    }
  }
}
</styled>
