---
title: JavaScript Hoisting(提升)
date: 2023-12-27 09:47:30
tags:
  - javascript
categories:
  - 前端
---

## 什么是 Hoisting?

在编译阶段,就在代码执行前几微秒, 会扫描查找函数和变量声明. 所有这些函数和变量声明都被添加到称为词法环境(`Lexical Environment`)的数据结构的内存中. 这样即使在源代码声明它们之前, 也可以使用它们.

### 什么是词法环境?

词法环境是一个包含`identifier`-`variable`映射的结构(这里的`identifier`是指变量或函数的名称, `variable`是指实际对象[包括函数对象和数组对象]或原始值的引用).

<!-- more -->

抽象概念示例如下:

```js
LexicalEnvironment = {
    Identifier: <value>,
    Identifier: <function object>
}
```

简单说, 词法环境是程序执行期间变量和函数驻留的地方.

### 函数声明提升

```js
foo(); // 输出 hello world
function foo() {
  console.log("hello world");
}
```

在编译阶段, 函数声明还会被添加到内存中, 所以可以在函数声明之前访问它.
上述代码的词法环境如下:

```js
lexicalEnvironment = {
    foo: <func>
}
```

当`JavaScript`引擎遇到函数`foo()`调用时, 会查看词法环境,找到对应的函数, 然后执行它.

### 函数表达式提升

在`JavaScript`中函数里只有函数声明可以提升, **函数表达式不能提升**. 例如

```js
foo(); // foo is not a function
var foo = function () {
  console.log("hello world");
};
```

以上函数表达式创建的函数, `foo`会被当作`var`定义的变量提升, 并不是函数, 所以在提升时会将`foo`赋值给`undefined`.

### var 变量提升

```js
console.log(a); // 输出 'undefined'
var a = 3;
```

在编译期间, `JavaScript`仅会存储函数和变量声明到内存里, 不会给它赋值. 当引擎查找到`var`变量时, 会将其加到词法环境, 然后初始化为`undefined`. 当后续的代码执行过程中, 遇到赋值语句时, 才会把实际的值赋给该变量.
因此上述代码在词法环境里初始值如下:

```js
lexicalEnvironment = {
  a: undefined,
};
```

这就是为什么上面输出的是`undefined`而不是`3`. 当引擎执行赋值语句后, 会更新词法环境中的变量的值. 如下:

```js
lexicalEnvironment = {
  a: 3,
};
```

### let 和 const 提升

```js
console.log(a); // a is not defined
let a = 3;
```

是否意味着`let`和`const`变量没有提升呢?
实际上, 在`JavaScript`中所有的声明(函数、`var`、`let`、`const`和`class`)都有提升. 当是`var`声明的变量在提升时会被初始化为`undefined`, 而`let`和`const`声明的变量在提升时会保留未初始化状态`uninitialized`.

引擎在运行时只能获取到词法绑定的初始化的值. 而不能访问未初始化的值. 在变量创建到它被初始化之前这段时间, 它们是不能被访问的, 也被称为**暂时性死区(Temporal Dead Zone)**

如果`let`变量在声明之后仍然没有赋值, 会默认赋值`undefined`. 如果是`const`变量, 会报错.

```js
let a;
console.log(a); // 输出 undefined
a = 5;
```

`let`和`const`声明的变量, 在编译阶段, 词法环境中的变量是未初始化的, 如下所示:

```js
lexicalEnvironment = {
    a: <uninitialized>
}
```

如果在声明之前访问它们, 会报错. 在执行阶段, 引擎遇到变量声明时, 会尝试评估它的值, 由于代码没有赋值, 会默认赋值`undefined`. 词法环境如下所示:

```js
lexicalEnvironment = {
  a: undefined,
};
```

所以上述代码的输出是`undefined`. 当引擎遇到赋值语句后, 会更新词法环境中的变量的值.

> 注意 ⚠️: 在代码中(比如函数体内)可以在它们被声明之前引用`let`和`const`变量, 只要该代码不是在变量声明之前执行.

例如, 以下代码是有效的:

```js
function foo() {
  console.log(a); // 输出 20
}
let a = 20;
foo();
```

但是如果是在变量声明之前调用, 会报错

```js
function foo() {
  console.log(a); // a is not defined
}
foo();
let a = 20;
```

### Class 声明提升

和`let`、`const`声明一样, `class`声明也有提升, 同时, 也是未初始化的值`uninitialized`. 所以也存在**暂时性死区(Temporal Dead Zone)**. 例如:

```js
let peter = new Person("Peter", 25); // Person is not defined.
console.log(peter);
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

所以只能在 class 声明之后访问它. 例如:

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
let peter = new Person("Peter", 25);
console.log(peter); // Person { name: 'Peter', age: 25 }
```

在编辑阶段, 上面的代码的词法环境如下所示:

```js
lexicalEnvironment = {
    Person: <uninitialized>
}
```

当引擎遇到 class 语句时, 会初始化 class 的值:

```js
lexicalEnvironment = {
    Person: <Person object>
}
```

### Class 表达式提升

和函数表达式一样, Class 表达式是不能提升的. 如下代码会报错:

```js
let peter = new Person("Peter", 25); // Person is not defined
console.log(peter);
let Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};
```

这种写法不会报错:

```js
let Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};
let peter = new Person("Peter", 25);
console.log(peter); // Person { name: 'Peter', age: 25 }
```

`Hoisting`是`JavaScript`中的一种机制, 它使得在代码中可以在声明之前使用变量和函数. 但是这种行为可能会导致一些意外的结果, 建议始终在使用变量之前进行声明.
