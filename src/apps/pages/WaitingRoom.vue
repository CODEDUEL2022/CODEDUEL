<template>
  <div class="wrapper">
    <div class="back-btn" @click="handleLeave()">
      <span>＜ Home</span>
    </div>
    <div>
      <div class="message">
        <div>Looking for an opponent</div>
        <div class="pulse-container">
          <div class="pulse-bubble pulse-bubble-1"></div>
          <div class="pulse-bubble pulse-bubble-2"></div>
          <div class="pulse-bubble pulse-bubble-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  title: "CODE DUEL",
  name: "WaitingRoom",
  data() {
    return {
      socket: io("code-duel.onrender.com/"),
    };
  },
  methods: {
    handleLeave: function () {
      const searchParams = new URLSearchParams(window.location.search);
      let playerId = searchParams.get("id");
      this.socket.emit("LeaveWaitingRoom", playerId);
      this.$router.push({
        name: "home",
      });
    },
  },
  mounted() {
    window.addEventListener("popstate", (e) => {
      this.handleLeave();
    });

    const searchParams = new URLSearchParams(window.location.search);
    const playerId = searchParams.get("id");
    const playerName = searchParams.get("playerName");
    const decId = searchParams.get("dec");
    let anotherThis = this;
    this.socket.on("FullRoom", function (roomId, playerId1, playerId2) {
      function logIn() {
        anotherThis.socket.emit("login", roomId);
        anotherThis.$axios
          .post("/playerData", {
            RoomId: roomId,
            playerId: playerId,
            playerName: playerName,
            decId: 0, //仮においている。本来はデッキ選択用
          })
          .then((res) => {
            //res.dataがRoomにいる人数ここで場合分けすればOK
            console.log(res.data);
          });
        //デッキを自作する機能を実装。
        //decIdにカードのidをリストとして入れれば成功するように設計
        anotherThis.$axios
          .post("/dec", {
            playerId: playerId,
            decIdList: decId,
          })
          .then((res) => {
            console.log(res.data);
          });
        anotherThis.$router.push({
          name: "field",
          query: { room: roomId, id: playerId },
        });
      }
      if (playerId == playerId1) {
        logIn();
      }
      if (playerId == playerId2) {
        setTimeout(logIn, 1000);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 1rem;
  height: 100vh;
  .back-btn {
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    width: fit-content;
    text-align: left;
    @keyframes neon {
      0% {
        text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
      }
      100% {
        text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 0px #d3fffd;
      }
    }
    animation: neon 2s infinite alternate;

    &:hover {
      background-color: #2d909e;
      cursor: pointer;
    }
  }

  .message {
    margin: auto;
    height: 80vh;
    vertical-align: middle;
    justify-content: center;
    font-size: 3rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    @keyframes neon {
      0% {
        text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
      }
      100% {
        text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 0px #d3fffd;
      }
    }
    animation: neon 2s infinite alternate;
    .pulse-container {
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
    }

    .pulse-bubble {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #d3fffd;
    }
    .pulse-bubble-1 {
      animation: pulse 0.4s ease 0s infinite alternate;
    }
    .pulse-bubble-2 {
      animation: pulse 0.4s ease 0.2s infinite alternate;
    }
    .pulse-bubble-3 {
      animation: pulse 0.4s ease 0.4s infinite alternate;
    }
    @keyframes pulse {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0.25;
        transform: scale(0.75);
      }
    }
  }
}
</style>
