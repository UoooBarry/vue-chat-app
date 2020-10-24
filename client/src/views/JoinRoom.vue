<template>
  <div>
    <h1 style="text-align: center">Room list</h1>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">RoomName</th>
          <th scope="col">People</th>
          <th scope="col">Join</th>
        </tr>
      </thead>
      <tbody v-for="room in state.rooms" v-bind:key="room._id">
        <tr>
          <th scope="row">{{ room._id }}</th>
          <td>{{ room.roomName }}</td>
           <td>{{ room.currentUser.length }}</td>
          <td>
            <router-link
              class="btn btn-dark"
              :to="{ name: 'Room', params: { id: room._id } }"
              >Join</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "JoinRooms",
  setup() {
    const SERVER_URL =  process.env.VUE_APP_SERVER_URL;
    const state = reactive({
      rooms: [],
    });
    axios.get(`${SERVER_URL}/api/room/`).then((res) => {
      state.rooms = res.data.rooms;
    });

    return {
      state,
    };
  },
};
</script>