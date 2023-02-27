<template>
  <div class="container__right">
    <div class="container__right--main">
      <profile-page />
    </div>
    <div class="container__right--rightmenu">
      <right-menu />
    </div>
  </div>
</template>

<script>
import ProfilePage from "./ProfilePage.vue";
import RightMenu from "./RightMenu.vue";
export default {
  components: {
    ProfilePage,
    RightMenu,
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
    width: 60%;
  }
  &--rightmenu {
    width: auto;
    border-left: 1px solid #eff3f9;
    margin-right: 20px;
    padding-left: 30px;
  }
  @media only screen and (max-width: 820px) {
    width: 90%;
    &--rightmenu {
      display: none;
    }
  }
}
</style>