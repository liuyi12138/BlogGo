<template>
  <div>
    <div class="my-department-main-contain-col">
      <div class="my-department-main-contain-row">
        <LeftBar class="LeftBar"/>
        <div class="main-router-view">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from '@/components/LeftBar'

export default {
  name: 'Page',
  components: {
    LeftBar: LeftBar
  },
  data () {
    return {}
  }
}
</script>

<style>
body{
  margin:0px;
  height: 1rem;
}
.my-department-main-contain-col{
  display: flex;
  /* margin-left: 3rem; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.my-department-main-contain-row{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.LeftBar {
  display: flex;
  width: 20%;
}
.main-router-view {
  display: flex;
  position: relative;
  width:100%;
}
</style>