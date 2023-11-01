---
title: JavaScript Algorithms and Data Structures 源码分析(4) -- 队列 Queue
date: 2023-11-01 15:38:19
tags:
---

## 队列

在计算机科学中, 一个 **队列(queue)** 是一种特殊类型的抽象数据类型或集合。集合中的实体按顺序保存。

队列基本操作有两种：入队和出队。从队列的后端位置添加实体，称为入队；从队列的前端位置移除实体，称为出队。

队列中元素先进先出 FIFO (first in, first out)的示意

<!-- more -->

![Queue](../images/data-structures/queue.jpeg)

```javascript
export default class Queue {
  // 初始化队列
  constructor() {
    // 使用单向链表实现
    // 创建一个空的单向链表
    this.linkedList = new LinkedList();
  }

  /**
   * 检查队列是否为空.
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * 查看队列头部的元素，但不移除它
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * 在队列的末尾添加一个元素.
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * 从队列开头移除元素并返回它
   */
  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * 将队列转换为字符串形式
   * @param [callback]
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
```

---

- 源码地址: [JavaScript Algorithms and Data Structures](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/queue/Queue.js)
