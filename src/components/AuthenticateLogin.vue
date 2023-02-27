<template>
  <div class="container__right">
    <div class="container__right--main">
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
.container__right {
  width: 80%;
  display: flex;
  &--main {
    width: 70%;
  }
}
</style>