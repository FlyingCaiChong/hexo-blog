---
title: 给WKWebView页面添加侧滑返回功能
date: 2023-09-05 18:37:21
tags:
  - WKWebView
categories:
  - iOS
---

> 背景需求:
> 从原生页面跳转到 h5 页面后, 有的 h5 页面没有返回按钮, 需要原生 app 添加侧滑返回功能.

最开始的想法是用`WKWebView`的`allowsBackForwardNavigationGestures`属性, 该属性默认值为 NO, 表示禁用 webView 的左滑右滑, 设置为 YES 后, 允许左右滑手势操作网页的后退前进.

```objective-c
_wkWebView.allowsBackForwardNavigationGestures = YES;
```

然后使用 KVO 监听`canGoBack`属性变化:

```objective-c
[_wkWebView addObserver:self forKeyPath:@"canGoBack" options:NSKeyValueObservingOptionNew context:nil];
```

处理属性变化回调:

```objective-c
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey, id> *)change context:(void *)context {
    if ([keyPath isEqualToString:@"canGoBack"]) {
        BOOL canGoBack = [self.wkWebView canGoBack];
        if (!canGoBack) {
            // 已经是第一个页面, 关闭页面
        }
    }
}
```

<!-- more -->

但是这样处理的时候, 遇到有的 h5 页面进去的时候会跳转多个链接, 最终显示最后一个链接, 这样一开始进去就会有多个页面栈, 左滑回退的时候会回退到页面的上一栈, 实际上需要的效果是关闭当前 h5 页面.

想到的另外一个方案是: 给 h5 页面添加一个侧滑手势, 在侧滑时, app 把侧滑事件给 h5, h5 那边监听侧滑事件, 处理 h5 内部 goBack 和关闭页面返回到原生 app 的逻辑.

首先添加侧滑事件

```objective-c
UIScreenEdgePanGestureRecognizer *edgePanGesture = [[UIScreenEdgePanGestureRecognizer alloc] initWithTarget:self action:@selector(swipe_handle:)];
edgePanGesture.edges = UIRectEdgeLeft;
edgePanGesture.delegate = self;
[self.webView addGestureRecognizer:edgePanGesture];
```

并实现协议`UIGestureRecognizerDelegate`:

```objective-c
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer {
    return YES;
}
```

为了防止和导航控制器手势冲突, 在进入 web 页面时,禁用导航侧滑手势, 退出 web 页面后, 启用导航侧滑手势

```objective-c
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.navigationController.interactivePopGestureRecognizer.enabled = NO;
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    self.navigationController.interactivePopGestureRecognizer.enabled = YES;
}
```

处理侧滑事件:

```objective-c
- (void)swipe_handle:(UIGestureRecognizer *)recognizer {

    if (recognizer.state == UIGestureRecognizerStateEnded) {
        // 把侧滑事件交给h5来处理
        [self bridgeCallHandler:@"onBackPressed" data:nil responseCallback:nil];
    }
}
```
