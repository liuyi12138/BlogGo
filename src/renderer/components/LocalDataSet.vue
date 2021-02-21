<template>
    <div class="local-set">
        <div class="view-title">
          本地仓库设置
        </div>
        <div class="local-set-form">
            <el-form label-width="100px" :model="localDataform">
            <el-form-item label="博客存储地址">
                <el-input v-model="localDataform.localPath" clearable ></el-input>
            </el-form-item>
            <el-form-item label="指令执行地址">
                <el-input v-model="localDataform.cmdPath" clearable></el-input>
            </el-form-item>
            <el-form-item label="博客上传指令">
                <el-input type="textarea" rows="4" v-model="localDataform.cmd"></el-input>
            </el-form-item>
            </el-form>
        </div>
        <div class="local-button">
            <el-button type="primary" @click="saveData">保存信息</el-button>
            <el-button type="primary" @click="deleteData">清除信息</el-button>
        </div>
    </div>
</template>


<script>
  // import { remote } from 'electron'
  // const exec = require('child_process').exec
  const Store = require('electron-store')
  const store = new Store()

  export default {
    data () {
      let tempform = store.get('localDataform')
      if (tempform) {
        this.localDataform = tempform
      } else {
        this.localDataform = {
          localPath: '',
          cmdPath: '',
          cmd: 'hexo clean \nhexo g \nhexo d'
        }
      }
      return {
        buttonStatus: false,
        localDataform: this.localDataform
      }
    },
    methods: {
      saveData () {
        store.set('localDataform', this.localDataform)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      },
      deleteData () {
        store.delete('localDataform')
        this.localDataform = {
          localPath: '',
          cmdPath: '',
          cmd: 'hexo clean \nhexo g \nhexo d'
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
.local-set{   
  width: 80%;
  text-align: center;
  margin-top: 6%
}

.view-title{
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
}

.local-set-form{
  width: 100%;
  align-items:left;
  justify-content: center;
}

.local-button{
  width: 100%;
  margin-top: 6%;
  text-align: center;
}
</style>