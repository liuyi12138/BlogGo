<div align="center">
  <img src="https://raw.githubusercontent.com/liuyi12138/BlogGo/master/build/icons/BlogGo.png" height="150" width="150">
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
![BlogGo](https://raw.githubusercontent.com/liuyi12138/picture/master/20200311195809.png)

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
    * YNOTE_PERS
    * YNOTE_SESS
    * YNOTE_LOGIN
    * CSTK
* 另外，由于cookie的时效性，每隔一段时间需要重新获取一次cookie
* github设置主要包括用户名、仓库名、分支、相对保存地址
* 相对保存地址为你的`_posts`文件夹与你的项目的相对位置，以我的博客地址为例
```
我的博客地址为：https://github.com/liuyi12138/liuyi12138.github.io
我的_posts文件夹的地址为liuyi12138.github.io/blog/source/_posts/
则相对保存地址为'\blog\source\_posts'
绝对保存地址为C:\Users\User\AppData\Roaming\BlogGo\liuyi12138.github.io\blog\source\_posts
```
* github信息与cookie设置好后点击`clone仓库到本地`按钮，耐心等待，你的github仓库将会被存放在`C:\Users\User\AppData\Roaming\BlogGo\`，clone仓库结束之后会自动跳转到你所指定的分支，并且会生成绝对保存地址
* 以上设置全部完成之后可到Blog页面点击获取Blog，BlogGo会调用接口将你的有道云笔记中的markdown文件全部下载到你的绝对保存地址
* 下载完成后点击更新Hexo即可上传，第一次下载完成后可能需要自行在下载的仓库配置Hexo环境（V1.01之后会自动npm install，一般情况下问题不大）

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

## TODO
**先行修复了一些bug，目前在我的机器上还是比较好用的，如果用的人超过5人的话我就把剩下的几个需求给做了**
**有使用的同志我们issue见**
* [×] Button状态管理Bug修复
* [√] alter大量Warning信息Bug修复
* [√] 增加log输出
* [×] 自定义保存地址
* [×] 自定义博客更新代码(可能可以适用于其他类型的博客)

## 鸣谢
**在此鸣谢几位为我的开发工作提供帮助的朋友**
* 感谢超哥提供的vue指导
* 感觉鸡哥提供的js指导
* 感谢滋滋宇做第一个吃螃蟹的人
* 感谢我的女朋友xx的陪伴与鼓励
