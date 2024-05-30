<template>
  <AirplaneForm :id="$route.params.id" />
</template>

<script>
import AirplaneForm from "@/components/AirplaneForm.vue";

export default {
  name: "EditAirplane",
  components: {
    AirplaneForm,
  },
};
</script>
