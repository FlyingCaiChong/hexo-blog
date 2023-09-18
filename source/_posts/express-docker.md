---
title: 把Express项目Docker化
date: 2023-09-18 16:39:37
tags:
  - docker
  - express
---

## 创建 Dockerfile 文件

在 `express` 项目的目录下, 新建 `dockerfile` 文件, 命名为 `Dockerfile`

```sh
touch Dockerfile
```

编辑`Dockerfile`文件:

<!-- more -->

```dockerfile
# 从哪个镜像进行构建, 由于我的服务器上docker拉取的node镜像是latest版本的, 这里指定node:latest
FROM node:latest
# 在镜像中创建一个文件夹存放应用程序代码, 这里是应用程序的工作目录
WORKDIR /usr/src/app
# 拷贝package.json文件
COPY package*.json ./
# 安装依赖
RUN npm install
# 绑定应用程序
COPY . .
# 应用程序绑定的端口是3001, 使用EXPOSE命令使它与docker镜像做映射
EXPOSE 3001
# 启动服务器
CMD ["node", "app.js"]
```

## 创建.dockerignore 文件

在`Dockerfile`的同一个文件夹中创建一个`.dockerignore`文件, 添加以下内容:

```
node_modules
npm-debug.log
```

## 构建镜像

进入`Dockerfile`所在的目录, 运行以下命令构建`Docker`镜像.

```sh
docker build . -t <your username>/node-web-app
```

## 运行镜像

用以下命令运行镜像

```sh
docker run -p 3001:3001 -d <your username>/node-web-app
```

> `-d`: 指容器在后台自助运行
> `-p`: 指容器的端口映射

查看应用程序是否运行成功

```sh
# 查看容器id
docker ps
# 查看容器日志
docker logs <container id>
```

## 使用 Nginx 反向代理

### 查看服务容器对应的 ip

输入以下指令查看:

```sh
docker inspect <container id> | grep IPAddress
```

查看到结果:

```json
 "IPAddress": "172.17.0.3",
```

### 修改 nginx 的配置.

增加一条规则将 `/api/{path}`转到目标服务的`/{path}`:

```
  location /api/ {
      proxy_pass http://172.17.0.3:3001/;
  }
```

### 重启 nginx

```sh
docker restart <nginx id>
```

---

参考文档:

- [把一个 Node.js web 应用程序给 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp)
