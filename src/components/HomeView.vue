<template>
  <div class="container__right">
    <div class="container__right--main">
      <header-post />
      <HomePage />
    </div>
    <div class="container__right--rightmenu">
      <right-menu />
    </div>
  </div>
</template>

<script>
import HomePage from "./HomePage.vue";
import RightMenu from "./RightMenu.vue";
import HeaderPost from "./HeaderPost.vue";
export default {
  components: {
    HomePage,
    RightMenu,
    HeaderPost,
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    if (localStorage.getItem("id") == null) this.$router.push("/login");
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
  &--rightmenu {
    border-left: 1px solid #eff3f4;
    padding: 20px;
  }
  @media only screen and (max-width: 1024px) {
    /* For tablets: */
    width: 90%;
    &--rightmenu {
      display: none;
    }
    &--main {
      width: 90%;
      border-right: 1px solid #eff3f4;
    }
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>