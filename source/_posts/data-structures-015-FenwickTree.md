---
title: JavaScript Algorithms and Data Structures 源码分析(15) -- 芬威克树/Fenwick Tree
date: 2023-12-14 14:30:08
tags:
  - data structures
categories:
  - 数据结构与算法
---

## FenwickTree

<!-- more -->

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
