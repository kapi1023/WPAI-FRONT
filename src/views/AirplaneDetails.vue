<template>
  <AirplaneDetails :id="$route.params.id" />
</template>

<script>
import AirplaneDetails from "@/components/AirplaneDetails.vue";

export default {
  name: "AirplaneDetails",
  components: {
    AirplaneDetails,
  },
};
</script>
