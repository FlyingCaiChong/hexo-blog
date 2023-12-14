---
title: JavaScript Algorithms and Data Structures 源码分析(12) -- AVL 树 avl-tree
date: 2023-12-14 14:12:59
tags:
  - data structures
categories:
  - 数据结构与算法
---

## AvlTree

<!-- more -->

```js
export default class AvlTree extends BinarySearchTree {
  /**
   * @param {*} value
   */
  insert(value) {
    // 执行普通的二叉搜索树插入操作。
    super.insert(value);

    // 从插入的节点开始向上遍历到根节点，并在此过程中检查平衡因子。
    // 找到刚插入的节点
    let currentNode = this.root.find(value);
    while (currentNode) {
      // 检查当前节点的平衡因子，并根据需要执行旋转操作
      this.balance(currentNode);
      // 移动到父节点
      currentNode = currentNode.parent;
    }
  }

  /**
   * 从二叉搜索树中移除一个值，并重新平衡树。
   * @param {*} value - 要移除的值。
   * @return {boolean} - 如果成功移除了值则返回true，否则返回false。
   */
  remove(value) {
    // 调用父类的remove方法从树中移除值。
    super.remove(value);

    // 从根节点开始平衡树。
    this.balance(this.root);
  }

  /**
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    // 如果平衡因子大于1（节点左重）
    if (node.balanceFactor > 1) {
      // 如果左子节点的平衡因子大于0（左-左旋转）或小于0（左-右旋转），则执行左旋转
      if (node.left.balanceFactor > 0) {
        // 执行左-左旋转
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        // 执行左-右旋转
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      // 如果平衡因子小于-1（节点右重）
      // 如果右子节点的平衡因子小于0（右-右旋转）或大于0（右-左旋转），则执行右旋转
      if (node.right.balanceFactor < 0) {
        // 执行右-右旋转
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        // 执行右-左旋转
        this.rotateRightLeft(node);
      }
    }
  }

  /**
   * 将二叉搜索树向左旋转。
   * @param {BinarySearchTreeNode} rootNode - 要旋转的树的根节点。
   */
  rotateLeftLeft(rootNode) {
    // 将左节点从根节点分离。
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // 将左节点设置为根节点的父节点的左子节点。
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      // 如果根节点是根节点，则将左节点设置为新的根节点。
      this.root = leftNode;
    }

    // 如果左节点有右子节点，则将其分离并将其作为根节点的左子节点。
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }

    // 将根节点附加到左节点的右侧。
    leftNode.setRight(rootNode);
  }

  /**
   * 将给定的二叉搜索树节点先向左旋转，然后再向右旋转。
   * @param {BinarySearchTreeNode} rootNode - 二叉搜索树的根节点。
   */
  rotateLeftRight(rootNode) {
    // 将左节点从根节点上分离，因为它将被替换。
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    // 将右节点从左节点上分离。
    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    // 保留 leftRightNode 的左子树。
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    // 将 leftRightNode 附加到根节点上。
    rootNode.setLeft(leftRightNode);

    // 将 leftNode 作为 leftRightNode 的左节点。
    leftRightNode.setLeft(leftNode);

    // 进行左-左旋转。
    this.rotateLeftLeft(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightLeft(rootNode) {
    // 分离要替换的右节点
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // 分离右节点的左节点
    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    // 如果右节点的左节点存在右子节点，则分离右节点的右子节点
    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    // 将右左节点连接到根节点的右侧
    rootNode.setRight(rightLeftNode);

    // 将右节点作为右左节点的右子节点
    rightLeftNode.setRight(rightNode);

    // 进行右右旋转
    this.rotateRightRight(rootNode);
  }

  /**
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightRight(rootNode) {
    // 从根节点中分离右子节点。
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    // 将右子节点设置为根节点的父节点的右子节点。
    // 如果根节点有父节点，则将右子节点设置为父节点的新右子节点。
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      // 如果根节点是树的根节点，则将右子节点设置为新的根节点。
      this.root = rightNode;
    }

    // 如果右子节点有左子节点，则将左子节点从右子节点中分离，并将其作为根节点的新右子节点。
    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    // 将根节点作为右子节点的左子节点。
    rightNode.setLeft(rootNode);
  }
}
```
