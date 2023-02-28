<template>
  <div id="app">
    <div class="container">
      <div class="container__left">
        <left-menu />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu.vue";
import firebase from "@/services/firebase";
export default {
  name: "App",
  components: { LeftMenu },
  data() {
    return {
      id: localStorage.getItem("id"),
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/login");
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  font: message-box;
}
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}
body {
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.container {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}
.container__left {
  width: 20%;
  border-right: 1px solid #eff3f4;
  @media only screen and (max-width: 820px) {
    width: 10%;
  }
  @media only screen and (max-width: 500px) {
    width: unset;
  }
}
</style>