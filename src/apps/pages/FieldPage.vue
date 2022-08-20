<template>
  <FieldTemplate
    :message="message"
    :showCutIn="showCutIn"
    @closeActionCutIn="handleCloseCutIn()"
  />
</template>
<script>
import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";

export default {
  name: "field",
  components: {
    FieldTemplate,
  },
  data() {
    return {
      message: "相手が入室するまでしばらくお待ちください",
      showCutIn: "true",
    };
  },
  methods: {
    handleCloseCutIn: function () {
      this.showCutIn = false;
    },
  },
};
</script>
<style scoped></style>
