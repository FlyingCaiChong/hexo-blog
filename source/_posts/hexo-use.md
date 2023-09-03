---
title: 记录使用Hexo搭建个人博客的过程
date: 2023-09-01 22:09:52
categories:
  - 其它技术
tags:
  - hexo
---

## 安装 hexo

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

创建完项目后, 包括以下文件:

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

## 运行项目

```sh
npx hexo server # 局部创建使用npx
```

<!-- more -->

## 安装[hexo-next 主题](https://github.com/next-theme/hexo-theme-next)

### 方式 1 使用 npm 安装

```sh
npm install hexo-theme-next
```

### 方式 2 使用 git 安装

```sh
git clone https://github.com/next-theme/hexo-theme-next themes/next
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

注意: 修改`_config.yml`或者`_config.next.yml`配置文件后, 需要使用`hexo clean`清理一下再运行, 修改后的配置才会生效.

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

## [创建新文章](https://hexo.io/zh-cn/docs/writing.html)

```sh
hexo new post <title>
```

执行以上指令后, 会在 `source/_posts/`文件夹下生成`<title>.md`文件, 支持使用`markdown`语法来书写文章.

## 启动本地服务器预览

```sh
hexo server
# 或者
yarn server
```

默认情况下，访问网址为：`http://localhost:4000/`

## 生成静态文件

```sh
hexo generate
# 或者
yarn build
```

执行以上指令后, 会在 `public`文件夹下生成静态文件.

## 部署到个人服务器

将生成后的文件部署到个人服务器. 我使用的是个人阿里云轻量服务器, 在个人服务器操作过程如下:

### 安装 `Docker`

```sh
# 1. yum 包更新到最新
yum update
# 2. 安装需要的软件包, yum-util提供yum-config-manager功能, 另外两个是devicemapper驱动依赖的
yum install -y yum-utils device-mapper-persistent-data lvm2
# 3. 设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 4. 安装docker, 出现输入界面都按y
yum install -y docker-ce
# 5. 查看docker版本,
docker -v
# 6. 开启docker服务
service docker start
```

第四步报错:

```
  - Status code: 404 for https://download.docker.com/linux/centos/3/x86_64/stable/repodata/repomd.xml (IP: 13.32.50.112)
错误：为仓库 'docker-ce-stable' 下载元数据失败 : Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

[解决办法](https://forums.docker.com/t/docker-ce-stable-x86-64-repo-not-available-https-error-404-not-found-https-download-docker-com-linux-centos-7server-x86-64-stable-repodata-repomd-xml/98965/4):
修改 /etc/yum.repos.d/docker-ce.repo

```sh
vi /etc/yum.repos.d/docker-ce.repo
```

把`docker-ce-stable`的`baseurl`改为:

```
https://download.docker.com/linux/centos/7/$basearch/stable
```

在执行安装 `docker` 命令

```sh
yum install -y docker-ce
```

#### 启动 docker 服务

```sh
systemctl start docker
```

#### 开机启动 docker 服务

```sh
systemctl enable docker
```

### 下载 `Nginx` 镜像

```sh
docker pull nginx
```

### 创建 `Nginx` 容器, 设置端口映射, 并使用数据卷挂载目录

```sh
 docker run -d --name mynginx \
 -p 80:80 \
 --mount type=bind,source=/root/mynginx/conf/nginx.conf,target=/etc/nginx/nginx.conf \
 --mount type=bind,source=/root/mynginx/conf/http-8080.conf,target=/etc/nginx/conf.d/http-8080.conf \
 --mount type=bind,source=/root/mynginx/logs,target=/var/log/nginx/logs \
 --mount type=bind,source=/root/mynginx/html,target=/usr/share/nginx/html \
 nginx
```

### 配置 `Nginx`

### 重启 `Nginx`

```sh
docker restart mynginx
```

---

参考文档:
[hexo 官方英文文档](https://hexo.io/docs/)
[hexo 官方中文文档](https://hexo.io/zh-cn/docs/)
[hexo-next 文档](https://theme-next.js.org/pisces/docs/getting-started/)
