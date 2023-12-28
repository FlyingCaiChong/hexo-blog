---
title: JavaScript Closures(闭包)
date: 2023-12-28 10:51:10
tags:
  - javascript
categories:
  - 前端
---

## 什么是闭包?

闭包是指在 `JavaScript` 中，内部函数可以访问外部函数作用域中的变量和资源的特性。当内部函数在外部函数中定义时，它会创建一个闭包，将外部函数的**词法作用域**中的变量和资源保存在闭包中。这使得内部函数在外部函数执行完毕后仍然能够访问外部函数的作用域。

### 什么是词法作用域?

词法作用域（`lexical scope`）是指变量的作用域是由它们在代码中的位置决定的。在 `JavaScript` 中，词法作用域是通过函数的嵌套关系来确定的。这意味着内部函数可以访问外部函数的变量和资源，但外部函数无法访问内部函数的变量和资源。

<!-- more -->

例如:

```js
let a = "global";
function outer() {
  let b = "outer";
  function inner() {
    let c = "inner";
    console.log(c); // 输出 inner
    console.log(b); // 输出 outer
    console.log(a); // 输出 global
  }
  console.log(b); // 输出 outer
  console.log(a); // 输出 global
  inner();
}
outer();
console.log(a); // 输出 global
```

以上代码中, `inner`函数可以访问它自己的作用域、`outer`函数作用域和全局作用域中的变量, `outer`函数可以访问它自己的作用域和全局作用域中的变量.
其作用域链像是这样:

```js
Global {
    outer {
        inner
    }
}
```

`inner`函数是被`outer`函数的词法作用域包围的, `outer`函数是被全局作用域包围的. 因此`inner`函数可以访问`outer`函数和全局作用域中的变量.

### 闭包的示例

#### 示例 1

```js
function foo() {
  let msg = "hello world";
  return function bar() {
    console.log(msg);
  };
}
let baz = foo();
baz(); // 输出 'hello world'
```

在上述代码中, 调用`foo`函数后返回其内部函数`bar`并存储到变量`baz`中. 当调用`baz`函数时, 会输出`msg`. 但是在`bar`函数中并没有`msg`变量, 这时函数会从它的外部函数`foo`中查找`msg`变量, 因此`bar`函数就形成了一个闭包.

#### 示例 2

```js
function getCounter() {
  let counter = 0;
  return function () {
    return counter++;
  };
}
let count = getCounter();
console.log(count()); // 0
console.log(count()); // 1
console.log(count()); // 2
```

在上述代码中, 调用`getCounter`函数后返回其内部匿名函数并存储到变量`count`中. `count`函数形成了一个闭包, 可以访问`getCounter`函数中的变量.
注意每次调用`count`函数时, `couter`变量并不会重置为 0, 因为每次调用`count`函数时, 一个新的函数作用域会被创建, 但是`getCounter`函数的作用域只有一个. 因为`counter`变量时定义在`getCounter`函数作用域中的. 所以每次调用`count`函数时并不会重置`counter`.

### 闭包是如何工作的?

两个重要的概念:

1. 执行上下文(`Execution Context`)
2. 词法环境(`Lexical Environment`)

#### 执行上下文

执行上下文是`JavaScript`代码在评估和执行时的抽象环境. 当全局代码被执行时, 它是在全局执行上下文中执行的, 函数代码是在函数执行上下文中执行的.
由于`JavaScript`是单线程语言, 所以只有一个当前运行的执行上下文. 它是由执行栈(也叫调用栈)管理的.
执行栈是一个后进先出的栈结构, 每个元素只能从栈顶添加或移除.
当前运行的执行上下文总是位于栈顶, 当函数运行完成后, 它的执行上下文会从栈顶移除掉.

示例

```js
let a = "hello world";
function foo() {
  console.log("inside foo function");
}
foo();
console.log("inside global execution context");
```

当上述代码执行时, `JavaScript`引擎会创建一个全局执行上下文, 用于执行全局代码. 当遇到`foo()`函数调用时, 会创建一个新的函数执行上下文, 并将其`push`到执行栈的栈顶. 当`foo()`函数调用完成后, 执行栈会从栈顶移除该函数执行上下文. 此时全局执行上下文就位于栈顶了, 然后接着执行全局作用域中的代码.

#### 词法环境

每当`JavaScript`引擎创建一个执行上下文来执行函数或全局代码时, 也会创建一个新的词法环境来存储定义在函数中的变量.
词法环境是一个包含`identifier`-`variable`映射的结构(这里的`identifier`是指变量或函数的名称, `variable`是指实际对象[包括函数对象和数组对象]或原始值的引用).

词法环境由三部分组成:

1. `Environment Record`(环境记录): 记录函数声明和变量
2. `Reference to the outer environment` (外部环境的引用): 可以访问外部词法环境
3. `This binding` (this 绑定): 用于绑定 this

词法环境的抽象概念如下:

```js
lexicalEnvironment: {
    environmentRecord: {
        <identifier>: <value>,
        <identifier>: <value>
    },
    outer: <Reference to the parent lexical environment>
    this: <depends on how function is called>
}
```

如下代码:

```js
let a = "hello world";
function foo() {
  let b = 25;
  console.log("inside foo function");
}
foo();
console.log("inside global execution context");
```

当引擎执行全局代码时会创建一个全局执行上下文, 同时也创建一个新的词法环境用来存储全局作用域中的变量和函数定义. 全局作用域的词法环境如下所示:

```js
globalLexicalEnvironment = {
    environmentRecord: {
        a: 'hello world',
        foo: <reference to function object>
    },
    outer: null,
    this: <global object>
}
```

由于全局作用域没有外部词法环境, 所以这里的`outer`是`null`.
当引擎调用 `foo()`函数时, 会创建函数执行上下文, 同时也会创建一个新的词法环境, 用来存储函数内部的变量和`arguments`. 该函数的词法环境如下所示:

```js
functionLexicalEnvironment = {
    environmentRecord: {
        b: 25,
    }
    outer: <globalLexicalEnvironment>,
    this: <depends on how function is called>
}
```

由于该函数在源码中是被全局作用域包围的, 所以其`outer`会被设置为全局词法环境的引用.

> 注意 ⚠️: 当函数调用完成后, 函数执行上下文会从执行栈中移除掉, 但是它的词法环境在内存中可能不会被移除, 如果它的词法环境被其他函数的词法环境引用了, 就不会被移除.

### 闭包的作用

闭包在 `JavaScript` 中有多种作用，包括但不限于以下几点：

1. 封装数据和功能：闭包可以帮助我们创建私有变量和方法，从而实现数据的封装和隐藏。这有助于避免全局命名空间的污染，提高代码的可维护性和安全性。
2. 保持状态：闭包可以保持函数执行时的状态，使得函数在多次调用之间可以保持状态的连续性。这对于实现计数器、缓存和记忆化等功能非常有用。
3. 实现模块化：通过闭包，我们可以创建模块化的代码结构，将相关的变量和函数封装在一个闭包内部，从而实现模块化的代码组织和管理。
4. 回调函数和事件处理：闭包可以用于创建回调函数和处理事件，因为它可以保持对外部作用域的引用，从而在函数执行时可以访问外部变量和函数。
5. 函数工厂：闭包可以用于创建函数工厂，即返回函数的函数。这种模式可以用于生成具有特定行为和状态的函数。
