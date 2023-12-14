---
title: JavaScript Algorithms and Data Structures 源码分析(14) -- 线段树 segment-tree
date: 2023-12-14 14:18:11
tags:
  - data structures
categories:
  - 数据结构与算法
---

## SegmentTree

<!-- more -->

```js
export default class SegmentTree {
  /**
   * 构造函数，用于创建线段树。
   * @param {number[]} inputArray - 输入数组。
   * @param {function} operation  - 用于对区间进行操作的二元函数（例如：求和，求最小值）。
   * @param {number} operationFallback - 操作的回退值（例如：求和时为0，求最小值时为Infinity）。
   */
  constructor(inputArray, operation, operationFallback) {
    // 存储输入数组、操作函数和操作的回退值。
    this.inputArray = inputArray;
    this.operation = operation;
    this.operationFallback = operationFallback;

    // 初始化线段树数组。
    this.segmentTree = this.initSegmentTree(this.inputArray);
    // 构建线段树。
    this.buildSegmentTree();
  }

  /**
   * 根据输入数组初始化线段树数组。
   * @param {number[]} inputArray - 输入数组。
   * @return {number[]} - 初始化后的线段树数组。
   */
  initSegmentTree(inputArray) {
    let segmentTreeArrayLength;
    const inputArrayLength = inputArray.length;

    // 检查输入数组的长度是否是2的幂。
    if (isPowerOfTwo(inputArrayLength)) {
      // 如果长度是2的幂，则根据长度计算线段树数组的长度。
      segmentTreeArrayLength = 2 * inputArrayLength - 1;
    } else {
      // 如果长度不是2的幂，则找到下一个2的幂并用它来计算线段树数组的长度。
      const currentPower = Math.floor(Math.log2(inputArrayLength));
      const nextPower = currentPower + 1;
      const nextPowerOfTwoNumber = 2 ** nextPower;
      segmentTreeArrayLength = 2 * nextPowerOfTwoNumber - 1;
    }
    // 创建一个长度为计算出的线段树数组长度的新数组，并将其填充为null。
    return new Array(segmentTreeArrayLength).fill(null);
  }

  /**
   * 构建线段树。
   */
  buildSegmentTree() {
    // 将左索引设置为0。
    const leftIndex = 0;
    // 将右索引设置为输入数组的长度减1。
    const rightIndex = this.inputArray.length - 1;
    // 将位置设置为0。
    const position = 0;
    // 使用给定的参数递归构建树。
    this.buildTreeRecursively(leftIndex, rightIndex, position);
  }

  /**
   * 递归构建线段树。
   *
   * @param {number} leftInputIndex - 输入数组中左侧元素的索引。
   * @param {number} rightInputIndex - 输入数组中右侧元素的索引。
   * @param {number} position - 当前在线段树中的位置。
   */
  buildTreeRecursively(leftInputIndex, rightInputIndex, position) {
    // 如果左侧和右侧输入索引相等，说明我们已经到达了线段树的叶子节点。
    // 我们将对应的元素从输入数组复制到线段树中。
    if (leftInputIndex === rightInputIndex) {
      this.segmentTree[position] = this.inputArray[leftInputIndex];
      return;
    }

    // 将输入数组分成两半并递归处理。
    const middleIndex = Math.floor((leftInputIndex + rightInputIndex) / 2);
    // 处理输入数组的左半部分。
    this.buildTreeRecursively(leftInputIndex, middleIndex, this.getLeftChildIndex(position));
    // 处理输入数组的右半部分。
    this.buildTreeRecursively(middleIndex + 1, rightInputIndex, this.getRightChildIndex(position));

    // 一旦树中的每个叶子节点都不为空，我们可以通过应用提供的操作函数自底向上构建树。
    this.segmentTree[position] = this.operation(this.segmentTree[this.getLeftChildIndex(position)], this.segmentTree[this.getRightChildIndex(position)]);
  }

  /**
   * 在段树中执行范围查询。
   *
   * @param {number} queryLeftIndex - 查询范围的左索引。
   * @param {number} queryRightIndex - 查询范围的右索引。
   * @return {number} - 范围查询的结果。
   */
  rangeQuery(queryLeftIndex, queryRightIndex) {
    // 将左索引和右索引设置为输入数组的边界。
    const leftIndex = 0;
    const rightIndex = this.inputArray.length - 1;
    // 将初始位置设置为段树的根节点。
    const position = 0;
    // 调用递归辅助函数执行范围查询。
    return this.rangeQueryRecursive(queryLeftIndex, queryRightIndex, leftIndex, rightIndex, position);
  }

  /**
   * 递归地在段树中执行范围查询，使用提供的操作函数。
   *
   * @param {number} queryLeftIndex - 查询范围的左索引
   * @param {number} queryRightIndex - 查询范围的右索引
   * @param {number} leftIndex - 输入数组段的左索引
   * @param {number} rightIndex - 输入数组段的右索引
   * @param {number} position - 二叉树中的根位置
   * @return {number} - 范围查询的结果
   */
  rangeQueryRecursive(queryLeftIndex, queryRightIndex, leftIndex, rightIndex, position) {
    // 如果查询范围完全覆盖当前段，则返回当前位置的值
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      // Total overlap.
      return this.segmentTree[position];
    }
    // 如果查询范围与当前段没有重叠，则返回默认值
    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      // No overlap.
      return this.operationFallback;
    }

    // 如果存在部分重叠，将当前段分成两半，并递归地在两半上执行范围查询
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    const leftOperationResult = this.rangeQueryRecursive(queryLeftIndex, queryRightIndex, leftIndex, middleIndex, this.getLeftChildIndex(position));

    const rightOperationResult = this.rangeQueryRecursive(queryLeftIndex, queryRightIndex, middleIndex + 1, rightIndex, this.getRightChildIndex(position));
    // 使用提供的操作函数合并左半部分和右半部分的查询结果
    return this.operation(leftOperationResult, rightOperationResult);
  }

  /**
   * 计算树中左子节点的索引
   * @param {number} parentIndex - 父节点的索引
   * @return {number} - 左子节点的索引
   */
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  /**
   * 计算树中右子节点的索引
   * @param {number} parentIndex - 父节点的索引
   * @return {number} - 右子节点的索引
   */
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
}
```
