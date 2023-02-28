<template>
  <div class="container__right">
    <div class="container__right--main">
      <MessagesForm @inputData="updateMessages" />
    </div>
    <div class="container__right--rightmenu" v-if="isHaveId">
      <right-messages :currentPeerUser="currentPeerUser" />
    </div>
    <div class="container__right--rightmenu" v-else>
      <h1>Choose from your existing chats</h1>
    </div>
  </div>
</template>

<script>
import MessagesForm from "./MessagesForm.vue";
import RightMessages from "./RightMessages.vue";
export default {
  components: {
    MessagesForm,
    RightMessages,
  },
  watch: {},
  data() {
    return {
      isHaveId: false,
      currentPeerUser: "",
    };
  },
  methods: {
    updateMessages(id) {
      this.currentPeerUser = id;
      this.isHaveId = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container__right {
  width: 80%;
  display: flex;
  &--main {
    width: 40%;
    height: 100vh;
    overflow-y: auto;
  }
  &--rightmenu {
    width: 60%;
    border-left: 1px solid #eff3f4;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: black;
      font-weight: bold;
      line-height: 50px;
      font-size: 40px;
      text-align: center;
    }
  }
  @media only screen and (max-width: 1005px) {
    width: 90%;
    &--main {
      width: 90%;
    }
    &--rightmenu {
      display: none;
    }
  }
  @media only screen and (max-width: 690px) {
    width: 100%;
    &--main {
      width: 100%;
    }
    &--rightmenu {
      display: none;
    }
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    position: relative;
    &--main {
      width: 100%;
    }
    &--rightmenu {
      position: fixed;
      top: 0;
      left: 0;
    }
  }
}
</style>