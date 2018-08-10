# 抖腿么

## 说明

啥也别说了，Everybody，跟着节奏，抖起来。

(感谢这款源码 [https://codepen.io/noeldelgado/pen/EaNjBy](https://codepen.io/noeldelgado/pen/EaNjBy))

💃 [在线演示](https://doutui.me/)
📦 [源码下载 - Gitee](https://gitee.com/maicong/doutuime/releases)
📦 [源码下载 - Github](https://github.com/maicong/doutuime/releases)

## 使用

### 目录说明

`dist`: 构建后的目录

`src`: 源文件目录

`music`: 抖腿歌曲目录

### 配置信息

编辑 `config.json` 进行相关配置

> 添加新的音乐，需要先将音乐文件放入 music 目录，再讲音乐文件名放入 musicList

```javascript
{
  "musicCDN": "", // music 目录所在的 CDN 地址
  "musicList": [] // 歌曲列表
}

```

### 命令说明

```bash
# 安装依赖
yarn install

# 开发调试
yarn run dev

# 构建成品
yarn run build

# 打包文件
yarn run zip
```

### 协议

MIT License

Copyright (c) 2018 MaiCong
