<template>
  <div class="hp-monitor">
    <div class="you">
      <div class="flex">
        <span class="user-name">You</span><span>HP:{{ yourHP }}</span>
      </div>
      <div class="hp-bar"></div>
    </div>
    <div class="opponent">
      <div class="flex">
        <span class="user-name">Opponent</span><span>HP:{{ opponentHP }}</span>
      </div>
      <div class="hp-bar"></div>
    </div>
  </div>
</template>

<script>
  // HPの処理はバックエンドに移行するのでまだ書かない
  export default {
    name: "HPDisplay",
    props: ["yourName", "yourHP", "opponentName", "opponentHP"],
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
  .hp-bar {
    background-color: #d3fffd;
    height: 0.8rem;
  }
}
</styled>
