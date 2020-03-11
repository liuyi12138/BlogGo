<template>
    <div class="cookie-set">
        <div class="view-title">
          Cookie设置
        </div>
        <div class="cookie-set-form">
            <el-form label-width="100px" :model="Cookieform">
            <el-form-item label="YNOTE_PERS">
                <el-input v-model="Cookieform.YNOTE_PERS" clearable></el-input>
            </el-form-item>
            <el-form-item label="YNOTE_SESS">
                <el-input v-model="Cookieform.YNOTE_SESS" clearable></el-input>
            </el-form-item>
            <el-form-item label="YNOTE_LOGIN">
                <el-input v-model="Cookieform.YNOTE_LOGIN" clearable></el-input>
            </el-form-item>
            <el-form-item label="CSTK">
                <el-input v-model="Cookieform.CSTK" clearable></el-input>
            </el-form-item>
            </el-form>
        </div>
        <div class="cookie-button">
            <el-button type="primary" @click="saveCookie">保存Cookie到本地</el-button>
            <el-button type="primary" @click="deleteCookie">清除本地Cookie</el-button>
        </div>
    </div>
</template>


<script>
  const Store = require('electron-store')
  const store = new Store()

  export default {
    data () {
      let tempCookie = store.get('Cookieform')
      if (tempCookie) {
        this.Cookieform = tempCookie
      } else {
        this.Cookieform = {
          YNOTE_PERS: '',
          YNOTE_SESS: '',
          YNOTE_LOGIN: '',
          CSTK: ''
        }
      }
      return {
        Cookieform: this.Cookieform
      }
    },
    methods: {
      saveCookie () {
        store.set('Cookieform', this.Cookieform)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      },
      deleteCookie () {
        store.delete('Cookieform')
        this.Cookieform = {
          YNOTE_PERS: '',
          YNOTE_SESS: '',
          YNOTE_LOGIN: '',
          CSTK: ''
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    }
  }
</script>

<style>
.cookie-set{   
  width: 80%;
  text-align: center;
  margin-top: 6%
}

.view-title{
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
}

.cookie-set-form{
  width: 100%;
  align-items:left;
  justify-content: center;
}

.cookie-button{
  width: 100%;
  margin-top: 6%;
  text-align: center;
}
</style>