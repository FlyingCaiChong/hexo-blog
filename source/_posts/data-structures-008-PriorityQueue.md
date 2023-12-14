---
title: JavaScript Algorithms and Data Structures 源码分析(8) -- 优先队列 PriorityQueue
date: 2023-12-14 13:53:35
tags:
  - data structures
categories:
  - 数据结构与算法
---

## 优先队列

在计算机科学中, **优先级队列(priority queue)** 是一种抽象数据类型, 它类似于常规的队列或栈, 但每个元素都有与之关联的“优先级”。

在优先队列中, 低优先级的元素之前前面应该是高优先级的元素。 如果两个元素具有相同的优先级, 则根据它们在队列中的顺序是它们的出现顺序即可。

优先队列虽通常用堆来实现,但它在概念上与堆不同。优先队列是一个抽象概念，就像“列表”或“图”这样的抽象概念一样;

正如列表可以用链表或数组实现一样，优先队列可以用堆或各种其他方法实现,例如无序数组。

<!-- more -->

## PriorityQueue 类

### constructor() 初始化方法

```javascript
constructor() {
  // 首先调用 MinHip 类的构造函数。
  super();

  // 创建一个 Map 对象来存储优先级。
  this.priorities = new Map();

  // 使用自定义比较函数 comparePriority 创建一个 Comparator 对象，
  // 用于在堆中对元素进行比较时考虑优先级而不是元素的值。
  this.compare = new Comparator(this.comparePriority.bind(this));
}
```

### add(item, priority = 0)方法

```javascript
/**
 * 将项添加到优先队列中。
 * @param {*} item - 要添加到队列中的项。
 * @param {number} [priority] - 项的优先级。
 * @return {PriorityQueue} - 返回优先队列本身。
 */
add(item, priority = 0) {
  // 使用优先级映射将项及其优先级放入priorities映射中。
  this.priorities.set(item, priority);
  // 调用父类的add方法将项添加到队列中。
  super.add(item);
  // 返回优先队列本身。
  return this;
}
```

### remove(item, customFindingComparator) 方法

```javascript
/**
 * 从优先队列中移除元素。
 * @param {*} item - 要移除的元素。
 * @param {Comparator} [customFindingComparator] - 用于查找要移除元素的自定义函数。
 * @return {PriorityQueue} - 更新后的优先队列。
 */
remove(item, customFindingComparator) {
  // 调用父类（可能是PriorityQueue）的remove方法来移除元素。
  super.remove(item, customFindingComparator);
  // 从priorities集合中删除元素。
  this.priorities.delete(item);
  // 返回更新后的优先队列。
  return this;
}
```

### changePriority(item, priority) 方法

```javascript
/**
 * 改变队列中某个项目的优先级。
 * @param {*} item - 我们要重新设置优先级的项目。
 * @param {number} priority - 新的项目优先级。
 * @return {PriorityQueue} - 返回一个优先队列实例。
 */
changePriority(item, priority) {
  // 使用比较器通过比较值来移除队列中的项目。
  this.remove(item, new Comparator(this.compareValue));
  // 将项目以新的优先级添加回队列。
  this.add(item, priority);
  // 返回当前优先队列实例。
  return this;
}
```

### findByValue(item)方法

```javascript
/**
 * 通过值查找项目。
 * @param {*} item - 要查找的项目
 * @return {Number[]} - 返回包含数字的数组
 */
findByValue(item) {
  // 调用 find 方法，并传入 item 和一个使用 compareValue 方法作为参数的 Comparator 对象
  return this.find(item, new Comparator(this.compareValue));
}
```

### hasValue(item) 方法

```javascript
/**
 * 检查项目是否已经存在于队列中。
 * @param {*} item - 要检查的项目。
 * @return {boolean} - 如果项目存在于队列中，则返回true；否则返回false。
 */
hasValue(item) {
  // 调用findByValue方法查找项目，返回一个数字数组。
  return this.findByValue(item).length > 0;
}
```

### comparePriority(a, b) 方法

```javascript
/**
 * Compares priorities of two items.
 * 比较两个元素的优先级。
 * @param {*} a
 * @param {*} b
 * @return {number}
 */
comparePriority(a, b) {
  // Check if the priorities of `a` and `b` are equal.
  // 检查元素 `a` 和 `b` 的优先级是否相等。
  if (this.priorities.get(a) === this.priorities.get(b)) {
    // If they are equal, return 0.
    // 如果它们相等，则返回 0。
    return 0;
  }
  // Compare the priorities using the `get` method of the `priorities` map.
  // 使用 `priorities` map 的 `get` 方法比较优先级。
  // If the priority of `a` is less than the priority of `b`, return -1,
  // 如果 `a` 的优先级小于 `b` 的优先级，则返回 -1，
  // otherwise return 1.
  // 否则返回 1。
  return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
}
```

### compareValue(a, b) 方法

```javascript
/**
 * 比较两个值的大小。
 * @param {*} a - 第一个值
 * @param {*} b - 第二个值
 * @return {number} - 返回比较结果的数值
 */
compareValue(a, b) {
  // 如果 a 和 b 相等，则返回 0
  if (a === b) {
    return 0;
  }
  // 如果 a 小于 b，则返回 -1，否则返回 1
  return a < b ? -1 : 1;
}
```
