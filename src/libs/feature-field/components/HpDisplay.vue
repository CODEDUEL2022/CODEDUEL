<template>
  <!-- <div class="container">
    <h4 class="text">HP</h4>
    <h2 class="text">自分：{{ yourHp }}</h2>
    <h4 class="text">相手：{{ opponentHp }}</h4>
  </div> -->
  <div class="container">
    <div class="display">
      <div class="circle you"></div>
      <div>
        <div class="text">
          <div class="your">you</div>
          <div class="your">HP：{{ yourHp }}</div>
        </div>
        <div class="progress-bar you">progress bar..</div>
      </div>
    </div>
    <div class="display">
      <div class="circle opponent"></div>
      <div>
        <div class="text">
          <div class="opponent">opponent</div>
          <div class="opponent">HP：{{ opponentHp }}</div>
        </div>
        <div class="progress-bar opponent">progress bar..</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HpDisplay",
  props: ["yourHp", "opponentHp"],
};
</script>

<style scoped>
.container {
  margin: 1rem;
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

.text {
  display: flex;
  justify-content: space-between;
}

.your {
  font-size: 20px;
}

.opponent {
  font-size: 16px;
}

.progress-bar {
  margin: 0.5rem 0;
  width: 200px;
  height: 25px;
  background-color: aquamarine;
}
</style>
