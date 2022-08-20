<template>
  <FieldTemplate :message="message" />
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
    };
  },
};
</script>
<style scoped></style>
