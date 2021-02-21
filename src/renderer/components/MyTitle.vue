<template>
  <div id="mytitle">
  <el-row>
    <el-col :span="8" :offset="8">
      <div class="view-title">
        {{name}}
      </div>
    </el-col>
    <el-col :span="8">
      <div class="titlebtn">
        <el-button type="text" size="medium" icon="el-icon-minus" circle @click="winmin" style="-webkit-app-region: no-drag"></el-button>
        <el-button type="text" size="medium" icon="el-icon-full-screen" circle @click="winmax" style="-webkit-app-region: no-drag"></el-button>
        <el-button type="text" size="medium" icon="el-icon-close" circle @click="winclose" style="-webkit-app-region: no-drag"></el-button>
    </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  const {remote} = require('electron')
  export default {
    data () {
      return {
        name: 'BlogGo-1.0.2'
      }
    },
    methods: {
      winmin () {
        const window = remote.BrowserWindow.getFocusedWindow()
        window.minimize()
      },
      winmax () {
        const window = remote.BrowserWindow.getFocusedWindow()
        if (window.isMaximized()) {
          window.restore()
        } else {
          window.maximize()
        }
      },
      winclose () {
        const window = remote.BrowserWindow.getFocusedWindow()
        window.close()
      }
    }
  }
</script>
    
<style>
#mytitle {
    position: left;
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
}
.titlebtn{
  width: 100%;
  height: 30px;
  text-align: right;
}

.view-title{
  text-align: center;
}
</style>