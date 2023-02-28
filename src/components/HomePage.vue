<template>
  <div>
    <div class="post" v-for="(post, index) in listPost" :key="index">
      <div class="post__avatar">
        <img
          :src="
            post.useravatar ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          alt=""
        />
      </div>
      <div class="post__info">
        <span class="post__info--username"
          ><span>{{ post.username }}</span></span
        >
        <div class="post__info--content">
          <div class="title">
            {{ post.content }}
          </div>
          <div class="image" v-if="post.img">
            <img :src="post.img" alt="" />
          </div>
        </div>
        <!-- <div class="post__info--react" v-if="post.likeList">
         
        </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "../services/firebase";
export default {
  data() {
    return {
      listPost: [],
      data: {},
      inputComment: "",
      inputList: {},
      user: {},
    };
  },
  async mounted() {
    await firebase
      .firestore()
      .collection("post")
      .orderBy("createdAt", "desc")
      .limit(3)
      .onSnapshot((querySnapshot) => {
        let listPost = [];
        querySnapshot.forEach((doc) => {
          listPost.push(doc.data());
        });
        console.log("list post ", listPost);
        this.listPost = listPost;
      });
  },
  methods: {
    async commentClick(id) {
      if (this.inputList[id]) {
        let selectedPost = this.listPost.find((post) => post.id === id);
        if (selectedPost) {
          await firebase
            .firestore()
            .collection("post")
            .doc(selectedPost.id)
            .update({
              comments: [
                ...(selectedPost.comments != null
                  ? [...selectedPost.comments]
                  : []),
                {
                  username: this.user.name,
                  useravatar: this.user.URL,
                  userid: this.user.id,
                  comment: this.inputList[id],
                },
              ],
            })
            .then(() => {
              this.inputList[id] = "";
            });
        }
      }
    },
    async likeClick(id) {
      let selectedPost = this.listPost.find((post) => post.id === id);
      if (selectedPost) {
        let listLike = selectedPost.likeList ? selectedPost.likeList : [];
        if (
          listLike.findIndex((a) => {
            return a.userid === this.user.id;
          }) > -1
        ) {
          listLike = listLike.filter((a) => {
            a.userid != this.user.id;
          });
          console.log("th1", listLike);
        } else {
          listLike.push({
            userid: this.user.id,
            username: this.user.name,
            useravatar: this.user.URL,
          });
          console.log("th2", listLike);
        }
        await firebase
          .firestore()
          .collection("post")
          .doc(selectedPost.id)
          .update({ likeList: listLike })
          .then(() => {});
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
  created() {
    console.log("created");
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        this.$router.push("/login");
      }
    });
  },
};
</script>


<style lang="scss" scoped>
.post {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #eff3f9;
  &__info {
    span {
      color: black;
      font-size: 20px;
      font-weight: 700;
    }
    .image {
      margin-top: 15px;
      img {
        width: 382px;
        height: 510px;
        object-fit: cover;
        border-radius: 18px;
      }
    }
    &--username {
      span {
        color: #0f1419;
      }
    }
    &--react {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      .like {
        display: flex;
        background-color: red;
      }
    }
    &--content {
      .image {
        img {
          object-fit: cover;
          width: 400px;
          height: 500px;
        }
      }
    }
  }
  &__avatar {
    margin-right: 12px;
    img {
      border-radius: 50%;
      object-fit: cover;
      width: 60px;
      height: 60px;
    }
  }
  @media only screen and (max-width: 500px) {
  }
}
</style>