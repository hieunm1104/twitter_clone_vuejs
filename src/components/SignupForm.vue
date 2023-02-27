<template>
  <div class="signup-form">
    <a-modal v-model="visible" :footer="null" @ok="handleOk" :closable="true">
      <div class="modal">
        <div class="signup">
          <div class="signup__header">
            <div class="signup__header--logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                alt="twitter"
              />
            </div>
          </div>
          <div class="signup__body">
            <div class="signup__body--signup">
              <span>Join in Twitter</span>
            </div>
            <div class="signup__body--input">
              <input type="text" placeholder="Your name..." v-model="name" />
              <input type="email" placeholder="Email..." v-model="email" />
              <input
                type="password"
                placeholder="Password..."
                v-model="password"
              />
              <button @click="signup" class="btn-signup">
                <span>Create Account</span>
              </button>
              <div class="login">
                <span>You are have account?</span>
                <a href="/login">Login</a>
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
      name: "",
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
    signup() {
      const auth = firebase.auth();
      const name = this.name;
      const email = this.email;
      const password = this.password;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log("res", res);
          await firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: res.user.uid,
              email,
              password,
              URL: "",
              description: "",
            })
            .then((ref) => {
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("FirebaseDocumentId", ref.id);
              this.name = "";
              this.email = "";
              this.password = "";
              this.$router.push("/login");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          let errorCode = err.code;
          let errormessage = err.message;
          if (errorCode == "auth/weak-password") {
            Vue.toasted.show("Password too").goAway(1500);
          } else {
            Vue.toasted.show(errormessage).goAway(1500);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  .signup {
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
      &--signup {
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
        .btn-signup {
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
        .login {
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
          span {
            font-size: 15px;
          }
        }
      }
    }
  }
}
.signup-form {
}
</style>
