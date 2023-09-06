---
title: 使用WebViewJavascriptBridge实现iOS与js交互
date: 2023-09-06 10:46:05
tags:
  - WKWebView
  - javascript
categories:
  - iOS
---

> 背景: 原生应用跳转到 h5 页面, 并实现原生与 h5 页面的交互, 比如在 h5 页面中调用原生的拨打电话、拍照、选文件、定位等功能

## iOS 端集成 [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)

### 安装

方式一: 使用`CocoaPods`集成:

```
pod 'WebViewJavascriptBridge', '~> 6.0'
```

方式二: 手动集成, 把源代码`WebViewJavascriptBridge`文件夹拖到项目里. 我采用的是这种方式, 方便修改源码.

> 注意: 2020 年 4 月起 App Store 将不再接受使用`UIWebView`的新 App 上架、2020 年 12 月起将不再接受使用`UIWebView的App`更新。而该库中`WebViewJavascriptBridge`文件是对`UIWebView`的处理, 所以项目中把`WebViewJavascriptBridge`文件删除.

<!-- more -->

### 使用

#### 初始化`WebViewJavascriptBridge`对象

1. 导入`WKWebViewJavascriptBridge`
   ```objective-c
   #import "WKWebViewJavascriptBridge.h"
   ```
2. 声明属性
   ```objective-c
   @property(nonatomic, strong) WKWebViewJavascriptBridge *bridge;
   ```
3. 初始化
   ```objective-c
   self.bridge = [WKWebViewJavascriptBridge bridgeForWebView:self.wkWebView];
   ```
4. 设置代理, 自由实现`WKNavigationDelegate`方法
   ```objective-c
   [self.bridge setWebViewDelegate:self];
   ```
5. 开启日志
   ```objective-c
   [WKWebViewJavascriptBridge enableLogging];
   ```

#### iOS 调用 js 方法

1. js 端先注册方法
   ```js
   bridge.registerHandler("JS Echo", function (data, responseCallback) {
     console.log("JS Echo called with:", data);
     responseCallback(data);
   });
   ```
2. iOS 端调用
   ```objective-c
   [self.bridge callHandler:@"JS Echo" data:nil responseCallback:^(id responseData) {
   	NSLog(@"ObjC received response: %@", responseData);
   }];
   ```

#### js 调用 iOS 方法

1. iOS 端先注册方法
   ```objective-c
   [self.bridge registerHandler:@"ObjC Echo" handler:^(id data, WVJBResponseCallback responseCallback) {
   	NSLog(@"ObjC Echo called with: %@", data);
   	responseCallback(data);
   }];
   ```
1. js 端调用
   ```js
   bridge.callHandler("ObjC Echo", { key: "value" }, function responseCallback(responseData) {
     console.log("JS received response:", responseData);
   });
   ```

## JS 端使用

### 桥接文件

1. 针对 iOS 建立连接
   ```js
   function setupWebViewJavascriptBridge(callback) {
     if (window.WebViewJavascriptBridge) {
       return callback(WebViewJavascriptBridge);
     }
     if (window.WVJBCallbacks) {
       return window.WVJBCallbacks.push(callback);
     }
     window.WVJBCallbacks = [callback];
     var WVJBIframe = document.createElement("iframe");
     WVJBIframe.style.display = "none";
     WVJBIframe.src = "https://__bridge_loaded__";
     document.documentElement.appendChild(WVJBIframe);
     setTimeout(function () {
       document.documentElement.removeChild(WVJBIframe);
     }, 0);
   }
   ```
2. 针对 Android 建立连接方法
   ```js
   function connectWebViewJavascriptBridge(callback) {
     if (window.WebViewJavascriptBridge) {
       callback(window.WebViewJavascriptBridge);
     } else {
       document.addEventListener(
         "WebViewJavascriptBridgeReady",
         () => {
           callback(window.WebViewJavascriptBridge);
         },
         false
       );
     }
   }
   ```
3. 适配 iOS 和 android 的桥接

   ```js
   let ua = navigator.userAgent;
   let android = /(Android);?[\s\/]+([\d.]+)?/.test(ua);
   let ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);

   function hybridBridgeReady(ready) {
     if (ios) {
       setupWebViewJavascriptBridge(ready);
     } else if (android) {
       connectWebViewJavascriptBridge(ready);
     }
   }

   if (android) {
     hybridBridgeReady((bridge) => {
       bridge.init((message, responseCallback) => {
         let data = {
           documentReady: "ready",
         };
         responseCallback(data);
       });
     });
   }
   ```

4. js 端注册方法供原生端调用
   ```js
   hybridBridgeReady((bridge) => {
     bridge.registerHandler("JS Echo", function (data, responseCallback) {
       console.log("JS Echo called with:", data);
       responseCallback(data);
     });
   });
   ```
5. js 端调用原生端方法
   ```js
   hybridBridgeReady((bridge) => {
     bridge.callHandler("ObjC Echo", { key: "value" }, function responseCallback(responseData) {
       console.log("JS received response:", responseData);
     });
   });
   ```

---

参考文档

- [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)
