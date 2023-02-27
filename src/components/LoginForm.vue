<template>
  <div class="login-form">
    <a-modal v-model="visible" :footer="null" @ok="handleOk" :closable="true">
      <div class="modal">
        <div class="login">
          <div class="login__header">
            <div class="login__header--logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                alt="twitter"
              />
            </div>
          </div>
          <div class="login__body">
            <div class="login__body--login"><span>Login in Twitter</span></div>
            <div class="login__body--input">
              <input type="email" placeholder="Email..." v-model="email" />
              <input
                type="password"
                placeholder="Password..."
                v-model="password"
              />
              <button @keyup.enter="login()" @click="login()" class="btn-login">
                <span>Login</span>
              </button>
              <div class="signup">
                <span>Do not have an account?</span>
                <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import firebase from "@/services/firebase";
import Vue from "vue";
export default {
  data() {
    return {
      visible: true,
      email: "",
      password: "",
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
    login() {
      const auth = firebase.auth();
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          if (res.user) {
            console.log("res.user.uid", res.user.uid);
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  console.log("userdata", userData);
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.name);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("photoURL", userData.URL);
                  localStorage.setItem("description", userData.description);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                  console.log("da vao toi day");
                });
              });
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log("sai");
          var errorCode = err.code;
          var errormessage = err.message;
          Vue.toasted.show(errorCode).goAway(1500);
          Vue.toasted.show(errormessage).goAway(1500);
        });
    },
  },
  created() {
    if (localStorage.getItem("id")) this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 370px;
    width: 600px;
    height: 550px;
    background-color: #ffffff;
    border-radius: 15px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0px 16px;
      &--logo {
        width: 30px;
      }
      &--esc {
        i {
          font-size: 20px;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background-color: #eee;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
    &__body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      margin: 70px 128px;
      padding: 0px 32px 48px;
      min-height: 100vh;
      &--login {
        margin-bottom: 20px;
        span {
          display: inline;
          color: #0f1419;
          font-weight: 700;
          font-size: 31px;
          line-height: 36px;
        }
      }
      &--input {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        input {
          width: 298px;
          height: 56px;
          border: 1px solid #eff3f9;
          color: #536471;
          font-size: 17px;
          line-height: 24px;
          padding: 16px 8px;
          margin: 15px 0px;
          &:focus {
            border: 2px solid #1d9bf0;
            background-color: #fff;
            box-shadow: #1d9bf0;
            outline: 0;
          }
        }
        .btn-login {
          align-items: stretch;
          background-color: #0f1419;
          border-color: #000000;
          border-radius: 9999px;
          border-style: solid;
          border-width: 1px;
          font-size: 15px;
          margin: 12px 0px;
          padding: 0px 16px;
          width: 300px;
          height: 36px;
          transition: 0.3s;
          &:hover {
            cursor: pointer;
            border-color: rgba(0, 0, 0, 0);
            background-color: rgb(39, 44, 48);
          }
          span {
            color: #ffffff;
            display: inline;
            font-size: 15px;
            font-weight: 700;
            line-height: 20px;
            text-align: center;
          }
        }
        .signup {
          margin-top: 30px;
          display: flex;
          justify-content: flex-start;
          a {
            text-decoration: none;
            margin-left: 10px;
            color: #1d9bf0;
            display: inline;
            font-size: 15px;
            line-height: 20px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
.login-form {
}
</style>
