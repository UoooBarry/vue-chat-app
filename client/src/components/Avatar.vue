<template>
  <div class="rounded-circle round-avatar">
    <div class="container character">
      <a :title="name" > {{state.firstCharacter}} </a>
    </div>
  </div>
</template>

<script>
import {reactive,computed} from 'vue';
export default {
  name: "Avatar",
  props: ["name"],
  setup(props){ 
      const state = reactive({
        firstCharacter: computed(() => props.name.charAt(0))
      })

      return{
          state
      }
  }
};
</script>

<style lang='scss' scoped>
.round-avatar {
  position: relative;
 top: -5px;
  width: 50px;
  height: 50px;
  padding: 1px;
  margin: 5px ;
  background-color: orange;
}
.character a{
  color: white;
  font-size: 28px;
  cursor: pointer;
}
</style>