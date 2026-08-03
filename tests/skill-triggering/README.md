# 触发测试

验证 skill 的 description 能否在**不提 skill 名**的自然表述下正确触发。

## 怎么跑

手动跑。开一个**全新会话**（不能带本仓库的上下文），把 `cases.md` 里的
prompt 原样发给模型，观察它激活了哪个 skill。

## 判定

- **PASS**：激活了 `期望` 列的 skill
- **FAIL**：激活了别的 skill，或没激活任何 skill

FAIL 时改对应 skill 的 description（加/删触发词、调整"不用于"），
**不要**改测试用例去迁就实现。

## 为什么手动

skill 触发是模型行为，无法用脚本断言。这些用例的价值在于：
改 description 之前先跑一遍，改完再跑一遍，对比有没有引入回归。
