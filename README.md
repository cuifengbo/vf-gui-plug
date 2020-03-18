## 调试

1. 安装 vs code 

2. 安装 vs code 插件 Live Server (也可以安装其他http服务软件)

3. 项目目录执行 npm i

4. packages 目录中建立相关 ts 文件 , 参考 testButton 示例

3. 修改或添加 ./config/base.js 中 entry 为所需要编译的文件

3. 执行 npm run dev 开启监听

4. 修改 index.html 中 importScript 路径为当前修改示例路径。

5. vs code 中，选择 index.html 右键，选择 open with Live Server 启动服务

6. 愉快的调试吧

## 发布

npm run prod

## vf使用

资源中，添加相关的js路径，name为类名，type类型为js

组件中，可以初始化插件，type为name类名

```
"assets": {
        "id":{
            "name": "TestButton",
            "type": "js",
            "url": "http://www.xxxx.com/TestButton.js"
        },
}

"components": {
    "id": {
        "name": "xxxx",
        "type": "TestButton",
        "text": "11111"
    },
}
```