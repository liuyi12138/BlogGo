<template>
<el-col :span="6">
    <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @select="handleSelect">
      <el-menu-item index="1" @click="redirect('blog-page')">
          <i class="el-icon-document"></i>
          <span slot="title">Blog</span>
      </el-menu-item>
      <el-menu-item index="2" @click="redirect('local-set')">
          <i class="el-icon-setting"></i>
          <span slot="title">本地仓库设置  </span>
      </el-menu-item>
      <el-menu-item index="3" @click="redirect('cookie-set')">
          <i class="el-icon-setting"></i>
          <span slot="title">Cookie设置</span>
      </el-menu-item>
    </el-menu>
</el-col>
</template>

<script>
  export default {
    methods: {
      redirect (pathname) {
        this.$router.push({name: pathname})
      },
      handleSelect (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style>

</style>