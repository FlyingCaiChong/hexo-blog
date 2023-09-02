---
title: Hexo 使用
date: 2023-09-01 22:09:52
categories:
  - 其它技术
tags:
  - hexo
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

## 添加分类

### 生成分类页

```sh
hexo new page categories
```

创建完成后会在`source`目录下生成 `categories/index.md` 文件.

```yml
---
title: categories
date: 2023-09-02 15:36:39
---
```

### 添加 type 属性

在`categories/index.md`文件中`date`下面添加`type`属性

```yml
---
title: categories
date: 2023-09-02 15:36:39
type: "categories"
---
```

### 将文章添加到分类

打开想要分类的文章, 添加`categories`属性

```yml
---
title: Hexo 使用
date: 2023-09-01 22:09:52
categories:
  - 其它技术
---
```

### 打开分类配置

在`_config.next.yml`中打开分类配置

```yml
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  # tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

## 添加标签

### 生成标签页

```sh
hexo new page tags
```

创建完成后会在`source`目录下生成 `tags/index.md`文件

```yml
title: tags
date: 2023-09-02 15:50:52
```

### 添加 type 属性

在`tags/index.md`文件中`date`下面添加`type`属性

```yml
title: tags
date: 2023-09-02 15:50:52
type: "tags"
```

### 给文章设置标签

打开想要设置标签的文章, 添加`tags`属性

```yml
---
title: Hexo 使用
date: 2023-09-01 22:09:52
categories:
  - 其它技术
tags:
  - hexo
---
```

### 打开标签配置

在`_config.next.yml`中打开标签配置

```yml
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

## 添加关于

### 生成关于页面

```sh
hexo new page about
```

创建完成后会在`source`目录下生成`about/index.md`文件

```yml
---
title: about
date: 2023-09-02 16:04:00
---
```

可以 index.md 文件里添加关于的内容信息.

### 打开关于配置

```yml
menu:
  home: / || fa fa-home
  about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```
