<template>
    <v-btn @click="useCards" class="btn action" v-if="attack_decision">発動</v-btn>
    <p v-else>発動可能なカードを選択してください</p>
</template>

<script>
export default {
    props: [
        'selectedData',
        'comboData'
    ],
    computed: {
        //発動できるかどうかを判定する
        attack_decision: function () {
        let updatedData = this.selectedData.map((obj) => obj.id);
        updatedData.sort(function (first, second) {
            if (first > second) {
            return 1;
            } else if (first < second) {
            return -1;
            } else {
            return 0;
            }
        });
        // 一致してるものがあるかを判定
        const isIncludes = (arr, target) =>
            arr.every((el) => target.includes(el));
        if (updatedData.length === 0) {
            return false;
        } else if (updatedData.length === 1) {
            this.cardValue.value = this.selectedData[0].value;
            return true;
        } else {
            let ableCombo = this.comboData.filter((comboData) => {
            return isIncludes(updatedData, comboData.id_list);
            });
            // 完全一致した攻撃だけを返す
            for (let i = 0, n = updatedData.length; i < n; ++i) {
            if (ableCombo.length == 0) {
                return false;
            } else if (
                updatedData[i] == ableCombo[0].id_list[i] &&
                updatedData.length == ableCombo[0].id_list.length
            ) {
                return true;
            } else {
                return false;
            }
            }
        }
        },
    }
}

</script>

<style scoped>
.btn {
  margin-right: 1rem;
  width: 100px;
}

.btn.action {
  color: #102335;
  border: 1px solid #d3fffd;
  box-shadow: 0px 0px 20px #d3fffd;
}
</style>