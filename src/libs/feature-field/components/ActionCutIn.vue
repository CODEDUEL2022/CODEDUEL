<template>
    <div v-show="showOponent" class="overlay" @click="$emit('closeOponent')">
        <div>
          <v-card height="475px" width="400px" class="black">
            <v-img src="../../ui/assets/cards/Angular.png"></v-img>
          </v-card>
        </div>
        <div class="dalayEffect">
          {{ effect }} {{ value }} pt
        </div>
    </div>
</template>
<script>
export default {
    name: "ActionCutIn",
    data(){
        return {}
    }
}
</script>
<style scoped>
.overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 1;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>