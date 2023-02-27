<template>
  <div class="navbar">
    <ul class="navbar__list">
      <a class="link" href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
          alt="twitter"
      /></a>
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
  img {
    width: 30px;
    height: 30px;
    margin: 5px 20px 30px 12px;
  }
  i {
    font-size: 20px;
    width: 26px;
    height: 26px;
  }
  &__list {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &--item {
      list-style: none;
      margin-bottom: 20px;
      border-radius: #9999;
      padding: 12px;
      &:hover {
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
  @media only screen and (max-width: 820px) {
    &__list {
      align-items: center;
      .link {
        img {
          margin: 5px 20px 30px 0;
        }
      }
      &--item {
        .link {
          span {
            display: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
  }
}
</style>