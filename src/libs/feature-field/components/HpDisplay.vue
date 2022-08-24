<template>
  <div class="wrapper">
    <div class="display">
      <div class="circle you"></div>
      <div class="content">
        <div class="text">
          <div class="your">{{ yourName }}</div>
          <div class="your">HP：{{ yourHp }}</div>
        </div>
        <div class="progress-bar you"></div>
      </div>
    </div>
    <div class="display">
      <div class="circle you"></div>
      <div class="content">
        <div class="text">
          <div class="opponent">{{ opponentName }}</div>
          <div class="opponent">HP：{{ opponentHp }}</div>
        </div>
        <div class="progress-bar opponent"></div>
      </div>
    </div>
  </div>
</template>
  <!-- <div class="container">
    <h4 class="text">HP</h4>
    <h2 class="text">自分：{{ yourHP }}</h2>
    <h4 class="text">相手：{{ opponentHP }}</h4>
  </div>


<script>
// HPの処理はバックエンドに移行するのでまだ書かない
export default {
  name: "HPDisplay",
  props: ["yourHP", "opponentHP"],
};
</script>

<style scoped>
.wrapper {
  margin: 1rem;
  width: fit-content;
}
.display {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.circle {
  content: "";
  margin-top: 0.5rem;
  margin-right: 1rem;
  background-color: azure;
  border-radius: 50%;
}
.circle.you {
  width: 40px;
  height: 40px;
}
.circle.opponent {
  width: 30px;
  height: 30px;
}

.content {
  min-width: 180px;
}

.text {
  display: flex;
  justify-content: space-between;
  font-style: italic;
  text-shadow: 0 0 13px #d3fffd;
}

.your {
  font-size: 20px;
}

.opponent {
  font-size: 15px;
}

.progress-bar {
  background-color: #1868838a;
  width: 180px;
}

.progress-bar.you {
  margin: 0.5rem 0;
  height: 20px;
}

.progress-bar.opponent {
  margin: 0.25rem 0;
  height: 16px;
}
</style>
