<template>
  <div class="media w-50 mb-3" :class="{'ml-auto': sender !== message.user_id}">
    <Avatar :name="message.user" />
    <div class="media-body">
      <div class="bg-light rounded py-2 px-3 mb-2" :class="{'bg-primary': sender !== message.user_id, 'bg-light': sender === message.user_id}">
        <p class="text-small mb-0 text-muted">
          {{ message.msg }} {{ sender }} {{ message.user_id }}
        </p>
      </div>
      <p class="small text-muted">{{ message.timestamp }}</p>
    </div>
  </div>
</template>