<template>
    <div class="github-set">
        <div class="view-title">
          Github设置
        </div>
        <div class="github-set-form">
            <el-form label-width="100px" :model="githubform">
            <el-form-item label="用户名">
                <el-input v-model="githubform.username" clearable ></el-input>
            </el-form-item>
            <el-form-item label="仓库名">
                <el-input v-model="githubform.repo" clearable></el-input>
            </el-form-item>
            <el-form-item label="分支">
                <el-input v-model="githubform.master" clearable></el-input>
            </el-form-item>
            <el-form-item label="相对保存地址">
                <el-input v-model="githubform.path" clearable placeholder='\blog\source\_posts'></el-input>
            </el-form-item>
            <el-form-item label="绝对保存地址">
                <el-input v-model="githubform.allPath" :disabled="true"></el-input>
            </el-form-item>
            </el-form>
        </div>
        <div class="github-button">
            <el-button type="primary" @click="saveData">保存个人信息</el-button>
            <el-button type="primary" @click="deleteData">清除个人信息</el-button>
            <br><br>
            <el-button type="primary" @click="clone" :disabled="buttonStatus">clone仓库到本地</el-button>
            <el-button type="primary" @click="deleterepo" :disabled="buttonStatus">删除本地仓库</el-button>
        </div>
    </div>
</template>


<script>
  import { remote } from 'electron'
  const exec = require('child_process').exec
  const Store = require('electron-store')
  const store = new Store()

  export default {
    data () {
      let tempform = store.get('githubform')
      if (tempform) {
        this.githubform = tempform
      } else {
        this.githubform = {
          username: '',
          repo: '',
          master: '',
          path: '',
          allPath: ''
        }
      }
      return {
        buttonStatus: false,
        githubform: this.githubform
      }
    },
    methods: {
      saveData () {
        store.set('githubform', this.githubform)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      },
      deleteData () {
        store.delete('githubform')
        this.githubform = {
          username: '',
          repo: '',
          master: '',
          path: '',
          allPath: ''
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      },
      clone () {
        this.buttonStatus = true
        let cmdStr = 'git clone git@github.com:' + this.githubform.username + '/' + this.githubform.repo + '.git'
        let cmdStr1 = 'git checkout ' + this.githubform.master
        console.log(cmdStr)
        let workerProcess = exec(cmdStr, {cwd: remote.app.getPath('userData')})
        // 正在clone
        var that = this
        workerProcess.stderr.on('data', function (data) {
          that.$message({
            message: data,
            type: 'warning'
          })
        })

        workerProcess.on('close', function (code) {
          exec(cmdStr1, {cwd: remote.app.getPath('userData') + '\\' + that.githubform.repo})
          that.githubform.allPath = remote.app.getPath('userData') + '\\' + that.githubform.repo + that.githubform.path
          store.set('githubform', that.githubform)
          that.$message({
            message: 'clone success!',
            type: 'success'
          })
          that.buttonStatus = false
        })
      },
      deleterepo () {
        this.buttonStatus = true
        var that = this
        let cmdStr = 'rmdir /s/q ' + this.githubform.repo
        console.log(cmdStr)
        let workerProcess = exec(cmdStr, {cwd: remote.app.getPath('userData')})
        workerProcess.stderr.on('data', function (data) {
          console.log(data)
          that.$message({
            message: data,
            type: 'error'
          })
        })

        workerProcess.on('close', function (code) {
          that.$message({
            message: '删除成功',
            type: 'success'
          })
          that.buttonStatus = false
        })
      }
    }
  }
</script>

<style>
.github-set{   
  width: 80%;
  text-align: center;
  margin-top: 2%
}

.view-title{
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
}

.github-set-form{
  width: 100%;
  align-items:left;
  justify-content: center;
}

.github-button{
  width: 100%;
  margin-top: 6%;
  text-align: center;
}
</style>