---
title: JavaScript Algorithms and Data Structures 源码分析(2) -- 单向链表LinkedList
date: 2023-10-29 17:45:14
tags:
  - data structures
categories:
  - 数据结构与算法
---

## 链表

在计算机科学中, 一个 **链表** 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。

在最简单的形式下，每个节点由数据和到序列中下一个节点的引用(换句话说，链接)组成。这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。

更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。链表的一个缺点是访问时间是线性的(而且难以管道化)。

更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。

<!-- more -->

## LinkedListNode 链表节点类

```javascript
/**
 * 链表节点类
 */
class LinkedListNode {
  /**
   * 构造函数
   * @param {*} value 节点值
   * @param {LinkedListNode} next 下一个节点，默认为null
   */
  constructor(value, next = null) {
    this.value = value; // 当前节点的值
    this.next = next; // 下一个节点的引用
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

- `constructor` 构造函数用于创建一个链表节点对象。它接受两个参数：`value` 表示节点的值，`next` 表示下一个节点的引用，默认为 `null`。
- `toString` 方法返回节点的字符串表示形式。它接受一个回调函数作为参数，用于将节点的值转换为字符串。如果提供了回调函数，则将节点的值传递给回调函数进行转换；否则，直接将节点的值转换为字符串并返回。

## LinkedList 是一个单向链表的实现类. 它有以下方法:

### constructor(comparatorFunction)方法

作用: `LinkedList`类的构造函数.

接受一个可选的比较函数作为参数.它会将 `LinkedList` 对象的 `head`（头节点）和 `tail`（尾节点）属性初始化为 `null`。它还创建了一个 `Comparator`（比较器）类的实例，并将其赋值给 `LinkedList` 对象的 `compare` 属性。

```javascript
  /**
  * 构造函数
  */
  constructor(comparatorFunction) {
    // 头节点
    this.head = null;
    // 尾节点
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }
```

### prepend(value)方法

作用: 在链表的开头插入一个新节点.

接受一个值作为参数，并创建一个带有该值的新节点，该节点成为链表的新头部。如果链表还没有尾部，则将新节点设置为尾部。最后，它返回更新后的链表。

```javascript
  prepend(value) {
    // 创建一个新节点, 并将新节点的next指向原来的头节点
    const newNode = new LinkedListNode(value, this.head);
    // 将head引用指向新节点, 新节点成为链表的新头部节点.
    this.head = newNode;

    // 如果链表没有尾节点, 则将新节点设置为尾节点.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }
```

### append(value)方法

作用: 在链表的末尾插入一个新节点.

首先，它创建一个新节点，该节点包含给定的值。接下来，它检查链表是否为空，即是否存在头节点。如果链表为空，将新节点设置为头节点和尾节点。如果链表不为空，将新节点连接到链表的末尾，并将新节点设置为新的尾节点。最后，返回更新后的链表。

```javascript
  append(value) {
    // 创建一个新的节点
    const newNode = new LinkedListNode(value);

    // 如果还没有头节点，将新节点设为头节点和尾节点
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

     // 将新节点连接到链表的末尾
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }
```

### insert(value, index)方法

作用: 在指定位置插入一个新节点.

首先，它将原始索引转换为非负整数。然后，它检查索引是否为 0，如果是，则调用 `prepend` 方法在链表头部插入新节点。如果索引不为 0，则遍历链表找到目标索引的前一个节点。接下来，将新节点插入到目标索引的后面，并更新节点的 `next` 属性。如果有尾节点, 将新节点连接到链表的末尾，并将新节点设置为新的尾节点，如果链表为空，则将新节点设置为头节点和尾节点。最后，返回更新后的链表。

```javascript
  insert(value, rawIndex) {
    // 将原始索引转换为非负整数
    const index = rawIndex < 0 ? 0 : rawIndex;

    // 如果索引为 0，调用 prepend 方法在链表头部插入新节点
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      // 遍历链表，找到目标索引的前一个节点
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      // 如果找到了目标索引的前一个节点
      if (currentNode) {
        // 将新节点插入到目标索引的后面
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        // 如果有尾节点
        if (this.tail) {
         // 将新节点连接到链表的末尾，并将新节点设置为新的尾节点
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          // 如果链表为空且没有尾节点，将新节点设置为头节点和尾节点
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }
```

### delete(value)方法

作用: 删除链表中的一个节点.

该方法接收一个 `value` 参数，并返回一个 `LinkedListNode` 对象。这个方法的作用是从链表中删除具有特定值的节点。它首先检查链表是否为空。如果为空，则返回 `null`。如果链表不为空，则遍历链表并删除所有具有指定值的节点。最后，它检查尾节点是否具有指定值，并在必要时更新尾节点。然后返回被删除的节点。

```javascript
  delete(value) {
    // 如果链表为空，则直接返回 null
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 如果头节点的值与指定值相等，则删除头节点，并将下一个节点设为新的头节点
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    // 如果当前节点不为空
    if (currentNode !== null) {
      // 如果下一个节点的值与指定值相等，则删除下一个节点，并将当前节点的下一个节点设为下下个节点
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 检查尾节点是否为指定值，如果是，则更新尾节点
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    // 返回被删除的节点
    return deletedNode;
  }
```

### find({value, callback})方法

作用: 查找链表中的一个节点

该方法接收一个包含 `value` 和 `callback` 属性的对象作为参数。
如果链表为空，则直接返回 `null`。
方法从链表的头节点开始遍历，对于每个节点，它会根据以下两种情况进行判断：

1. 如果指定了 `callback`，则尝试通过回调函数来查找节点。如果回调函数返回 `true`，则返回当前节点。
2. 如果指定了 `value`，则尝试通过值来比较节点。如果节点的值与指定值相等，则返回当前节点。

如果遍历完整个链表后仍未找到满足条件的节点，则返回 `null`。

```javascript
  find({ value = undefined, callback = undefined }) {
    // 如果链表为空，则直接返回null
    if (!this.head) {
      return null;
    }

    // 从链表头开始遍历
    let currentNode = this.head;

    // 遍历链表的每个节点
    while (currentNode) {
      // 如果回调函数存在，并且对当前节点的值返回了true，则返回当前节点.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // 如果指定了查找的值，并且当前节点的值与指定值相等，则返回当前节点
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      // 移动到下一个节点
      currentNode = currentNode.next;
    }

    // 如果没有找到匹配的节点，则返回null
    return null;
  }
```

### deleteTail()方法

作用: 删除链表的尾节点，并返回被删除的尾节点。

首先，方法将当前尾节点保存在 `deletedTail` 变量中。
如果链表中只有一个节点，即头节点和尾节点相同，那么将头节点和尾节点都设为 `null`，并返回被删除的尾节点。
如果链表中有多个节点，方法会遍历链表直到倒数第二个节点，然后将该节点的 `next` 指针设为 `null`，即删除了尾节点。最后，更新链表的尾节点为倒数第二个节点。
最后，方法返回被删除的尾节点。

```javascript
  deleteTail() {
    // 将当前尾节点保存到 deletedTail 变量中
    const deletedTail = this.tail;

    // 如果头节点和尾节点相同，说明链表中只有一个节点
    if (this.head === this.tail) {
      // 将头节点和尾节点都设为 null
      this.head = null;
      this.tail = null;

      // 返回被删除的尾节点
      return deletedTail;
    }

    // 如果链表中有多个节点...

    // 从头节点开始遍历链表，直到找到倒数第二个节点
    let currentNode = this.head;
    while (currentNode.next) {
      // 如果当前节点的下一个节点是尾节点，说明当前节点是倒数第二个节点
      if (!currentNode.next.next) {
        // 将当前节点的 next 指针设为 null，删除尾节点
        currentNode.next = null;
      } else {
        // 否则，将当前节点指针移动到下一个节点
        currentNode = currentNode.next;
      }
    }

    // 更新尾节点为倒数第二个节点
    this.tail = currentNode;

    // 返回被删除的尾节点
    return deletedTail;
  }
```

### deleteHead()方法

作用: 删除链表的头节点，并返回被删除的头节点。

首先，方法检查链表是否为空。如果链表为空，则直接返回 `null`。
然后，方法将当前头节点保存在 `deletedHead` 变量中。
如果链表中有多个节点，方法将头节点更新为下一个节点。
如果链表中只有一个节点，即头节点和尾节点相同，那么将头节点和尾节点都设为 `null`。
最后，方法返回被删除的头节点。

```javascript
  deleteHead() {
    // 检查链表头是否为空
    if (!this.head) {
      // 如果为空，返回null
      return null;
    }

    // 将当前头节点赋值给`deletedHead`变量
    const deletedHead = this.head;

    // 检查头节点是否有下一个节点
    if (this.head.next) {
      // 如果有下一个节点，将头节点更新为下一个节点
      this.head = this.head.next;
    } else {
      // 如果没有下一个节点，将头节点和尾节点都设置为null
      this.head = null;
      this.tail = null;
    }

    // 返回被删除的头节点
    return deletedHead;
  }
```

### fromArray(values)方法

作用: 将一个数组转换成一个链表.

方法使用 `forEach` 遍历数组中的每个值，并使用 `append` 方法将每个值添加到链表的末尾。
最后，方法返回转换后的链表对象。

```javascript
  fromArray(values) {
    values.forEach((value) => this.append(value));
    return this;
  }
```

### toArray()方法

作用: 将链表转换成一个数组

首先，方法创建一个空数组 `nodes`，用于存储链表中的节点。
然后，方法从链表的头节点开始，通过循环遍历链表的每个节点。在循环中，将当前节点添加到 `nodes` 数组中，并将当前节点更新为下一个节点。
最后，方法返回包含链表中所有节点的数组。

```javascript
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    // 遍历节点
    while (currentNode) {
      // 将每个节点放到数组中
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }
```

### toString(callback)方法

作用: 将链表转换成一个字符串

首先，方法调用 `toArray()` 方法将链表转换为数组。
然后，方法使用 `map()` 方法遍历数组中的每个节点，并调用每个节点的 `toString()` 方法，将节点转换为字符串。如果提供了回调函数，则将回调函数应用于每个节点。
最后，方法使用 `toString()` 方法将转换后的数组转换为一个字符串，并返回该字符串。

```javascript
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }
```

### reverse()方法

作用: 反转链表

该方法会将链表中的节点顺序进行反转，即原来链表中的第一个节点变为新链表中的最后一个节点，原来链表中的最后一个节点变为新链表中的第一个节点，其余节点的顺序也会逆转。
方法会遍历链表，将每个节点的 `next` 指针指向其前一个节点，从而实现链表的反转。
最后，方法会更新链表的头节点和尾节点，并返回反转后的链表。

```javascript
  reverse() {
    // 初始化三个变量：currNode（当前节点）、prevNode（前一个节点）和nextNode（下一个节点）。
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    // 循环遍历链表，直到 currNode 变为 null。
    while (currNode) {
      // 将下一个节点存储在 nextNode 变量中。这是为了在修改 currNode 的 next 指针之前，避免丢失对下一个节点的引用。
      nextNode = currNode.next;

      // 将当前节点的下一个节点更改为指向前一个节点。这样就反转了 currNode 和原始顺序中的下一个节点之间的链接。
      currNode.next = prevNode;

      // 将 prevNode 和 currNode 向前移动一步。prevNode 变为当前节点，currNode 变为之前存储在 nextNode 变量中的下一个节点。
      prevNode = currNode;
      currNode = nextNode;
    }

    // 重置头指针和尾指针，以反映新的顺序。
    this.tail = this.head;
    this.head = prevNode;

    // 返回修改后的链表。
    return this;
  }
```

---

- 源码地址: [JavaScript Algorithms and Data Structures](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list/LinkedList.js)
