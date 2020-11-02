<template>
<div>
    <!-- If is the sender -->
    <div class="media mb-3 message" v-if="sender !== message.user_id">
        <Avatar :name="message.user" />
        <div class="media-body">
            <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">
                    {{ message.msg }}
                </p>
            </div>
            <p class="small text-muted">{{ message.timestamp }}</p>
        </div>
    </div>
    <!-- If not the  sender -->
    <div v-else>
        <!-- Reciever Message-->
        <div class="media ml-auto mb-3 message">
            <div class="media-body">
                <div class="bg-primary rounded py-2 px-3 mb-2">
                    <p class="text-small mb-0 text-white">
                        {{ message.msg }}
                    </p>
                </div>
                <p class="small text-muted">{{ message.timestamp }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
    name: "Message",
    props: ["message", "sender"],
    components: {
        Avatar,
    },
};
</script>

<style scoped>
.message {

    width: max-content !important;
}

.chat-message {
    margin: 10px;
}

.timestamp {
    padding: 5px;
    font-size: 12px;
    color: gray;
}
</style>
