<template>
  <div class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list--item">
        <a class="link" href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
            alt="twitter"
        /></a>
      </li>
      <li class="navbar__list--item">
        <a class="link" href="/"
          ><i class="fa-solid fa-house"></i><span>Home</span></a
        >
      </li>
      <li class="navbar__list--item">
        <a class="link" href="/messages"
          ><i class="fa-solid fa-envelope"></i><span>Messages</span></a
        >
      </li>
      <li class="navbar__list--item">
        <a class="link" href="/profile"
          ><i class="fa-solid fa-user"></i><span>Profile</span></a
        >
      </li>
      <li class="navbar__list--item">
        <a class="link" href="/login" @click="logout"
          ><i class="fa-solid fa-right-from-bracket"></i><span>Log out</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "../services/firebase";
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap");
.navbar {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  li {
    list-style: none;
  }
  img {
    width: 40px;
    height: 40px;
    margin: 5px 20px 30px 12px;
    text-align: center;
  }
  i {
    font-size: 20px;
    width: 26px;
    height: 26px;
    color: black;
  }
  &__list {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &--item:not(:first-child) {
      list-style: none;
      margin-bottom: 20px;
      border-radius: #9999;
      padding: 12px;
      &:hover:not(:first-child) {
        background-color: #e7e8e8;
        border-radius: 20px;
      }
      .link {
        text-decoration: none;
        span {
          font-weight: 700;
          font-size: 20px;
          color: #0f1419;
          text-align: center;
          line-height: 24px;
          padding: 8px;
          transition: 0.3s;
          border-radius: 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    &__list {
      align-items: center;
      padding: unset;
      &--item {
        padding: 12px 0px;
        .link {
          span {
            display: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    display: none;
  }
}
</style>