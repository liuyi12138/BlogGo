<template>
    <div class="blog-page">
        <div class="view-title">
          MyBlog
        </div>
        <div class="blog-table">
            <template>
            <el-table
                :data="tableData"
                height="400px"
                border
                style="width: 100%">
                <el-table-column
                prop="time"
                label="修改时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="size"
                label="文件大小(Kb)"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="文件名">
                </el-table-column>
            </el-table>
            </template>
        </div>
        <el-button type="primary" @click="getBlog">获取Blog</el-button>
    </div>
</template>

<script>
  import { getBooks } from 'blog.js'
  const Store = require('electron-store')
  const store = new Store()

  export default {
    data () {
      let blogData = store.get('blogData')
      if (!blogData) this.blogData = []
      return {
        tableData: this.blogData
      }
    }
  }
</script>


<style>
.blog-page{   
  width: 90%;
  text-align: left;
  margin-top: 2%
}

.view-title{
  text-align: center;
}

.blog-table{
  width: 100%;
  align-items:left;
  justify-content: center;
}
</style>