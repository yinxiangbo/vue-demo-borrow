<template>
  <div>
    <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="formInline.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formInline.user === '' || formInline.password === ''">
       登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import account from '../api/account'
import authToken from '../utils/authToken'
export default {
  name: 'Login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit (e) {
      account.login({
          'username': this.formInline.user,
          'password': this.formInline.password
        }).then(res => {
         if (res && res.data && res.data.success) {
            var result = res.data.data
            authToken.setAccessToken(result.accessToken)
            authToken.setRefreshToken(result.refreshToken)
            this.redirectToIndex()
         }
      })
    },
    redirectToIndex () {
      this.$router.push({path: '/index'})
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
