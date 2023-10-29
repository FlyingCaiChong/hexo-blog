---
title: JavaScript Algorithms and Data Structures 源码分析(1) -- 工具类 Comparator
date: 2023-10-29 16:37:53
tags:
  - data structures
categories:
  - 数据结构与算法
---

`Comparator` 类是一个用于比较两个值的工具类.

```javascript
export default class Comparator {
  /**
   * 类的构造函数, 接受一个可选的compareFunction参数, 用于自定义比较函数.
   * 如果没有传入compareFunction, 则会使用默认的比较函数.
   */
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * 默认的比较函数, 假设a和b是字符串或数字.
   * 如果a 等于 b, 则返回0
   * 如果a 小于 b, 则返回-1
   * 如果a 大于 b, 则返回1
   */
  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   * 检查两个变量是否相等.
   * 内部调用this.compare(a, b), 如果返回值为0, 表示相等, 返回true; 否则返回false.
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  /**
   * 检查变量a是否小于b.
   * 内部调用this.compare(a, b), 如果返回值是-1, 表示a小于b, 返回true; 否则返回false
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  /**
   * 检查变量a是否大于b
   * 内部调用this.compare(a, b), 如果返回值为1, 表示a大于b, 返回true; 否则返回false
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  /**
   * 检查变量a是否小于等于b.
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * 检查变量a是否大于等于b
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * 反转比较顺序. 将当前的比较函数this.compare替换为compareOriginal(b, a), 实现反转比较的效果.
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
```

在`Comparator`类种, `compareFunction`是一个可选参数, 可以传入自定义的比较函数. 如果没有传入比较函数, 则会使用默认的比较函数. `compareFunction`应该是一个函数, 接受两个参数`a`和`b`, 返回一个数字, 表示它们的比较结果.

这个类的目的是为了提供一种方便的方式来进行比较操作, 以及在需要时动态地改变比较顺序.

---

源码地址: [JavaScript Algorithms and Data Structures](https://github.com/trekhleb/javascript-algorithms)
