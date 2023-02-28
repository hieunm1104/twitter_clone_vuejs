<template>
  <div class="profile">
    <div class="profile__header">
      <span>{{ name }}</span>
    </div>
    <div class="profile__body">
      <div class="profile__body--imgbackground">
        <img
          src="https://pbs.twimg.com/profile_banners/992063356545548289/1635495388/1500x500"
          alt=""
        />
      </div>
      <div class="profile__body--imgavatar">
        <div class="avatar">
          <img :src="photoURL" alt="" />
          <span>{{ name }}</span>
        </div>
        <a-button type="primary" @click="showModal"> Edit Profile </a-button>
        <a-modal
          v-model="visible"
          title="Basic Modal"
          @ok="handleOk"
          :footer="false"
          class="modal"
        >
          <div class="changeinfo__body">
            <div class="changeinfo__body--avatar">
              <img :src="photoURL" alt="" />
              <div class="label-avatar">
                <input type="file" name="upload" @change="changeAvatar" />
              </div>
            </div>
            <div class="changeinfo__body--input">
              <a-input type="text" placeholder="Name..." v-model="name" />
              <a-input
                type="text"
                placeholder="Tell me about yourself..."
                v-model="aboutMe"
              />
              <a-button @click="uploadAvatar">Save</a-button>
            </div>
          </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/services/firebase";
import Vue from "vue";
export default {
  data() {
    return {
      visible: false,
      firebaseDocId: localStorage.getItem("FirebaseDocumentId"),
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      aboutMe: localStorage.getItem("description"),
      photoURL: localStorage.getItem("photoURL"),
      newPhoto: null,
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    changeAvatar(event) {
      if (event.target.files && event.target.files[0]) {
        const fileType = event.target.files[0].type.toString();
        if (fileType.indexOf("image") != 0) {
          Vue.toasted.show("Pls choose an image").goAway(1500);
          return;
        }
        this.newPhoto = event.target.files[0];
        this.photoURL = URL.createObjectURL(event.target.files[0]); // gán URL mới của ảnh vào photoURl
      } else {
        Vue.toasted.show("Error!").goAway(1500);
      }
    },
    uploadAvatar() {
      if (this.newPhoto) {
        const upload = firebase
          .storage()
          .ref()
          .child(this.id)
          .put(this.newPhoto);
        console.log("Upload thanh cong");
        //we need download url
        const test = upload.on(
          "state_changed",
          null,
          (err) => {
            console.log("error", err.message);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then((url) => {
              console.log(url);
              this.updateUserInfo(true, url);
            });
          }
        );
        console.log(test);
      } else {
        // if user only wants to update his/her name and desc
        this.updateUserInfo(false, null);
      }
    },
    updateUserInfo(isUrlPresent, downloadURL) {
      let newInfo = {};
      if (isUrlPresent) {
        newInfo = {
          name: this.name,
          description: this.aboutMe,
          URL: downloadURL,
        };
      } else {
        newInfo = {
          name: this.name,
          description: this.aboutMe,
        };
      }
      firebase
        .firestore()
        .collection("users")
        .doc(this.firebaseDocId)
        .update(newInfo)
        .then(() => {
          localStorage.setItem("name", this.name);
          localStorage.setItem("description", this.aboutMe);
          Vue.toasted.show("Profile updated").goAway(1500);
          this.$router.push("/profile");
          if (isUrlPresent) {
            localStorage.setItem("photoURL", downloadURL);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  width: 100%;
  &__header {
    background-color: white;
    position: fixed;
    top: 0;
    border-bottom: 1px solid #eff3f9;
    padding: 15px 20px;
    width: 46.6%;
    span {
      font-size: 20px;
      font-weight: 800;
      color: #0f1419;
      line-height: 24px;
    }
  }
  &__body {
    margin-top: 56px;
    position: relative;
    &--imgavatar {
      width: 628px;
      height: 209px;
      display: flex;
      justify-content: space-between;
      .avatar {
        img {
          width: 134px;
          height: 134px;
          object-fit: cover;
          border-radius: 50%;
          position: absolute;
          left: 30px;
          transform: translateY(-50%);
          box-shadow: #000000 0px 0px 2px 0px;
          border: 5px solid white;
          &:hover {
            cursor: pointer;
          }
        }
        span {
          position: relative;
          top: 80px;
          left: 30px;
          display: inline;
          color: #0f1419;
          font-weight: 800;
          line-height: 24px;
          font-size: 20px;
        }
      }
      button {
        border-radius: 20px;
        background-color: #cfd9de;
        color: #0f1419;
        font-size: 15px;
        font-weight: 700;
        line-height: 24px;
        border: 1px solid #cfd9de;
      }
    }
  }
}
</style>