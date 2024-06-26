---
title: Swift架构 - Variables
date: 2024-06-01 06:54:56
tags:
  - Programming Fundamentals With Swift
categories:
  - Swift
---

变量是对象的名称。从技术上讲，它指向一个对象;它是一个对象的引用。从非技术上讲，你可以把它想象成一个放置物品的鞋盒。这个对象可能会发生变化，或者它可能会在鞋盒内被另一个对象取代，但名称本身具有完整性。变量指向的对象是变量的值。

在 Swift 中，没有变量隐式地存在;所有变量都必须声明。如果你需要一个名字，你必须说“我正在创建一个名字”。您可以使用两个关键字中的一个: `let` 或 `var`。在 Swift 中，声明通常伴随着初始化——作为声明的一部分，您使用等号立即给变量一个值。这两个都是变量声明(和初始化):

<!-- more -->

```swift
let one = 1
var two = 2
```

一旦名称存在，您就可以自由使用它。我们可以将 `two` 的值改变为 `one` 的值:

```swift
let one = 1
var two = 2
two = one
```

该代码的最后一行同时使用了前两行中声明的名称 `one` 和名称 `two`:在等号右侧的名称 `one` 仅用于引用鞋盒 `one` 内的值(即 1);但是，在等号左边的名称 `two` 被用来替换鞋盒 `two` 内的值。在说 `two = one` 之前，`two` 的值是 2;之后是 1。

在等号左边有变量名的语句称为赋值语句，等号是赋值操作符。等号不像代数公式那样是相等的断言;这是一个命令。它的意思是:“获取右边的值，用它来取代左边的值。”

这两种变量声明的不同之处在于，用`let`声明的名称不能替换其初始值。用`let`声明的变量是常量;它的值只分配一次，并保持不变。这甚至无法编译:

```swift
let one = 1
var two = 2
one = two // compile error
```

使用`var`来声明一个名称总是有可能给自己带来最大的灵活性，但如果你知道你永远不会替换一个变量的初始值，最好使用`let`，因为这允许 Swift 更有效地运行。事实上，Swift 编译器会提醒在你已经使用`let`的地方你可以使用`var`，并提供你改变它的方式。

变量也有一个类型。当变量声明且永远不能更改时，就建立了此类型。这不会编译:

```swift
var two = 2
two = "hello" // compile error
```

一旦 `two` 被声明并初始化为 2，它就是一个数字(准确地说，是一个`Int`)，而且必须始终如此。你可以用 1 替换它的值，因为它也是一个`Int`，但你不能用“hello”替换它的值，因为它是一个字符串(准确地说，是一个`String`)，而`String`不是`Int`。

变量有它们自己的生命——更准确地说，有它们自己的有效期。只要变量存在，它就保持其值存在。因此，变量不仅可以是一种方便命名的方式，也可以是一种保存它的方式。关于这一点，我稍后会说得更多。

> 按照惯例，`String`或`Int`(或`Dog`)等类型名称以大写字母开头;变量名以小写字母开头。不要违反这个惯例。如果您这样做了，您的代码可能仍然可以很好地编译和运行，但我将亲自派遣代理到您的房子里，在夜深人静的时候移除您的膝盖。
