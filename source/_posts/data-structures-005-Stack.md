---
title: JavaScript Algorithms and Data Structures 源码分析(5) -- 栈 Stack
date: 2023-11-02 13:31:23
tags:
  - data structures
categories:
  - 数据结构与算法
---

## 栈

在计算机科学中, 一个 **栈(stack)** 是一种抽象数据类型,用作表示元素的集合,具有两种主要操作:

- **push**, 添加元素到栈的顶端(末尾);
- **pop**, 移除栈最顶端(末尾)的元素.

以上两种操作可以简单概括为“后进先出(LIFO = last in, first out)”。

此外,应有一个 `peek` 操作用于访问栈当前顶端(末尾)的元素。

"栈"这个名称,可类比于一组物体的堆叠(一摞书,一摞盘子之类的)。

<!-- more -->

栈的 push 和 pop 操作的示意

![Stack](../images/data-structures/stack.jpeg)

```javascript
// 定义栈类
export default class Stack {
  // 构造函数
  constructor() {
    // 使用链表实现栈，因为它们的操作非常相似。
    // 将栈的push/pop操作与链表的prepend/deleteHead操作进行比较。
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean} 返回栈是否为空
   */
  isEmpty() {
    // 如果链表的头节点为空，表示栈为空
    return !this.linkedList.head;
  }

  /**
   * @param {*} value 入栈的值
   */
  push(value) {
    // 入栈操作意味着将值放在栈的顶部。
    // 因此，我们只需要将新值添加到链表的开头即可。
    this.linkedList.prepend(value);
  }

  /**
   * @return {*} 返回栈顶的值
   */
  peek() {
    // 如果栈为空，则无法查看栈顶的值
    if (this.isEmpty()) {
      return null;
    }

    // 直接读取链表的头节点的值，而不删除它
    return this.linkedList.head.value;
  }

  /**
   * @return {*} 返回并删除栈顶的值
   */
  pop() {
    // 尝试从链表中删除第一个节点（头节点）。
    // 如果没有头节点（链表为空），则返回null。
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @return {*[]} 返回栈中的所有值
   */
  toArray() {
    // 将链表转换为数组，并返回数组中每个链表节点的值
    return this.linkedList.toArray().map((linkedListNode) => linkedListNode.value);
  }

  /**
   * @param {function} [callback] 回调函数
   * @return {string} 返回栈的字符串表示
   */
  toString(callback) {
    // 将链表转换为字符串
    return this.linkedList.toString(callback);
  }
}
```
