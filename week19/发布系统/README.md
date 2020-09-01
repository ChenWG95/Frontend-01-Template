# 发布系统

- 线上Server（对用户）：拥有模版（线上发布页面）

## Express

部署publish-server和server，最终通过publish-tool调用publish-server来最终调用服务server

1. 通过publish-server给server加文件
2. 通过http指定内容
3. publish工具访问publish-server，通过tool添加文件

服务的express文件夹要记得删除index.html

## 发布

1. 上传发布文件
2. 上传发布图片（流式）
3. 上传发布目录（多个上传） [archiver](https://www.npmjs.com/package/archiver)
4. 服务端解压上传的zip文件 [unzipper](https://www.npmjs.com/package/unzipper)

## 思路回顾

1. 由`publish-tool`发布上传至server的http请求至`publish-server`，此时进行读取流压缩上传
2. `publish-server`收到后，解压对应的压缩包，通过写入流把解压出来的对应资源上传至服务器
3. 最终服务器获得到对应的资源

## PhantomJS

无头浏览器，检查渲染结果

## Lint

检查js语法风格
