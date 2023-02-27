<template>
  <div class="headerpost">
    <div class="header">
      <span>Home</span>
    </div>
    <div class="status">
      <div class="status__avatar">
        <img :src="photoURLCurrentUser" alt="" />
      </div>
      <div class="status__content">
        <div class="status__content--input">
          <input
            type="text"
            placeholder="What do you think?"
            v-model="data.content"
          />
        </div>
        <div class="status__content--control">
          <div class="instrument">
            <input
              type="text"
              placeholder="paste the file here"
              v-model="data.img"
            />
          </div>
          <button @click="createPost"><span>Tweet</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebase";
export default {
  data() {
    return {
      data: {},
      nameCurrentUser: localStorage.getItem("name"),
      photoURLCurrentUser: localStorage.getItem("photoURL"),
      user: {},
    };
  },
  methods: {
    sendData() {
      this.$emit("inputData", this.data);
      this.data = "";
    },
    async createPost() {
      console.log("user", this.user);
      let postCreate = {
        img: this.data.img,
        content: this.data.content,
        userid: this.user.id,
        useravatar: this.user.URL,
        username: this.user.name,
        createdAt: new Date(),
      };
      if (!postCreate.img) {
        delete postCreate.img;
      }
      console.log({
        img: this.data.img,
        content: this.data.content,
        userid: this.user.id,
        useravatar: this.user.URL,
      });
      if (this.data.content) {
        const querySnapshot = await firebase
          .firestore()
          .collection("post")
          .add(postCreate);

        if (querySnapshot) {
          this.data.img = "";
          this.data.content = "";
          this.getPost();
        }
      }
    },
    async getUser() {
      let id = localStorage.getItem("id");
      if (id) {
        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (id === doc.data().id) {
                this.user = doc.data();
              }
            });
          });
      }
    },
  },
  async mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss">
.headerpost {
  display: flex;
  flex-direction: column;
  width: 100%;
  .header {
    background-color: white;
    position: fixed;
    top: 0;
    padding: 15px 20px;
    max-width: 620px;
    width: 71%;
    span {
      font-size: 20px;
      font-weight: 800;
      color: #0f1419;
      line-height: 24px;
    }
  }
  .status {
    display: flex;
    padding: 20px 0 20px 20px;
    border-top: 1px solid #eff3f9;
    border-bottom: 1px solid #eff3f9;
    margin-top: 54px;
    &__avatar {
      width: 60px;
      height: 60px;
      img {
        border-radius: 50%;
        width: 50px;
        object-fit: cover;
        height: 50px;
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      margin-left: 10px;
      &--input {
        display: flex;
        padding: 20px;
        input {
          flex: 1;
          width: 200px;
          height: 50px;
          border: 0;
          outline: 0;
          font-size: 20px;
        }
      }
      &--control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .instrument {
          color: #8ecdf8;
          width: 50px;
          i {
            font-size: 30px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        button {
          width: 119px;
          height: 36px;
          background-color: #1890ff;
          border-radius: 9999px;
          border: 1px solid #8ecdf8;
          margin-right: 20px;
          span {
            color: white;
            font-weight: 700;
            line-height: 20px;
            font-size: 15px;
            padding: 0 16px;
            text-align: center;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    &__content {
      &--control {
      }
    }
  }
}
</style>