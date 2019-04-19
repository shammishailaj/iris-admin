import Axios from '@/plugin/axios'

export default {
  async getUser ({commit}, {user, pwd}) {
    const User = await Axios({
      method: 'POST',
      url: 'login',
      data: {user, pwd}
    })
    commit('update', {
      type: 'userInfo',
      message: User.data
    })
  }
}