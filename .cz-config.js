module.exports = {
  types: [
    // { value: 'init', name: '🎉 init: \t 初始化项目' },
    { value: "feat", name: "✨ feat:\t添加新特性" },
    { value: "fix", name: "🐛 fix:\t修改bug" },
    { value: "merge", name: "🔀 merge:\t代码合并" },
    { value: "docs", name: "📝 docs:\t新增或更新文档" },
    {
      value: "style",
      name: "💄 style:\t格式（不影响代码运行的变动, 注意⚠️, 不是指css样式更改）",
    },
    {
      value: "refactor",
      name: "♻️  refactor:\tCode 重构（即不是新增功能，也不是修改bug的代码变动）",
    },
    {
      value: "perf",
      name: "⚡️ perf:\t性能提升",
    },
    {
      value: "test",
      name: "✅ test:\t增加测试用例",
    },
    {
      value: "chore",
      name: "🚚 chore:\t构建过程或辅助工具的变动",
    },
    { value: "revert", name: "⏪️ revert:\t回滚到上一个版本" },
    { value: "wip", name: "🚧 wip:\t正在开发中..." },

    {
      value: "ci",
      name: "💚 ci:\t添加或更新关于构建过程的信息",
    },
  ],
  scopeOverrides: {
    fix: [
      { name: "merge" },
      { name: "style" },
      { name: "e2eTest" },
      { name: "unitTest" },
    ],
  },

  messages: {
    type: "选择一种你的提交类型:",
    subject: "短说明:\n",
    breaking: "非兼容性说明 (可选):\n",
    confirmCommit: "确定提交说明?(yes/no)",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"], // 当提交类型为feat、fix时才有破坏性修改选项
  skipQuestions: ["body", "scope", "footer", "customScope"],
  subjectLimit: 100,
};
