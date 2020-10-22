<template>
  <div class='container'>
    <div class="chat-messages">
      <div v-for="(message, index) of chat.messages" v-bind:key="index">
        <Message :message='message' />
      </div>
    </div>

    <ChatForm :socket="socket" />
  </div>
</template>


<script>
import useUsers from "@/store/auth";
import ChatForm from "@/components/ChatForm";
import Message from '@/components/Message'
import io from "socket.io-client";
import { reactive, onMounted } from "vue";
export default {
  name: "Room",
  components: {
    ChatForm,
    Message
  },
  setup() {
    const { is_logged_in, user_token } = useUsers();
    const socket = io("http://localhost:3001/");
    socket.on("connect", () => {
      socket
        .emit("authenticate", { token: user_token.value })
        .on("authenticated", () => {
        })
        .on("unauthorized", (msg) => {
          throw new Error(msg.data.type);
        });
    });

    let chatMessages;
    onMounted(() => {
      chatMessages = document.querySelector(".chat-messages");
    });
    const chat = reactive({
      messages: [],
    });

    socket.on("message", (message) => {
      chat.messages.push(message);

      //Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    return {
      socket,
      chat,
      is_logged_in,
    };
  },
};
</script>

<style scoped>
.chat-messages{
  height: 600px;
  background-color: rgb(241, 242, 243);
  border: 0.5px rgba(0, 0, 0, 0.459) solid;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
}
</style>