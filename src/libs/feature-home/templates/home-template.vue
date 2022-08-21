<template>
  <v-container>
    <Header />
    <v-row class="home-container">
      <v-col cols="8">
        <div>>　Program Card Battle</div>
        <div>>>>>>>>>>>>>>>>>>>>></div>
        <br />
        <div class="a neon_title">><span>CODE DUEL</span></div>
        <div>></div>
        <div>></div>
        <div>></div>
        <div class="input">
          >　<span>ルームIDを入力してください：</span
          ><input v-model="roomId" placeholder="" /><v-btn
            outlined
            @click="$emit('handleSendId', roomId)"
            class="btn play"
            >このルームで遊ぶ</v-btn
          >
        </div>
        <div>
          ><v-btn outlined @click="$emit('handleSetIssue')" class="btn"
            >ルームIDを発行</v-btn
          >
        </div>
      </v-col>
      <v-col cols="4" class="start">
        <v-btn outlined class="btn big" @click="$emit('handleStart')">
          <span>start</span></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Header from "/src/libs/layout/Header.vue";

export default {
  name: "HomeTemplate",
  components: {
    Header,
  },
  props: ["roomId"],
};
</script>
<style scoped>
.home-container {
  padding-top: 10rem;
}
.typing span {
  display: flex;
  width: fit-content;
  text-align: top;
  margin-right: 0;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.05em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3.5s steps(30), blink-caret 1s;
}
.a {
  font-size: 75px;
  font-weight: 200;
  width: fit-content;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.05em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: title-typing 3.5s steps(30), title-blink-caret 1s;
}

.btn {
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  text-decoration-color: transparent;
  margin: 1rem;
  justify-content: center;
  box-shadow: 0 0 0.75rem #d3fffd;
}
.btn.play {
  margin: 0 1rem;
}
.btn.big {
  width: 250px;
  height: 75px;
  margin: 1rem;
  justify-content: center;
  font-size: 28px;
  text-decoration: none;
}

.start {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.btn.big span {
  color: #ffffff;
  text-decoration: none;
  text-decoration-color: transparent;
}

.input {
  display: flex;
}

.input input {
  color: #fff;
  border: 1px solid #fff;
}

.neon_title span {
  animation: neon_blink 2s infinite alternate;
}

@keyframes neon_blink {
  0% {
    text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
  }
  100% {
    text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 40px #d3fffd;
  }
}

@keyframes title-typing {
  from {
    width: 0;
  }
  to {
    width: 480px;
  }
}
/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 240px;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: #ffffff;
  }
  50% {
    border-color: #ffffff;
  }
}
@keyframes title-blink-caret {
  from,
  to {
    border-color: #ffffff;
  }
  50% {
    border-color: #ffffff;
  }
}
</style>
