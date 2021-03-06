<template>
<div class="container chat-container">
    <div class="rounded-lg shadow row">
        <div class="col-sm-4 px-0">
            <UserPanel class="user-panel" :users="chat.room.currentUser" v-if="chat.room.currentUser" :roomName="chat.room.roomName" />
        </div>
        <div class="col-sm-8 px-0">
            <div class="chat-messages px-4 py-5 chat-box bg-dark">
                <div v-for="(message, index) of chat.messages" v-bind:key="index">
                    <Message :message="message" :sender="chat_user_id" />
                </div>
            </div>
            <ChatForm :socket="socket" />
        </div>
    </div>
</div>
</template>

<script>
import useUsers from "@/store/auth";
import ChatForm from "@/components/ChatForm";
import Message from "@/components/Message";
import UserPanel from "@/components/UserPanel";
import io from "socket.io-client";
import {
    reactive,
    onMounted
} from "vue";
import {
    useRoute
} from "vue-router";
export default {
    name: "Room",
    components: {
        ChatForm,
        Message,
        UserPanel,
    },
    setup() {
        const CHAT_URL = process.env.VUE_APP_CHAT_URL;
        const route = useRoute();
        const room_id = route.params.id;
        const chat = reactive({
            room: {},
            messages: [],
        });

        const {
            is_logged_in,
            user_token,
            chat_user_id
        } = useUsers();
        const socket = io(CHAT_URL);

        socket.on("connect", () => {
            socket
                .emit("authenticate", {
                    token: user_token.value
                })
                .on("authenticated", () => {
                    socket.emit("joinRoom", room_id);
                })
                .on("unauthorized", (msg) => {
                    throw new Error(msg.data.type);
                });
        });

        let chatMessages;
        onMounted(() => {
            chatMessages = document.querySelector(".chat-messages");
        });

        socket.on("message", (message) => {
            chat.messages.push(message);

            //Scroll down
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });

        socket.on("roomUpdate", (room) => {
            chat.room = room;
        });

        return {
            socket,
            chat,
            is_logged_in,
            chat_user_id
        };
    },
};
</script>

<style>
.chat-messages {
    height: 600px;
    background-color: rgb(241, 242, 243);
    overflow-y: scroll;
}

.chat-container {
    margin-top: 15px;
}

@media only screen and (max-width: 600px) {
    .chat-container {
        margin-top: 0;
    }

    .messages-box {
        display: none;
    }
}
</style>
