<template>
  <RentalForm :id="$route.params.id" />
</template>

<script>
import RentalForm from "@/components/RentalForm.vue";

export default {
  name: "RentAirplane",
  components: {
    RentalForm,
  },
};
</script>
