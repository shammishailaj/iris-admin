<template lang="pug">
  section(
    v-if='true'
  ) 
    VerificationPower
      | {{`home`}}
    p is home
</template>

<script>
export default {
  data () {
    return {
      power: [1]
    }
  }
}
</script>
