<template>
  <div class="container">
    <form @submit.prevent="register">
      <div class="from-group">
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          v-model="userState.username"
          class="form-control"
        />
      </div>
      <div class="from-group">
        <label for="password">Password: </label>
        <input
          type="password"
          id="password"
          v-model="userState.password"
          class="form-control"
        />
      </div>
      <div class="from-group">
        <label for="password">First name: </label>
        <input
          type="text"
          id="firstName"
          v-model="userState.firstName"
          class="form-control"
        />
      </div>
      <div class="from-group">
        <label for="password">Last name: </label>
        <input
          type="text"
          id="lastName"
          v-model="userState.lastName"
          class="form-control"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-lg btn-block btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import useUsers from "@/store/auth";
export default {
  name: "RegisterForm",
  setup() {
    const { register, userState } = useUsers();

    return {
      register,
      userState,
    };
  },
};
</script>
