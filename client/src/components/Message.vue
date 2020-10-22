<template>
    <div class="card chat-message">
        {{message.user}}:
        <div class="card-body">
            {{message.msg}}
        </div>
        <a class="timestamp">{{message.timestamp}} </a>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: ['message']
}
</script>

<style scoped>
.chat-message{
    margin: 5px;
    padding: 5 px;
}
.timestamp{
    padding: 5px;
    font-size: 12px;
    color: gray;
}
</style>