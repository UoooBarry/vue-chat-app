<template>
    <div>
       <a>{{error}}</a>
    </div>
</template>

<script>
export default {
    name: 'ErrorMessage',
    props: ['error']
}
</script>