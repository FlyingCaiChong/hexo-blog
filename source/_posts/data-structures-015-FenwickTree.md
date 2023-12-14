---
title: JavaScript Algorithms and Data Structures 源码分析(15) -- 芬威克树/Fenwick Tree
date: 2023-12-14 14:30:08
tags:
  - data structures
categories:
  - 数据结构与算法
---

## Fenwick 树

Fenwick 树（也称为二进制索引树）是一种数据结构，它可以高效地更新元素和计算数字表中的前缀和。

与一个平面数组相比，Fenwick 树在两个操作之间实现了更好的平衡：元素更新和前缀和计算。在一个平面数组中，你可以存储元素或前缀和。在第一种情况下，计算前缀和需要线性时间；在第二种情况下，更新数组元素需要线性时间（在这两种情况下，另一个操作可以在常量时间内完成）。Fenwick 树允许这两个操作在 O(log n)时间内完成。这是通过将数字表示为一棵树来实现的，其中每个节点的值是该子树中数字的总和。树结构允许只使用 O(log n)的节点访问来执行操作。

<!-- more -->

## 实现注意事项

二进制索引树是用数组表示的。二进制索引树的每个节点存储了给定数组的一些元素的和。二进制索引树的大小等于输入数组的大小 n。在当前的实现中，我们使用 n+1 作为大小以便于实现。所有的索引都是从 1 开始的。

![Binary Indexed Tree](https://www.geeksforgeeks.org/wp-content/uploads/BITSum.png)

下面的图片是一个动画示例，展示了逐个插入元素 [1, 2, 3, 4, 5] 来创建二进制索引树的过程。

![Fenwick Tree](https://upload.wikimedia.org/wikipedia/commons/d/dc/BITDemo.gif)

## FenwickTree

```js
export default class FenwickTree {
  /**
   * 构造函数创建一个空的树状数组，大小为'arraySize'
   * 但是，数组大小为size + 1，因为索引是基于1的。
   * 使用给定的数组大小创建树状数组对象。
   *
   * @param  {number} arraySize - 数组的大小。
   */
  constructor(arraySize) {
    // 存储数组的大小。
    this.arraySize = arraySize;

    // 创建大小为 arraySize + 1 的树状数组. 将树状数组的所有元素初始化为0。
    this.treeArray = Array(this.arraySize + 1).fill(0);
  }

  /**
   * 在 FenwickTree 的指定位置增加指定的值。
   *
   * @param  {number} position - FenwickTree 的位置。
   * @param  {number} value - 要增加的值。
   * @return {FenwickTree} - 更新后的 FenwickTree 对象。
   */
  increase(position, value) {
    // 检查位置是否在允许的范围内
    if (position < 1 || position > this.arraySize) {
      throw new Error("Position is out of allowed range");
    }

    // 从给定位置开始，通过增加当前索引的最低有效位来遍历 FenwickTree 数组
    for (let i = position; i <= this.arraySize; i += i & -i) {
      // 通过添加指定的值来更新当前索引处的值
      this.treeArray[i] += value;
    }

    // 返回更新后的 FenwickTree 对象
    return this;
  }

  /**
   * 查询从索引1到指定位置的和。
   *
   * @param  {number} position
   * @return {number}
   */
  query(position) {
    // 检查位置是否在允许的范围内
    if (position < 1 || position > this.arraySize) {
      throw new Error("Position is out of allowed range");
    }

    let sum = 0;
    // 遍历树数组以计算和
    for (let i = position; i > 0; i -= i & -i) {
      // 将当前索引处的值添加到和中
      sum += this.treeArray[i];
    }

    return sum;
  }

  /**
   * 查询从左索引到右索引的和。
   *
   * @param  {number} leftIndex - 左索引
   * @param  {number} rightIndex - 右索引
   * @return {number} - 和
   */
  queryRange(leftIndex, rightIndex) {
    // 检查左索引是否大于右索引。
    if (leftIndex > rightIndex) {
      // 如果左索引大于右索引，抛出错误。
      throw new Error("Left index can not be greater than right one");
    }

    // 如果左索引等于1，返回从索引0到右索引的和。
    if (leftIndex === 1) {
      return this.query(rightIndex);
    }

    // 返回从索引0到右索引的和减去从索引0到左索引减1的和。
    return this.query(rightIndex) - this.query(leftIndex - 1);
  }
}
```
