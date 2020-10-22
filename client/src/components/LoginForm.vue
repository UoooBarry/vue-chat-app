<template>
  <div class="container">
    <form @submit.prevent="login">
      <div class="from-group">
        <label for="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="userState.username"
          class="form-control"
        />
      </div>
      <div class="from-group">
        <label for="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="userState.password"
          class="form-control"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-lg btn-block btn-dark">Login</button>
    </form>
  </div>
</template>

<script>
import useUsers from "@/store/auth";
export default {
  name: "LoginForm",
  setup() {
    const { userState, login } = useUsers();

    return {
      userState,
      login,
    };
  },
};
</script>