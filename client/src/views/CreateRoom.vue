<template>
  <div class="container">
    <form @submit.prevent="createRoom">
      <div class="from-group">
        <label for="username">Room name: </label>
        <input
          type="text"
          id="roomName"
          v-model="state.roomName"
          class="form-control"
        />
      </div>
      <br>
      <button type="submit" class="btn btn-lg btn-block btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import {reactive} from 'vue';
import axios from 'axios';
export default {
    name: 'CreateRoom',
    setup(){
        const SERVER_URL =  process.env.VUE_APP_SERVER_URL;
        const roomName = '';
        const state = reactive({
            roomName
        });

        const createRoom = () => {
            axios.post(`${SERVER_URL}/api/room/create`, {
                roomName: state.roomName
            })
            .then(() => {
                alert('created');
            })
            .catch(()=>{
            })
        }

        return{
            createRoom,
            state
        }
    }
}
</script>