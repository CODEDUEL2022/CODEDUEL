<template>
  <div class="hp-monitor">
    <div class="you">
      <div class="flex">
        <span class="user-name">{{ yourName }}</span
        ><span>HP:{{ yourHP }}</span>
      </div>
      <div id="hp-frame">
        <div id="bar-you"></div>
        <div id="mark-you"></div>
      </div>
    </div>
    <div class="opponent">
      <div class="flex">
        <span class="user-name">{{ opponentName }}</span
        ><span>HP:{{ opponentHP }}</span>
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
    background-color: #ffffff5e;
    height: 0.8rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  #bar-you {
    height: 0.75rem;
    background-color: #ff8844;
    transition: 300ms;
    width: 100%;
  }

  #mark-you {
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background-color: #ffffff;
    filter: saturate(300%);
    box-shadow: 0 0 5px 3px #fff1d3, 0 0 7px 7px #ff8844;
  }

  #bar-opponent {
    height: 0.75rem;
    background-color: #00fff2;
    transition: 300ms;
    width: 100%;
  }

  #mark-opponent {
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background-color: #ffffff;
    filter: saturate(300%);
    box-shadow: 0 0 5px 3px #d3fffd, 0 0 7px 7px #00fff2;
  }
}
</styled>
