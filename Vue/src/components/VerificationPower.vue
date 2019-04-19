<script>
export default {
  props: {
    power: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      powers: this.power || this.$parent.power || []
    }
  },
  computed: {
    VerificationPower () {
      const { authority } = this.$store.state.user || {}
      if (!authority) {
        return false
      } else if (authority === -1) {
        return true
      } else if (!this.powers || !this.powers.length) {
        return true
      } else {
        let power = false
        for (let i of authority) {
          if (this.powers.indexOf(i) !== -1) {
            power = true
            break
          }
        }
        return power
      }
    }
  },
  render () {
    return this.VerificationPower ? this.$slots.default : null
  }
}
</script>
