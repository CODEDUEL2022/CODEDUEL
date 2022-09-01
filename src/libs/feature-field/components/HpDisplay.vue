<template>
  <div class="wrapper">
    <div class="display">
      <div class="circle you"></div>
      <div class="content">
        <div class="text">
          <div class="your">{{ yourName }}</div>
          <div class="your">HP：{{ yourHP }}</div>
        </div>
        <div class="progress-bar you"></div>
      </div>
    </div>
    <div class="display">
      <div class="circle you"></div>
      <div class="content">
        <div class="text">
          <div class="opponent">{{ opponentName }}</div>
          <div class="opponent">HP：{{ opponentHP }}</div>
        </div>
        <div class="progress-bar opponent"></div>
      </div>
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
