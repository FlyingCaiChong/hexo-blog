---
title: JavaScript Scope & Scope Chain (作用域和作用域链)
date: 2023-12-29 07:17:29
tags:
  - javascript
categories:
  - 前端
---

## 作用域是什么?

`JavaScript`中的作用域指的是变量的可见性和可访问性.也就是说,程序的哪些部分可以访问该变量,或者该变量在哪里是可见的.

### 为什么作用域如此重要?

1. 作用域的主要好处是安全性。也就是说，这些变量只能从程序的某个区域访问。使用作用域，我们可以避免程序其他部分对变量的意外修改。
2. 作用域也减少了名称空间冲突。也就是说，我们可以在不同的作用域中使用相同的变量名。

<!-- more -->

## 作用域的类型

有三种类型

1. 全局作用域(`Global Scope`)
2. 函数级作用域(`Function Scope`)
3. 块级作用域(`Block Scope`)

### 全局作用域

任何不在函数或者块内部的变量, 都属于在全局作用域里. 全局作用域的变量可以被程序里的任何地方访问. 例如:

```javascript
var greeting = "hello world";
function greet() {
  console.log(greeting);
}
greet(); // 输出 'hello world'
```

### 函数级作用域

在函数内部声明的变量属于函数级作用域. 它们只能在函数体内部访问, 意味着不能在函数外部的代码中访问. 例如:

```javascript
function greet() {
  var greeting = "hello world";
  console.log(greeting);
}
greet(); // 输出 'hello world'
console.log(greeting); // 报错 greeting is not defined
```

### 块级作用域

在 ES6 中引入了`let`和`const`变量, 不像`var`变量, 它们可以放在大括号内部, 形成块级作用域. 意味着, 不能在代码块外部访问. 例如:

```javascript
{
  let greeting = "hello world";
  var lang = "English";
  console.log(greeting); // 输出 hello world
}
console.log(lang); // 输出 English
console.log(greeting); // 报错 greeting is not defined
```

可以看到`var`变量能够在代码块外部访问, 因为`var`变量不是块级作用域.

## 嵌套作用域

和函数一样, 作用域可以在另一个作用域中嵌套, 如下:

```javascript
var name = "Peter";
function greet() {
  var greeting = "Hello";
  {
    let lang = "English";
    console.log(`${lang}: ${greeting} ${name}`);
  }
}
greet(); // 输出 English: Hello Peter
```

这里嵌套了三个作用域.首先, 块级作用域嵌套在函数级作用域内部, 而函数级作用域嵌套在全局作用域内部.

## 词法作用域

词法作用域也称为静态作用域, 字面意思是作用域在词法分析时(通常称为编译时)确定,而不是运行时确定. 例如:

```javascript
let number = 42;
function printNumber() {
  console.log(number);
}
function log() {
  let number = 54;
  printNumber();
}
log(); // 输出42
```

不管`printNumber()`函数是在哪里调用的, 这里会输出 42. 和其他语言中的动态作用域不同, `console.log(number)`的输出依赖于`printNumber()`函数的调用位置. 如果上述代码是在动态作用域中的语言运行,会输出 54.
使用词法作用域, 我们可以仅通过阅读源代码来确定变量的作用域. 而动态作用域的情况是直到代码执行时才能确定作用域.

## 作用域链

当一个变量被使用时, 引擎会在变量的当前作用域中查找变量的值. 如果找不到, 就会去它的外部作用域查找, 一直到查找到该变量为止, 或者查找到全局作用域.如果仍然无法找到变量, 它将在全局作用域中隐式声明该变量(非严格模式下)或返回错误.

例如:

```javascript
let foo = "foo";
function bar() {
  let baz = "baz";
  console.log(baz); // 输出 baz
  console.log(foo); // 输出 foo
  number = 42;
  console.log(number); // 非严格模式下 输出42, 严格模式下报错
}
bar();
```

当函数`bar()`执行时,引擎会在当前作用域中查找`baz`变量. 接着在当前作用域中查找`foo`变量, 没有找到, 然后到它外层作用域中找.
当给`number`赋值 42 时, 引擎先在当前作用域中查找`number`变量, 没有找到, 然后在外层作用域也就是全局作用域中查找, 还是没有找到, 在非严格模式下会隐式声明变量`number`返回给它赋值, 在严格模式下会报错.
因此, 当使用一个变量时, 引擎会沿着作用域链向上查找变量,直到找到它.

## 作用域和作用域链是如何工作的?

在理解引擎执行变量查找过程是如何工作的之前, 先理解词法环境的概念, 在这篇文章.

### 引擎如何执行变量查找

当 JavaScript 引擎执行变量查找时，它会遵循作用域链的机制。作用域链是由当前执行上下文的词法环境组成的。词法环境包括变量对象和对外部词法环境的引用。在变量查找过程中，引擎首先在当前词法环境的变量对象中查找变量。如果找不到，它会沿着外部词法环境的引用继续查找，直到找到变量或者到达全局词法环境为止。

```javascript
let greeting = "Hello";
function greet() {
  let name = "Peter";
  console.log(`${greeting} ${name}`);
}
greet();
{
  let greeting = "Hello World";
  console.log(greeting);
}
```

当上述代码执行时, 会先创建全局词法环境, 它的全局作用域中包含变量和函数定义.

```javascript
globalLexicalEnvironment = {
    greeting: 'Hello',
    greet: <ref. to greet function>
    outer: null
}
```

因为全局作用域没有外部作用域, 所以`outer`设置为`null`.
接着, 调用`greet()`函数时. 会为`greet()`函数创建一个新的词法环境

```javascript
functionLexicalEnvironment = {
    name: 'Peter',
    outer: <globalLexicalEnvironment>
}
```

因为它的外部作用域是全局作用域, 所以`outer`设置为`globalLexicalEnvironment`.

之后, 引擎执行函数内代码`console.log(`${greeting} ${name}`);`. 引擎会在函数词法环境中查找变量`greeting`和`name`. 在当前词法环境中找到了`name`变量, 但是没有找到`greeting`变量, 然后会在它的外部词法环境中找到`greeting`变量.
函数执行完之后, 会接着执行`block`内部的代码. 会为该代码块创建一个新的词法环境.

```javascript
blockLexicalEnvironment = {
    greeting: 'Hello World',
    outer: <globalLexicalEnvironment>
}
```

当代码执行到`block`中的`console.log(greeting);`时, 会在当前块作用域中查找`greeting`变量并使用.

因此，当一个变量在程序中使用时，JavaScript 引擎会尝试在当前的词法环境中找到该变量，如果它在那里找不到该变量，它就会在外部词法环境中寻找该变量。这就是 JavaScript 引擎执行变量查找的方式。
