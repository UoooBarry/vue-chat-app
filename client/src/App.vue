<template>
  <div>
    <NavBar />
    <br>
    <router-view />
  </div>
</template>


<script>
import NavBar from '@/components/layouts/navbar'
export default {
  name: 'App', 
  components:{
    NavBar
  }
}

</script>
