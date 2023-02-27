<template>
  <div class="chatbox-wrapper">
    <div class="chatbox">
      <div class="chatbox__info">
        <img :src="currentPeerUser.URL" alt="" />
        <div>
          <span>{{ currentPeerUser.name }}</span>
        </div>
      </div>
      <div class="chatbox__messages" v-if="!loading">
        <a-button @click="loadMore" v-if="listMessage.length != totalMessages"
          >Load more...</a-button
        >
        <div
          class="chatbox__messages--box"
          v-for="(item, index) in listMessage"
          :key="index"
        >
          <div :class="item.idFrom === currentUserId ? 'userto' : 'userfrom'">
            <span>{{ item.content }}</span>
            <div class="time">
              <p>{{ moment(item.createdAt).format("DD:MM:yy hh:mm:ss") }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="chatbox__messages" v-if="loading">
        <a-spin></a-spin>
      </div>
      <div ref="bottom" style="width: 40px; height: 40px"></div>
      <div class="chatbox__input">
        <div class="chatbox__input--emoij">
          <i class="fa-solid fa-image"></i>
        </div>
        <div class="chatbox__input--input">
          <input
            type="text"
            placeholder="New messages"
            v-model="inputValue"
            @keyup.enter="sendMessage(inputValue)"
          />
        </div>
        <div class="chatbox__input--send">
          <i
            class="fa-regular fa-paper-plane"
            @click="sendMessage(inputValue)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/services/firebase";
import moment from "moment";
export default {
  app: "ChatboxForm",
  props: ["currentPeerUser"],
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      inputValue: "",
      photoURL: localStorage.getItem("photoURL"),
      listMessage: [],
      groupChatId: null,
      limitNumber: 10,
      moment,
      loading: true,
      isScrollToBottom: false,
      totalMessages: 0,
    };
  },
  watch: {
    currentPeerUser: {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`;
          console.log("group chat", groupChatId);
          await firebase
            .firestore()
            .collection("Messages")
            .doc(groupChatId)
            .collection(groupChatId)
            .get()
            .then((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                this.groupChatId = groupChatId;
              } else {
                this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`;
              }
            });
          console.log(this.groupChatId);
          this.limitNumber = 10;
          await this.getMessages();
        }
      },
      deep: true,
      immediate: true,
    },
    listMessage: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          firebase
            .firestore()
            .collection("Messages")
            .doc(this.groupChatId)
            .collection(this.groupChatId)
            .get()
            .then((res) => {
              this.totalMessages = res.size;
            });
        }
        if (newVal && newVal.length > 0 && this.isScrollToBottom) {
          let el = this.$refs.bottom;
          console.log("el", el.getBoundingClientRect()?.top);
          if (el) {
            // Use el.scrollIntoView() to instantly scroll to the element
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    loadMore() {
      this.isScrollToBottom = false;
      this.limitNumber += 10;
      this.getMessages();
    },
    sendMessage(content) {
      if (content.trim() === "") {
        return;
      }
      const timestamp = moment().valueOf().toString();
      const message = {
        id: timestamp,
        idFrom: this.currentUserId,
        idTo: this.currentPeerUser.id,
        timestamp: timestamp,
        content: content.trim(),
        createdAt: new Date(),
      };
      this.inputValue = "";
      firebase
        .firestore()
        .collection("Messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(message);
      this.isScrollToBottom = true;

      this.listMessage.push(message);
    },
    getMessages() {
      console.log("call coming");
      this.loading = true;
      this.listMessage = [];
      firebase
        .firestore()
        .collection("Messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .orderBy("createdAt", "desc")
        .limit(this.limitNumber)
        .onSnapshot((querySnapshot) => {
          console.log("querySnapshot", querySnapshot);
          let listMessage = [];
          querySnapshot.forEach((doc) => {
            listMessage.push({
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate(),
            });
          });
          this.listMessage = listMessage.reverse();
          this.loading = false;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.isScrollToBottom = true;
    this.getMessages();
  },
};
</script>

<style lang="scss" scoped>
.chatbox-wrapper {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  margin-right: 30px;
  .chatbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &__input {
      width: 574px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #eff3f4;
      margin: 0px 12px;
      border-radius: 16px;
      position: fixed;
      bottom: 0;
      &--emoij {
        margin-left: 50px;
      }
      &--input {
        width: 70%;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-left: 20px;
        margin-right: 20px;
        input {
          border: none;
          outline: none;
          background-color: #eff3f4;
          width: 100%;
        }
      }
      &--send {
        margin-right: 30px;
        i {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 10px;
      padding-top: 20px;
      padding-bottom: 50px;
      border-bottom: 1px solid #eff3f9;
      min-width: 100%;
      align-items: center;
      justify-content: space-around;
      &:hover {
        background-color: #f8fafa;
      }
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
    &__messages {
      width: 100%;
      display: flex;
      flex-direction: column;
      button {
        display: flex;
        margin: 0 auto;
        align-items: center;
      }
      &--box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .userfrom {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          padding: 0px 20px;
          margin: 0 0 30px 0;
          span {
            text-align: left;
            background-color: #eff3f4;
            border-radius: 20px;
            border-bottom-left-radius: 5px;
            padding: 10px;
            word-wrap: break-word;
          }
          p {
            font-family: inherit;
            color: #536471;
            font-size: 13px;
          }
        }
        .userto {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          flex-direction: column;
          padding: 0px 20px;
          margin-bottom: 30px;
          span {
            text-align: center;
            background-color: #1d9bf0;
            border-radius: 20px;
            border-bottom-right-radius: 5px;
            padding: 10px;
            word-wrap: break-word;
            color: white;
          }
          p {
            font-family: inherit;
            color: #536471;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>