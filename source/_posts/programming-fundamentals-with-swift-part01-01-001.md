---
title: Swift架构 - Ground of Being
date: 2024-06-01 05:48:40
tags:
  - Programming Fundamentals With Swift
categories:
  - Swift
---

一个完整的 Swift 命令是一个语句。Swift 文本文件是由多行组成的文本。换行符是有意义的。一个程序的典型布局是一条语句一行:

```swift
print("hello")
print("world")
```

( `print` 命令在 Xcode 控制台中提供即时反馈)

<!-- more -->

你可以在一行中合并多个语句，但你需要在它们之间加上分号:

```swift
print("hello"); print("world")
```

你可以在语句的最后一个或一行中单独放置一个分号，但没有人会这样做(除非出于习惯，因为 C 和 Objective-C 需要分号):

```swift
print("hello");
print("world");
```

相反，可以将单个语句拆分成多行，以防止长语句变成长行。但你应该试着在明智的地方这样做，以免混淆 Swift。在开括号之后是一个好地方:

```swift
print(
    "world")
```

注释是一行中两个斜杠后面的所有内容(所谓的 c++风格的注释):

```swift
print("world") // this is a comment, so Swift ignores it
```

您还可以像 C 语言一样，在 `/*...*/` 中附上注释。与 C 语言不同的是，C 语言风格的注释可以嵌套。

Swift 中的许多结构都使用花括号作为分隔符:

```swift
class Dog {
    func bark() {
        print("woof")
    }
}
```

按照惯例，花括号的内容前后都有换行符，并且为了清晰起见缩进，如上面的代码所示。Xcode 将帮助实施这种惯例，但事实是 Swift 不在乎，像这样的布局是合法的(有时更方便):

```swift
class Dog { func bark() { print("woof") }}
```

Swift 是一种编译语言。这意味着，在运行并实际执行它说要做的事情之前，您的代码必须构建-通过编译器，并从文本转换为计算机可以理解的某种低级形式。Swift 编译器是非常严格的;在编写程序的过程中，您经常会尝试构建并运行程序，结果发现甚至在一开始就无法构建，因为编译器会标记一些错误，如果您想要代码运行，就必须修复这些错误。少数情况下，编译器会给你一个警告;代码可以运行，但一般来说，您应该认真对待警告，并修复它们告诉您的任何内容。编译器的严格性是 Swift 最大的优势之一，它甚至在代码运行之前就为其提供了大量经审计的正确性。

Swift 编译器的错误和警告信息从深刻的到迟钝的到彻底的误导。有时你会知道某一行代码出了问题，但是 Swift 编译器可能不会清楚地告诉你到底哪里出了问题，甚至不会告诉你应该关注哪一行代码。在这些情况下，我的建议是将这一行分开成几行更简单的代码，直到您到达一个点，您可以找出问题是什么。试着爱编译器，即使它的信息看起来很神秘;记住，它知道的比你多。
