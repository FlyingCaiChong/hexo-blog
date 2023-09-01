---
title: Hexo 使用
date: 2023-09-01 22:09:52
tags:
---

## 安装

### 全局安装

```sh
npm install -g hexo-cli
```

### 局部安装

```sh
npm install hexo
```

## 创建项目

```sh
hexo init <folder>
cd <folder>
npm install
```

创建完项目后, 包括以下文件

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## 运行

```sh
npx hexo server # 局部创建使用npx
```

## 安装[hexo-next 主题](https://github.com/next-theme/hexo-theme-next)

### 方式 1 使用 npm 安装

```sh
$ cd hexo-site
$ npm install hexo-theme-next
```

### 方式 2 使用 git 安装

```sh
$ cd hexo-site
$ git clone https://github.com/next-theme/hexo-theme-next themes/next
```

### 修改主题

修改`_config.yml`文件中的:

```yml
theme: next
```

### 使用[本地配置](https://theme-next.js.org/docs/getting-started/configuration)

1. 在项目目录下创建文件`_config.next.yml`
2. 把依赖配置内容拷贝到`_config.next.yml`:
   ```sh
   # 使用 npm 安装
   cp node_modules/hexo-theme-next/_config.yml _config.next.yml
   # 使用 Git 安装
   cp themes/next/_config.yml _config.next.yml
   ```

### 清理缓存后重新运行调试

```sh
npx hexo clean && npx hexo s
```

## 添加 Local Search 本地搜索

### 安装插件 hexo-generator-searchdb

```sh
npm install hexo-generator-searchdb --save
```

### 修改 \_config.yml 配置文件

在末尾添加

```yml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

### 修改 \_config.next.yml 配置文件

```yml
local_search:
  enable: true
```

## 增加文章字数统计和阅读时长

### 安装插件 hexo-word-counter

```sh
npm install hexo-word-counter --save
```

### 修改 \_config.yml 配置文件

在末尾添加

```yml
# 增加文章字数统计及阅读时长功能
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
  exclude_codeblock: false
  wpm: 275
  suffix: "mins."
```

## 修改语言为中文

修改`_config.yml`文件

```yml
language: zh-CN # zh-CN 对应 themes/next/languages/zh-CN.yml
```