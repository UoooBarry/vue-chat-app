<template>
   <!-- Typing area -->
      <form @submit.prevent="sendMessage" class="bg-light">
        <div class="input-group">
          <input type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light" v-model="state.msg" required>
          <div class="input-group-append">
            <button type="submit" class="btn btn-link"><i class="fa fa-paper-plane"></i></button>
          </div>
        </div>
      </form>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "ChatForm",
  props: ["socket"],
  setup(props) {
    const state = reactive({
      msg: "",
    });

    const sendMessage = () => {
      props.socket.emit("chatMessage", state.msg); //emit send message to server
      state.msg = "";
    };

    return {
      state,
      sendMessage,
    };
  },
};
</script>
