---
title: 记录使用阿里云轻量应用服务器并部署nodejs+express项目
date: 2023-09-07 14:55:43
tags:
  - server
---

> 背景: 使用 nodejs+express+mysql 在本地写的接口和数据库,只能本地调试访问, 如果想要外网访问, 需要部署到远程服务器上, 于是在阿里云平台花了 108 买了一年的轻量应用服务器. 没有部署过, 为了达到这个目标: nodejs+express 项目在服务器上部署运行, 连接服务器里的数据库, 在远程可以正常调用接口. 自己摸索着部署了一下.

## 在阿里云平台购买轻量应用服务器

<!-- more -->

1. 进入[阿里云平台](https://www.aliyun.com/?spm=5176.10173289.top-nav.dlogo.11322e770VC5ge)
2. 登录账号, 账号需要实名认证
3. 购买的产品 ![24843fa87c889f405eabb198257814ec.png](../images/aliyun-server-res/FEB1DEDE-A737-4713-BD84-32AAF99E1220.png)
4. 购买配置, 用的是系统镜像(Alibaba Clound Linux)![0272c5c5efbe3a713e8fcaa2cab94f02.png](../images/aliyun-server-res/E2863A55-75F7-4242-99C2-3AF7792A0972.png)
5. 购买完成后在轻量应用管理可以看到![a5ccb723c046ebd83dff22f77aade860.png](../images/aliyun-server-res/1E5521D7-A26F-4767-B79F-8E245EB2DA90.png)

## 连接远程服务器并部署项目环境

### 使用 FinalShell 连接

### 安装 node 环境

```sh
// 1. 下载最新稳定版的node包
wget https://nodejs.org/dist/v18.17.1/node-v18.17.1-linux-x64.tar.xz
// 2. 解压
tar xvf node-v18.17.1-linux-x64.tar.xz
// 3. 建立软连接
ln -s /root/node-v18.17.1-linux-x64/bin/node /usr/local/bin/node
ln -s /root/node-v18.17.1-linux-x64/bin/npm /usr/local/bin/npm
// 4. 查看是否安装成功
node -v
npm -v
```

### 上传本地项目到服务器

1. 把本地的 `nodejs-express` 项目压缩文件成 zip 包
2. 使用 `finalShell` 把压缩后的文件传到服务器上, 我放的是/home/文件夹下

### 安装 zip/unzip

```sh
// 查看是否安装了zip/unzip
yum list | grep zip/unzip
yum install zip
yum install unzip
```

### 解压文件

```sh
unzip express-demo.zip
```

### 试运行 express 项目

```sh
// 1.进入项目
cd express-demo/
// 2.运行项目
node app.js
// 可以正常跑起来即运行成功
```

### 在阿里云轻量应用管理平台添加防火墙端口

使用 postman 调用接口时, 发现访问不通, 原因是防火墙的端口没开, 需要开防火墙端口, 项目接口使用的 3000 端口:![d56e19e3c94b7674f48720c4b38c0619.png](../images/aliyun-server-res/948EED37-A2B2-4BB1-9B22-C58B5451604C.png)

再使用 postman 调用接口, 发现可以调通了, 但是报连接数据库的错误, 因为之前本地的项目是使用的本地数据库, 服务器上暂时没有数据库, 所以接下来需要在服务器上创建数据库.

## 在服务器端添加数据库

### 安装 MySql

```sh
// 1. 安装mysql
yum install mysql-server
// 2. 启动mysql
service mysqld start
```

### 登录 MySql

默认是没有设置密码的

```sh
mysql -u root -p
```

设置 root 用户

```sh
// 1. 使用mysql表
use mysql;
// 2. 查询用户信息
select User, Host from user;
// 3. 修改用户信息
update user set Host='%' where User='root' and Host='localhost' limit 1;
// 4. 应用
flush privileges;
// 5. 再次查看是否修改成功
select User, Host from user;
```

设置 root 用户密码

```sh
alter user 'root'@'%' identified by <password>;
```

### 防火墙打开数据库端口

数据库默认是 3306 端口, 在阿里云管理平台打开防火墙端口![9f72a7a3fb8c419ddfd41efd9014965e.png](../images/aliyun-server-res/37670519-FA8B-4062-BCFE-130FB5F41509.png)

### 验证是否可以访问远程数据库

打开 iterm

```sh
mysql -h <ip> -P 3306 -u root <password>
```

### 修改服务器端项目里连接数据库的密码

使用 VSCode 的资源管理器插件连接远程服务器, 并打开项目文件, 修改项目中连接数据库的密码.

## 使用 workbench 把本地的数据库迁移到服务器上

### 导出本地数据库

data export: ![3fc772830e11d1ab6274677b49d54d41.png](../images/aliyun-server-res/7B4DB7D5-2F36-4242-99E6-B959F73C28EE.png)

### 连接远程数据库

连接远程数据库后, 在远程数据库里导入数据
data import: ![c5f071441259524b36e117212c6b269b.png](../images/aliyun-server-res/F5AC47B0-C347-4D4C-940E-B178AF6E770C.png)

### 使用 postman 测试接口是否正常

测试接口:![cc144ef46a7b31a1a1ceac37777f0bce.png](../images/aliyun-server-res/E1035F5C-8438-4517-8DD5-5487B6B9A487.png)

## 自动启动项目 pm2

当我退出 shell 远程服务器时, 项目会自动停止了, 需要安装状态代理包 pm2.

1. 全局安装

   ```sh
   npm install -g pm2
   ```

   全局包是安装在 node 目录里的.

2. 建立软链接

   ```sh
   ln -s /root/node-v18.17.1-linux-x64/bin/pm2 /usr/local/bin/pm2
   ```

   ![0bd7fbc48b8791e43bf0abeadef21601.png](../images/aliyun-server-res/C52A3D7C-1B05-4EB1-8883-202ACBB12DE4.png)

3. 进入 express 项目,使用 pm2 启动项目

   ```sh
   pm2 start app.js
   ```

   ![66b4104761f98ce4db8e6de73290c229.png](../images/aliyun-server-res/AFB10CB6-2C19-4640-A395-F5D0E56ECBB0.png)
