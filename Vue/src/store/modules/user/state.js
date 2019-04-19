let info = sessionStorage.getItem('users')
let token = null
info = info ? JSON.parse(info) : {
  authority: -1,
  token: '111.222.333'
}
token = info.token
delete info.token
export default {
  info,
  token
}