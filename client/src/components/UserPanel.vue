<template>
  <div class="bg-white">
    <div class="bg-gray px-4 py-2 bg-light">
      <p class="h5 mb-0 py-1">Topic {{ roomName }}</p>
    </div>

    <div class="messages-box" v-for="(user, index) in users" v-bind:key="index">
      <a
        href="#"
        class="list-group-item list-group-item-action list-group-item-light rounded-0"
      >
        <div class="media">
          <Avatar :name="user.firstName" v-if="user.firstName" />
          <div class="media-body ml-4">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <h6 class="mb-0">{{ user.firstName }}</h6>
              <small class="small font-weight-bold">Online</small>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  name: "UserPanel",
  props: ["users", "roomName"],
  components: {
    Avatar,
  },
};
</script>
