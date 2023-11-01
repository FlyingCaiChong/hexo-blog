---
title: JavaScript Algorithms and Data Structures 源码分析(3) -- 双向链表DoublyLinkedList
date: 2023-10-31 14:29:40
tags:
  - data structures
categories:
  - 数据结构与算法
---

---

## 双向链表

在计算机科学中, 一个 **双向链表(doubly linked list)** 是由一组称为节点的顺序链接记录组成的链接数据结构。每个节点包含两个字段，称为链接，它们是对节点序列中上一个节点和下一个节点的引用。开始节点和结束节点的上一个链接和下一个链接分别指向某种终止节点，通常是前哨节点或 null，以方便遍历列表。如果只有一个前哨节点，则列表通过前哨节点循环链接。它可以被概念化为两个由相同数据项组成的单链表，但顺序相反。

两个节点链接允许在任一方向上遍历列表。

在双向链表中进行添加或者删除节点时,需做的链接更改要比单向链表复杂得多。这种操作在单向链表中更简单高效,因为不需要关注一个节点（除第一个和最后一个节点以外的节点）的两个链接,而只需要关注一个链接即可。

<!-- more -->

![DoublyLinkedList](../images/data-structures/doubly-linked-list.jpeg)

## DoublyLinkedListNode 双向链表节点类

```javascript
/**
 * 双向链表节点类
 */
class DoublyLinkedListNode {
  /**
   * 构造函数
   * @param {*} value 节点值
   * @param {DoublyLinkedListNode} prev 前一个节点引用
   * @param {DoublyLinkedListNode} next 后一个节点引用
   */
  constructor(value, prev = null, next = null) {
    this.value = value; // 节点值
    this.prev = prev; // 前一个节点的引用
    this.next = next; // 后一个节点的引用
  }

  /**
   * 返回节点的字符串表示形式
   * @param {function} callback 转换节点值的回调函数
   * @return {string} 节点的字符串表示形式
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
```

`constructor` 构造函数用于创建一个双向链表节点对象。它接受一个值作为参数，并可选地接受前一个节点和后一个节点的引用。构造函数将该值封装为节点的值，并将前一个节点和后一个节点的引用分别存储在 prev 和 next 属性中。

## DoublyLinkedList 双向链表实现类

### constructor(comparatorFunction) 方法

双向链表的构造函数.
它接受一个可选的 `comparatorFunction` 参数，用于比较链表中的节点。构造函数将 `head` 和 `tail` 属性初始化为 `null`，并使用 `comparatorFunction` 创建一个 `Comparator` 对象。

```javascript
/**
 * @param {Function} [comparatorFunction]  // 接受一个可选的比较函数作为参数
 */
constructor(comparatorFunction) {
  /** @var DoublyLinkedListNode */  // 使用DoublyLinkedListNode变量声明注释
  this.head = null;  // 初始化头节点为null

  /** @var DoublyLinkedListNode */  // 使用DoublyLinkedListNode变量声明注释
  this.tail = null;  // 初始化尾节点为null

  this.compare = new Comparator(comparatorFunction);  // 创建一个Comparator对象，并使用传入的比较函数进行初始化
}
```

### prepend(value) 方法

用于在链表的开头添加一个新节点.

```javascript
/**
 * @param {*} value
 * @return {DoublyLinkedList}
 */
prepend(value) {
  // 创建一个新节点作为新的头节点，传入的value作为节点的值，当前的头节点作为新节点的next引用
  const newNode = new DoublyLinkedListNode(value, this.head);

  // 如果链表已经有头节点，将当前头节点的previous引用指向新节点，将新节点设为新的头节点
  if (this.head) {
    this.head.previous = newNode;
  }
  this.head = newNode;

  // 如果链表还没有尾节点，将新节点也设为尾节点
  if (!this.tail) {
    this.tail = newNode;
  }

  // 返回更新后的链表
  return this;
}
```

### append(value) 方法

将一个具有给定值的新节点添加到链表的末尾.
该方法首先创建一个新节点，节点的值为传入的 `value`。然后，它检查链表是否为空。如果链表为空，将新节点设置为头结点和尾节点，然后返回当前链表实例。如果链表不为空，将新节点连接到链表的末尾，即将当前尾节点的 next 属性指向新节点，同时将新节点的 previous 属性指向当前尾节点。最后，将新节点设置为链表的尾节点。

```javascript
/**
 * @param {*} value
 * @return {DoublyLinkedList}
 */
append(value) {
  // 创建一个新的节点，值为传入的 value
  const newNode = new DoublyLinkedListNode(value);

  // 如果链表为空，将新节点设置为头结点和尾节点
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;

    return this; // 返回当前链表实例
  }

  // 将新节点连接到链表的末尾
  this.tail.next = newNode;

  // 将当前尾节点设置为新节点的前一个节点
  newNode.previous = this.tail;

  // 将新节点设置为链表的尾节点
  this.tail = newNode;

  return this; // 返回当前链表实例
}
```

### delete(value) 方法

该方法通过遍历链表来查找具有指定值的节点。如果找到了该节点，则通过调整前驱节点和后继节点的指针来删除节点。如果被删除的节点是链表的头节点或尾节点，则相应地更新头指针或尾指针。

```javascript
/**
 * @param {*} value
 * @return {DoublyLinkedListNode}
 */
delete(value) {
  // 如果链表为空，直接返回null
  if (!this.head) {
    return null;
  }

  // 初始化被删除的节点为null，并从头节点开始遍历
  let deletedNode = null;
  let currentNode = this.head;

  // 遍历链表
  while (currentNode) {
    // 如果找到了与指定值相等的节点
    if (this.compare.equal(currentNode.value, value)) {
      deletedNode = currentNode;

      // 如果被删除的节点是头节点
      if (deletedNode === this.head) {
        // 设置头节点为下一个节点，成为新的头节点
        this.head = deletedNode.next;

        // 如果存在新的头节点，将其前驱指针设为null
        if (this.head) {
          this.head.previous = null;
        }

        // 如果被删除的节点同时是尾节点，则更新尾节点为null
        if (deletedNode === this.tail) {
          this.tail = null;
        }
      } else if (deletedNode === this.tail) {
        // 如果被删除的节点是尾节点

        // 设置尾节点为倒数第二个节点，成为新的尾节点
        this.tail = deletedNode.previous;
        this.tail.next = null;
      } else {
        // 如果被删除的节点是中间节点

        // 获取被删除节点的前驱节点和后继节点
        const previousNode = deletedNode.previous;
        const nextNode = deletedNode.next;

        // 调整前驱节点和后继节点的指针，将被删除节点从链表中删除
        previousNode.next = nextNode;
        nextNode.previous = previousNode;
      }
    }

    // 继续遍历下一个节点
    currentNode = currentNode.next;
  }

  // 返回被删除的节点
  return deletedNode;
}
```

### find({ value = undefined, callback = undefined }) 方法

在双向链表中查找节点.
它接收一个名为 `findParams` 的对象作为参数，该对象可以有两个属性：`value` 和 `callback`。方法通过遍历链表的节点，并检查回调函数是否对节点的值返回 `true`，或者检查节点的值是否与 `value` 属性相等（使用 `compare.equal` 方法）。如果找到匹配的节点，则返回该节点；否则返回 `null`。

```javascript
/**
 * @param {Object} findParams
 * @param {*} findParams.value
 * @param {function} [findParams.callback]
 * @return {DoublyLinkedListNode}
 */
find({ value = undefined, callback = undefined }) {
  // 如果链表为空，直接返回null
  if (!this.head) {
    return null;
  }

  // 从头节点开始遍历链表
  let currentNode = this.head;

  // 遍历链表的每个节点
  while (currentNode) {
    // 如果回调函数存在且回调函数返回true，则返回当前节点
    if (callback && callback(currentNode.value)) {
      return currentNode;
    }

    // 如果指定了value参数且当前节点的值等于value，则返回当前节点
    if (value !== undefined && this.compare.equal(currentNode.value, value)) {
      return currentNode;
    }

    // 继续遍历下一个节点
    currentNode = currentNode.next;
  }

  // 如果没有找到匹配的节点，则返回null
  return null;
}
```

### deleteTail() 方法

删除尾节点.

- 首先通过检查 `this.tail` 是否为 `null` 来判断链表是否为空。如果为空，表示没有尾部节点可以删除，所以返回 `null`。
- 如果链表只有一个节点，即 `this.head` 等于 `this.tail`，则将要删除的尾部节点保存到 `deletedTail` 变量中。将 `this.head` 和 `this.tail` 都置为 `null`，表示链表为空。然后返回被删除的尾部节点。
- 如果链表中有多个节点，则将要删除的尾部节点保存到 `deletedTail` 变量中。
  - 将 `this.tail` 更新为前一个节点，即将尾部节点指向前一个节点。
  - 将新的尾部节点的 `next` 指针置为 `null`，表示它是链表的最后一个节点。
  - 然后返回被删除的尾部节点。

```javascript
/**
 * @return {DoublyLinkedListNode}
 */
deleteTail() {
  // 检查链表是否为空
  if (!this.tail) {
    // 如果链表为空，没有尾部节点可以删除，返回null
    return null;
  }

  // 如果链表中只有一个节点
  if (this.head === this.tail) {
    // 保存要删除的尾部节点
    const deletedTail = this.tail;
    // 将头部和尾部节点都置为null，表示链表为空
    this.head = null;
    this.tail = null;

    // 返回被删除的尾部节点
    return deletedTail;
  }

  // 如果链表中有多个节点
  const deletedTail = this.tail;

  // 将尾部节点更新为前一个节点
  this.tail = this.tail.previous;
  // 将新的尾部节点的next指针置为null
  this.tail.next = null;

  // 返回被删除的尾部节点
  return deletedTail;
}
```

### deleteHead() 方法

用于删除链表的头节点。
如果链表为空，则返回 `null`。否则，它会将头节点保存到 `deletedHead` 变量中。如果头节点有下一个节点，它会将头节点更新为下一个节点，并将新的头节点的 `previous` 指针设为 `null`，断开与之前头节点的连接。如果头节点没有下一个节点，说明链表只有一个节点，那么它会将头节点和尾节点都设为 `null`，表示链表为空。最后，它会返回被删除的头节点。

```javascript
/**
 * @return {DoublyLinkedListNode} 返回被删除的头节点
 */
deleteHead() {
  // 如果链表为空，直接返回null
  if (!this.head) {
    return null;
  }

  // 将头节点保存到deletedHead变量中
  const deletedHead = this.head;

  // 如果头节点有下一个节点
  if (this.head.next) {
    // 更新头节点为下一个节点
    this.head = this.head.next;
    // 将新的头节点的previous指针设为null，断开与之前头节点的连接
    this.head.previous = null;
  } else {
    // 如果头节点没有下一个节点，说明链表只有一个节点
    // 将头节点和尾节点都设为null，表示链表为空
    this.head = null;
    this.tail = null;
  }

  // 返回被删除的头节点
  return deletedHead;
}
```

### toArray() 方法

链表转数组的方法.

```javascript
/**
 * @return {DoublyLinkedListNode[]}
 */
toArray() {
  // 创建一个空数组来存储节点
  const nodes = [];

  // 从链表头开始迭代
  let currentNode = this.head;

  // 循环遍历链表，直到当前节点为空
  while (currentNode) {
    // 将当前节点添加到节点数组中
    nodes.push(currentNode);

    // 移动到链表的下一个节点
    currentNode = currentNode.next;
  }

  // 返回包含链表所有节点的数组
  return nodes;
}
```

### fromArray(values) 方法

数组转双向链表.

```javascript
/**
 * @param {*[]} values - 需要转换为链表的值数组
 * @return {DoublyLinkedList} - 转换后的双向链表
 */
fromArray(values) {
  // 遍历值数组，对每个值执行 append 方法，将其添加到双向链表中
  values.forEach((value) => this.append(value));

  // 返回转换后的双向链表
  return this;
}
```

### toString(callback) 方法

```javascript
/**
 * @param {function} [callback] 可选参数，用于自定义每个节点的字符串表示
 * @return {string} 返回一个字符串表示，包括数组中每个节点的字符串表示
 */
toString(callback) {
  // 调用 toArray 方法获取节点数组，然后使用 map 方法遍历数组中的每个节点，并调用其 toString 方法，最后使用 toString 方法将结果转换为字符串
  return this.toArray().map((node) => node.toString(callback)).toString();
}
```

### reverse() 方法

反转一个双向链表.
它通过交换每个节点的 `next` 和 `previous` 指针来实现链表的反转。方法开始时，将三个变量进行初始化：`currNode` 设置为链表的头部，`prevNode` 设置为 `null`，`nextNode` 设置为 `null`。然后，进入一个循环，遍历链表中的每个节点。在循环内部，交换当前节点的 `next` 和 `previous` 指针，并更新 `prevNode` 和 `currNode` 变量。循环结束后，更新链表的 `head` 和 `tail` 指针以反映反转后的顺序，并返回修改后的链表。

```javascript
/**
 * 反转一个双向链表。
 * @returns {DoublyLinkedList}
 */
reverse() {
  // 初始化当前节点为链表头部
  let currNode = this.head;
  // 初始化前一个节点为null
  let prevNode = null;
  // 初始化下一个节点为null
  let nextNode = null;

  // 遍历链表中的每个节点
  while (currNode) {
    // 保存下一个节点的引用
    nextNode = currNode.next;
    // 保存前一个节点的引用
    prevNode = currNode.previous;

    // 将当前节点的next指针指向前一个节点
    currNode.next = prevNode;
    // 将当前节点的previous指针指向下一个节点
    currNode.previous = nextNode;

    // 将prevNode和currNode节点向前移动一步
    prevNode = currNode;
    currNode = nextNode;
  }

  // 重新设置头部和尾部节点
  this.tail = this.head;
  this.head = prevNode;

  // 返回修改后的链表
  return this;
}
```

---

- 源码地址: [JavaScript Algorithms and Data Structures](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/doubly-linked-list/DoublyLinkedList.js)
