<template>
  <div>
    <form @submit.prevent="sendMessage" class="form-inline">
      <div class="form-group row">
        <div class="col-sm-10">
          <input
            type="text"
            name="msg"
            class="form-control message-box"
            v-model="state.msg"
          />
        </div>
        <div class="col-sm-2">
          <input type="submit" value="send message" class="btn btn-dark" />
        </div>
      </div>
    </form>
  </div>
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

<style scoped>
.message-box {
  width: 100%;
}
</style>