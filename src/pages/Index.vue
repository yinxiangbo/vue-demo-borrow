<template>
<div>
    <a-list item-layout="horizontal" :data-source="users">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://www.antdv.com/">{{index}}:{{ item.userName }}-{{item.userId}}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</div>
</template>

<script>
import { mapState } from 'vuex'
import account from '../api/account'
export default {
   name: 'index',
   data: function () {
       return {
            users1: []
     }
   },
   methods: {
      getUsers () {
          account.getUserList().then(res => {
              this.users1 = res.data
          })
      }
   },
   computed: mapState({
     users: state => state.users.all
   }),
   created () {
      this.$store.dispatch('users/getAllUsers')
   }
}
</script>

<style>

</style>
