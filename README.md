<div align="center">
  <img src="https://gitee.com/know_the_emperor/picture/raw/master/pictures/20210221130908.png" height="150" width="150">

  <h1>BlogGo</h1>
  <blockquote>有道云笔记同步工具 </blockquote>
</div>

## 开发背景
本项目来自自己之前改编的一个脚本[ynote2hexo](https://github.com/liuyi12138/ynote2hexo),用以将有道云笔记中的Markdown文件同步到自己的Hexo博客。

此次开发所使用的的技术为Electron-vue，是看到[PicGo的开发笔记](https://molunerfinn.com/electron-vue-1/#%E5%89%8D%E8%A8%80)后开始学习，在四天的时间内完成了V1.0.0的开发，在此贴出[开发笔记](https://liuyi12138.github.io/2020/03/09/Electron-vue%E6%A1%8C%E9%9D%A2%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E5%AE%9E%E6%88%98/)以供参考。

由于我自己在这方面只是一个业余选手，对前端的开发并不算太了解，所以只能做一些基本功能，尽量满足自己的需求，也希望大家能多多提issue，我会尽力去完善这个工具。


## 应用概述
**BlogGo：一个用于同步有道云笔记到自己博客的工具**

## 应用界面
![BlogGo](https://gitee.com/know_the_emperor/picture/raw/master/pictures/20210221130958.png)

## 下载与安装
点击此处下载[应用](https://github.com/liuyi12138/BlogGo/releases)

目前只支持Windows用户，毕竟我现在手上只有Windows

使用该工具需要注意以下几点：
* 本机已配置好git环境，并且有可使用的ssh密钥
* 目前需要用户的Hexo文件夹已上传到github，可通过clone的方式下载

## 操作流程
* 安装好应用后需要进行github设置以及cookie设置
* cookie设置较为简单，用户需要登录Web版的有道云笔记获取到几个cookie(Chrome用户可以使用EditThisCookie插件，其他用户自行百度)
* 需要填写的cookie有：
    * YNOTE_PERS(已弃用)
    * YNOTE_SESS
    * YNOTE_LOGIN
    * CSTK
* 另外，由于cookie的时效性，每隔一段时间需要重新获取一次cookie
* 在本地仓库设置中设置好博客存储地址和指令执行地址以及博客上传指令

* 以上设置全部完成之后可到Blog页面点击获取Blog，BlogGo会调用接口将你的有道云笔记中的markdown文件全部下载到你的博客存储地址
* 下载完成后点击更新Hexo即可上传，会执行你设置的博客上传指令

## 已知Bug
**以下为V1.0.0中的已知bug和暂时的解决方案，希望使用者注意，在接下来的几个版本中我会逐步修复这些bug**

### Bug1
* 出现版本：V1.0.0
* 解决版本：None
* 现象描述：在点击按钮之后，若程序还未执行完成按钮会被暂时置为不可点击状态，此时切换页面后按钮会被重新置为可点击，若此时再次点击按键可能会出现一些未知错误。
* 暂时解决方案：别手欠，耐心等待一下，都会执行完的
* 新版本解决方案：由于对Button的status管理可能会造成其他问题，暂时就不修复了(况且这也不能算是一个bug吧应该)

### Bug2
* 出现版本：V1.0.0
* 解决版本：V1.0.1
* 现象描述：大部分操作是通过cmd来执行，使用alert来输出执行结果，但有时一些Warning会被当做error输出，例如在点击更新Hexo后BlogGo会调用cmd执行`"hexo clean && hexo g && hexo d"`，此时可能输出大量的Warning(在我的电脑是是100%出现)，但实际上Hexo已更新。
* 暂时解决方案：忍着，等我下个版本来FixBug
* 新版本解决方案：对输出进行弹窗以及输出到log文件如下
  ![Bug2Fix](https://raw.githubusercontent.com/liuyi12138/picture/master/20200312154604.png)

### Bug3
* 出现版本：V1.0.1
* 解决版本：None
* 现象描述：每次更新博客未清空_posts文件夹，导致如果有一篇博客改名就会生成两个不一样的文件
* 暂时解决方案：就手动删一下呗，反正改名这种操作又不是天天有
* 新版本解决方案：None
* 解决思路：1.每次更新前清空_posts目录 2.改用id来进行文件命名(不好搜索)


## TODO
**先行修复了一些bug，目前在我的机器上还是比较好用的，如果用的人超过5人的话我就把剩下的几个需求给做了**
**有使用的同志我们issue见**
* [√] 增加log输出
* [√] 自定义保存地址
* [√] 自定义博客更新代码(可能可以适用于其他类型的博客)

