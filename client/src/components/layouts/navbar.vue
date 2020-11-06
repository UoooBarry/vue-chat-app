<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/#/">Seed Chat</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#nav"
      aria-controls="nav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav mr-auto" v-if="!is_logged_in">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{ active: getActive('Register') }"
            to="/register/"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{ active: getActive('Login') }"
            to="/login/"
            >Login</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav mr-auto" v-else>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{ active: getActive('Room') }"
            to="/rooms/"
            >Rooms</router-link
          >
        </li>
         <li class="nav-item">
          <a href="#" class="nav-link" @click="logout">Log out</a>
        </li>
      </ul>
      <router-link v-if="is_logged_in" class="btn btn-warning my-2 my-sm-0" to="/rooms/create/">Create a room</router-link>
    </div>
  </nav>
</template>

<script>
import useUsers  from "@/store/auth";
export default {
  name: "NavBar",
  setup() {
    const {is_logged_in, logout} = useUsers();
    return {
      logout,
      is_logged_in,
    };
  },
  methods: {
    getActive(expected) {
      if (expected == this.$route.name) return true;
      return false;
    },
  },
};
</script>

<style scoped>
.if {
  display: inline;
}
</style>