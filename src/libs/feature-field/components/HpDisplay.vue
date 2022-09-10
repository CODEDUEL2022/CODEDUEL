<template>
  <div class="hp-monitor">
    <div class="you">
      <div class="flex">
        <span class="user-name">You</span><span>HP:{{ yourHP }}</span>
      </div>
      <div id="hp-frame">
        <div id="bar-you"></div>
        <div id="mark-you"></div>
      </div>
    </div>
    <div class="opponent">
      <div class="flex">
        <span class="user-name">Opponent</span><span>HP:{{ opponentHP }}</span>
      </div>
      <div id="hp-frame">
        <div id="bar-opponent"></div>
        <div id="mark-opponent"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HPDisplay",
    props: ["yourHP", "opponentHP"],
    mounted() {
      const yours = document.getElementById("bar-you");
      const opponents = document.getElementById("bar-opponent");
      yours.style.width = this.yourHP / 2 + "%";
      opponents.style.width = this.opponentHP / 2 + "%";

      console.log(yours.style.width);
      console.log(opponents.style.width);
    },
    methods: {
      alterYourLife: function (value) {
        const lifeBar = document.getElementById("bar-you");
        const lifeMark = document.getElementById("mark-you");
        this.yourHP = lifeBar.style.width;

        this.yourLife += value;
        if (this.yourHP <= 0) {
          this.yourHP = 0;
          setTimeout(function () {
            lifeMark.style.visibility = "hidden";
          }, 300);
        } else {
          if (this.yourHP > 200) {
            this.yourHP = 200;
          }
          lifeMark.style.visibility = "visible";
        }
        lifeBar.style.width = this.yourHP / 2 + "%";
      },
      alterOpponentLife: function (value) {
        const lifeBar = document.getElementById("bar-opponent");
        const lifeMark = document.getElementById("mark-opponent");
        this.opponentHP = lifeBar.style.width;

        this.opponentHP += value;
        if (this.opponentHP <= 0) {
          this.opponentHP = 0;
          setTimeout(function () {
            lifeMark.style.visibility = "hidden";
          }, 300);
        } else {
          if (this.opponentHP > 200) {
            this.opponentHP = 200;
          }
          lifeMark.style.visibility = "visible";
        }
        lifeBar.style.width = this.opponentHP / 2 + "%";
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
    width: 100%;
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
}
</styled>
