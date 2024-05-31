---
title: Swift架构 - Three Flavors of Object Type
date: 2024-06-01 06:51:45
tags:
  - Programming Fundamentals With Swift
categories:
  - Swift
---

如果你了解 Objective-C 或其他面向对象语言，你可能会对 Swift 关于对象 1 的概念感到惊讶。在许多语言中，例如 Objective-C，对象是一个类或类的实例(我将在后面解释什么是实例)。Swift 有类，但 Swift 中的 1 既不是类，也不是类的实例: 1 的类型，即`Int`，是一个`struct`，1 是一个结构体的实例。Swift 还有另一种可以发送消息的东西，叫做`enum`。

<!-- more -->

所以 Swift 有三种对象类型:类、结构和枚举。我喜欢将它们称为三种类型的对象。它们之间究竟有何不同，将在适当的时候浮出水面。但它们都是非常明确的对象类型，它们彼此之间的相似之处远远强于它们的差异。现在，只要记住这三种类型是存在的。

(好吧，我撒谎了。Swift 5.5 的新版本，实际上有第四种类型，`actors`。`actors`是高度专业化的，我稍后会告诉你。在那之前，就假装有三种类型吧。)

`struct` 或 `enum` 在 Swift 中是对象类型的事实会让你感到惊讶，特别是如果你了解 Objective-C 的话。Objective-C 有 `struct` 和 `enum`，但它们不是对象。尤其是 Swift `struct`，它比 Objective-C `struct`更重要，也更普遍。Swift 如何查看 `struct` 和 `enum` 与 Objective-C 如何查看它们之间的区别在你与 Cocoa 交谈时很重要。
