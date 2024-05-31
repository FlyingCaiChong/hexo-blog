---
title: Swift架构 - The Structure of a Swift File
date: 2024-06-01 07:35:02
tags:
  - Programming Fundamentals With Swift
categories:
  - Swift
---

Swift 程序可以由一个文件或多个文件组成。在 Swift 中，文件是一个有意义的单元，对于可以放入其中的 Swift 代码的结构有明确的规则。只有某些内容可以放在 Swift 文件的顶层-主要是以下内容:

**模块`import`语句**

模块是比文件更高级的单元。一个模块可以由多个文件组成，这些文件都可以自动看到对方。你的应用程序的文件属于一个单独的模块，可以看到彼此。但是如果没有`import`语句，一个模块就不能看到另一个模块。这就是你在 iOS 程序中与 Cocoa 对话的方式:文件的第一行写着`import UIKit`。

<!-- more -->

**变量声明**

在文件顶层声明的变量是一个全局变量:任何文件中的所有代码都可以看到和访问它，而无需显式地向任何对象发送消息。

**函数声明**

在文件顶层声明的函数是一个全局函数:任何文件中的所有代码都可以看到并调用它，而无需显式地向任何对象发送消息。

**对象类型声明**

类、结构体或枚举的声明。

这是一个合法的 Swift 文件，在它的顶层包含了一个 import 语句，一个变量声明，一个函数声明，一个类声明，一个结构体声明和一个枚举声明(只是为了证明它是可以完成的):

```swift
import UIKit
var one = 1
func changeOne() {
}
class Manny {
}
struct Moe {
}
enum Jack {
}
```

这是一个非常愚蠢且空洞的示例，但请记住，我们的目标是研究该语言的各个部分和文件的结构，示例展示了它们。

文件的顶层就到此为止。但现在我们来讨论一下在我们的例子中，花括号里面可以包含什么。事实证明，它们内部也可以有变量声明、函数声明和对象类型声明!事实上，任何结构花括号都可以包含这样的声明。

但是可执行代码呢?您会注意到，我并没有说可执行代码可以放在文件的顶层。那是因为它不能!只有函数体才能包含可执行代码。像`one = two`或`print(“hello”)`这样的语句是可执行代码，不能放在文件的顶层。但是在我们前面的例子中，`func changeOne()`是一个函数声明，所以可执行代码可以放在它的花括号中，因为它们构成了一个函数体:

```swift
var one = 1
// executable code can't go here!
func changeOne() {
    let two = 2 // executable code
    one = two // executable code
}
```

类似地，可执行代码不能直接放在类`Manny`声明附带的花括号中;这是类声明的顶层，而不是函数体。但是类声明可以包含函数声明，而函数声明可以包含可执行代码:

```swift
class Manny {
    let name = "manny"
    // executable code can't go here!
    func sayName() {
        print(name) // executable code
    }
}
```

总而言之，例 1-1 是一个 Swift 合法文件，简要地说明了结构上的可能性。(忽略`Jack`的`enum`声明中的`name`变量声明;`enum`顶层变量有一些特殊的规则，我稍后会解释。)

例 1-1 一个合法 Swift 文件的原理图结构:

```swift
import UIKit
var one = 1
func changeOne() {
    let two = 2
    func sayTwo() {
        print(two)
    }
    class Klass {}
    struct Struct {}
    enum Enum {}
    one = two
}
class Manny {
    let name = "manny"
    func sayName() {
        print(name)
    }
    class Klass {}
    struct Struct {}
    enum Enum {}
}
struct Moe {
    let name = "moe"
    func sayName() {
        print(name)
    }
    class Klass {}
    struct Struct {}
    enum Enum {}
}
enum Jack {
    var name : String {
        return "jack"
    }
    func sayName() {
        print(name)
    }
    class Klass {}
    struct Struct {}
    enum Enum {}
}
```

显然，我们可以按照自己的意愿向下递归:我们可以有一个包含类声明的类声明，以及一个包含类声明的类声明，等等。但我相信你现在已经有了这个想法，所以没有必要进一步说明。
