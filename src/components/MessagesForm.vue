<template>
  <div class="messages">
    <div class="messages__navbar">
      <div class="messages__navbar--left"><span>Messages</span></div>
      <div class="messages__navbar--right">
        <div><i class="fa-solid fa-gear"></i></div>
        <div><i class="fa-regular fa-envelope"></i></div>
      </div>
    </div>
    <div
      :class="`messages__user ${
        selectedId == item.id ? 'messages__user--selected' : ''
      } `"
      @click="letsChat(item)"
      v-for="item in searchUsers"
      :key="item.id"
      v-show="item.id != currentUserId"
    >
      <div class="messages__user--avatar">
        <img v-if="item.URL" :src="item.URL" alt="" />
        <img
          v-else
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>
      <div class="messages__user--info">
        <div class="username">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/services/firebase";

export default {
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentPeerUser: null,
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      searchUsers: [],
      photoURL: localStorage.getItem("photoURL"),
    };
  },
  computed: {
    selectedId() {
      let newVal = this.$route.query.id;
      if (newVal) {
        let currentPeerUser = {};
        currentPeerUser = this.searchUsers.find((user) => user.id === newVal);
        console.log("currentPeerUser", currentPeerUser);
        this.$emit("inputData", currentPeerUser);
        return newVal;
      }
      return "";
    },
  },
  methods: {
    onProfileClick() {
      this.$router.push("/profile");
    },
    letsChat(item) {
      let id = this.$route.query.id;
      if (id === item.id) return;
      this.currentPeerUser = item;
      this.$router.push(`/messages?id=${item.id}`);
    },
    async getUserList() {
      const result = await firebase.firestore().collection("users").get();
      if (result.docs.length > 0) {
        let listUsers = [];
        listUsers = [...result.docs];
        listUsers.forEach((item, index) => {
          this.searchUsers.push({
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            URL: item.data().URL,
            description: item.data().description,
          });
        });
      }
    },
  },
  created() {
    if (localStorage.getItem("id") == null) this.$router.push("/login");
    console.log("creadted");
    this.getUserList();
  },
};
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    &--left {
      width: 70%;
      span {
        font-weight: bold;
        font-size: 30px;
        color: #0f1419;
      }
    }
    &--right {
      display: flex;
      align-content: space-between;
      justify-content: flex-end;
      width: 30%;
      flex-wrap: wrap;
      i {
        margin-left: 20px;
      }
    }
  }
  &__user {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #eff3f4;
    }
    &--selected {
      background-color: #f2f5f6;
      border-right: 2px solid #1d9bf0;
      transition: all ease;
    }
    &--avatar {
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15px;
      .username {
        color: black;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
}
</style>