<template>
  <div class="container__right">
    <div class="container__right--main">
      <signup-form />
    </div>
  </div>
</template>

<script>
import SignupForm from "./SignupForm.vue";
export default {
  components: {
    SignupForm,
  },
};
</script>

<style lang="scss">
.container__right {
  width: 80%;
  display: flex;
  &--main {
    width: 70%;
  }
}
</style>