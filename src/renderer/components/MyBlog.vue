<template>
    <div class="blog-page">
        <div class="view-title">
          {{BlogTitle}}
        </div>
        <div class="blog-table">
            <template>
            <el-table
                :data="tableData"
                height="400px"
                border
                style="width: 100%">
                <el-table-column
                prop="modifyTime"
                label="修改时间"
                width="160">
                </el-table-column>
                <el-table-column
                prop="folder"
                label="所属文件夹"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="文件名">
                </el-table-column>
                <el-table-column
                prop="fileSize"
                label="文件大小"
                width="80">
                </el-table-column>
            </el-table>
            </template>
        </div>
        <div class="blog-button">
          <el-button type="primary" @click="getBlog" :disabled="buttonStatus">获取Blog</el-button>
          <el-button type="primary" @click="uploadToHexo" :disabled="buttonStatus">更新Hexo</el-button>
        </div>
    </div>
</template>

<script>
  import { getAllFolders, getAllNotes, getNoteContent, writeContent } from '@/components/blog.js'
  import { remote } from 'electron'
  const Store = require('electron-store')
  const store = new Store()
  const exec = require('child_process').exec

  export default {
    data () {
      let blogData = store.get('blogData')
      if (!blogData) this.blogData = []
      else this.blogData = blogData
      return {
        BlogTitle: 'MyBlog(' + this.blogData.length + ')',
        tableData: this.blogData,
        buttonStatus: false
      }
    },
    methods: {
      async getBlog () {
        let path = store.get('githubform').allPath
        let cookie = store.get('Cookieform')
        if (!cookie) {
          this.$message({
            message: 'Cookie不存在',
            type: 'error'
          })
          return false
        }
        if (!path) {
          this.$message({
            message: 'Path不存在',
            type: 'error'
          })
          return false
        }
        // 获取文件夹
        this.buttonStatus = true
        this.$message({
          message: '正在获取文件夹数目',
          type: 'warning'
        })
        let folders = await getAllFolders('/', cookie)
        this.$message({
          message: '获取到' + folders.length + '个文件夹，开始遍历文件夹',
          type: 'success'
        })
        console.log(folders.length)
        // 获取文件
        this.tableData = []
        for (let i = 0; i < folders.length; ++i) {
          this.BlogTitle = 'MyBlog(' + this.tableData.length + ')'
          let tempNotes = await getAllNotes(folders[i], cookie)
          this.tableData = this.tableData.concat(tempNotes)
        }
        this.tableData = this.tableData.sort(function (a, b) { return b['timeForSort'] - a['timeForSort'] })
        store.set('blogData', this.tableData)
        this.$message({
          message: '获取到' + this.tableData.length + '个markdown文件，开始写入',
          type: 'success'
        })
        // 获取文件内容及写入
        let Notes = this.tableData
        let writeRes = true
        for (let i = 0; i < Notes.length; ++i) {
          this.BlogTitle = 'MyBlog(' + i + '/' + this.tableData.length + ')'
          let content = await getNoteContent(Notes[i], cookie)
          writeRes = await writeContent(content, path + '\\' + Notes[i].name)
          if (writeRes !== true) {
            this.$message({
              message: 'No such File Or Directory',
              type: 'error'
            })
            break
          }
        }
        this.BlogTitle = 'MyBlog(' + this.tableData.length + ')'
        if (writeRes === true) {
          this.$message({
            message: '全部文档写入成功',
            type: 'success'
          })
        }
        this.buttonStatus = false
      },
      async uploadToHexo () {
        console.log('begin uploadToHexo')
        let path = store.get('githubform').allPath
        if (!path) {
          this.$message({
            message: 'Path不存在',
            type: 'error'
          })
          return false
        }
        var that = this
        this.buttonStatus = true
        that.$message({
          message: '正在执行更新程序',
          type: 'warning'
        })
        let cmdStr = 'cd.. && cd .. && npm install && hexo clean && hexo g && hexo d'
        let workerProcess = exec(cmdStr, {cwd: path})
        let ErrorRes = ''
        let lastErrorRes = ''
        let OutRes = ''
        let lastOutRes = ''

        workerProcess.stderr.on('data', function (data) {
          ErrorRes += data
          lastErrorRes = data
        })
  
        workerProcess.stdout.on('data', function (data) {
          OutRes += data
          lastOutRes = data
        })
  
        workerProcess.on('close', function (code) {
          that.buttonStatus = false
          let alertData = ''
          alertData += '<strong> Last Error(Warning):</strong> <br>' + lastErrorRes + '<br>'
          alertData += '<strong> Last Stdout:</strong> <br>' + lastOutRes + '<br>'
          alertData += '<i>if you want know more, you can find more information in log</i> <br>'
          alertData += '<strong>the log path:</strong> <br>' + remote.app.getPath('userData') + '\\StdError.log(StdOut.log)'
          that.$alert(alertData, '执行输出', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定'
          })
          writeContent(ErrorRes, remote.app.getPath('userData') + '\\StdError.log')
          writeContent(OutRes, remote.app.getPath('userData') + '\\StdOut.log')
        })
      }
    }
  }
</script>


<style>
.blog-page{   
  width: 90%;
  text-align: left;
  margin-top: 2%;
}

.view-title{
  text-align: center;
}

.blog-table{
  width: 100%;
  align-items:left;
  justify-content: center;
}

.blog-button{
  width: 100%;
  margin-top: 2%;
  text-align: center;
}
</style>