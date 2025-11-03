# Husky設定ドキュメント

このプロジェクトでは、Git操作の品質を保証するためにHusky v9を使用しています。

## 概要

Huskyは、Gitフックを簡単に管理するためのツールです。コミット、プッシュ、マージなどのGit操作時に自動的にスクリプトを実行し、コード品質を保証します。

## 現在の設定

このプロジェクトでは以下の3つのGitフックを設定しています：

| フック               | 実行タイミング                   | 主な処理                              |
| -------------------- | -------------------------------- | ------------------------------------- |
| `pre-commit`         | コミット前                       | TypeScript型チェック、lint-staged実行 |
| `commit-msg`         | コミットメッセージ作成後         | Conventional Commits形式の検証        |
| `prepare-commit-msg` | コミットメッセージエディタ起動前 | ブランチ名からプレフィックス自動追加  |

## 設定されているフック

### 1. pre-commit

**実行タイミング**: コミット前

**処理内容**:

- lint-stagedによる以下の処理（ステージングされたファイルのみ）:
  - ESLintによるコード品質チェック（キャッシュ有効）
  - Stylelintによるスタイルチェック（キャッシュ有効）
  - Prettierによるコードフォーマット（キャッシュ有効）
- TypeScript型チェック (`pnpm exec tsc --noEmit --incremental`)

**目的**: コミット前にコードの品質を保証し、フォーマットを統一

**エラー時の動作**: 型エラーやlintエラーがある場合、コミットは中断されます

**高速化の仕組み**:

- キャッシュを活用して2回目以降の実行を高速化
- TypeScriptの増分ビルドで型チェックを効率化
- ステージングされたファイルのみを対象とするため、大規模プロジェクトでも高速

### 2. commit-msg

**実行タイミング**: コミットメッセージ作成後

**処理内容**:

- commitlintによるコミットメッセージの検証
- Conventional Commits形式のチェック

**目的**: 統一されたコミットメッセージフォーマットを強制

**エラー時の動作**: 形式に従わないメッセージの場合、コミットは中断され、許可される形式が表示されます

**許可される形式**:

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントの更新
style: コードスタイルの変更（機能に影響しない）
refactor: リファクタリング
test: テストの追加・修正
chore: ビルドプロセスやツールの変更
perf: パフォーマンス改善
ci: CI設定の変更
build: ビルドシステムの変更
revert: 変更の取り消し
```

### 3. prepare-commit-msg

**実行タイミング**: コミットメッセージエディタ起動前

**処理内容**:

- ブランチ名に基づいてコミットメッセージのプレフィックスを自動追加

**目的**: ブランチ命名規則を活用して、コミットメッセージの入力を簡略化

**ブランチ名とプレフィックスの対応**:

- `feature/` または `feat/` → `feat: `
- `fix/`、`bugfix/`、`hotfix/` → `fix: `
- `docs/` → `docs: `
- `style/` → `style: `
- `refactor/` → `refactor: `
- `test/` → `test: `
- `chore/`、`build/`、`ci/` → `chore: `
- `perf/` → `perf: `

**除外条件**:

- マージコミット、squash、amendの場合
- main、master、develop、releaseブランチ
- 既にConventional Commits形式のメッセージの場合
- コメント行や空行の場合

## 使用例

### 1. フィーチャーブランチでの作業

```bash
# フィーチャーブランチを作成
git checkout -b feat/user-authentication

# コードを編集後、コミット
git add .
git commit
# → prepare-commit-msgが自動的に "feat: " を追加
# → エディタで "add user login functionality" と入力
# → 最終的なメッセージ: "feat: add user login functionality"
```

### 2. バグ修正ブランチでの作業

```bash
# バグ修正ブランチを作成
git checkout -b fix/login-error

# バグを修正後、コミット
git commit -m "resolve authentication timeout issue"
# → prepare-commit-msgが自動的に "fix: " を追加
# → 最終メッセージ: "fix: resolve authentication timeout issue"
```

### 3. 型エラーがある場合

```bash
git commit -m "add new component"
# → pre-commitフックが実行
# → TypeScript型チェックでエラー発見
# ❌ TypeScript type check failed
# → コミット中断、エラーを修正する必要あり
```

## パフォーマンス最適化

### キャッシュの活用

このプロジェクトでは、以下のツールでキャッシュを活用して高速化しています：

1. **ESLint**: `--cache`オプションで変更されていないファイルのチェックをスキップ
2. **Stylelint**: `--cache`オプションで変更されていないファイルのチェックをスキップ
3. **Prettier**: `--cache`オプションで既にフォーマット済みのファイルをスキップ
4. **TypeScript**: `--incremental`オプションで増分ビルドを活用

### キャッシュファイルの場所

すべてのキャッシュは`./node_modules/.cache/`配下に保存されます：

- ESLint: `./node_modules/.cache/eslint/`
- Stylelint: `./node_modules/.cache/stylelint/`
- Prettier: `./node_modules/.cache/prettier/`
- TypeScript: プロジェクトルートの`tsconfig.tsbuildinfo`

### パフォーマンスの目安

- **初回実行**: すべてのファイルをチェック（数秒〜数十秒）
- **2回目以降**: キャッシュがあるファイルはスキップ（1秒未満）
- **部分的な変更**: 変更したファイルのみチェック（1〜数秒）

### キャッシュのクリア

キャッシュに問題がある場合は、以下のコマンドでクリアできます：

```bash
# すべてのキャッシュをクリア
rm -rf node_modules/.cache
rm -f tsconfig.tsbuildinfo .eslintcache .stylelintcache .prettiercache

# 個別にクリア
rm -rf node_modules/.cache/eslint
rm -rf node_modules/.cache/stylelint
rm -rf node_modules/.cache/prettier
rm -f tsconfig.tsbuildinfo
```

## フックの無効化

特定の状況でフックをスキップする必要がある場合:

```bash
# すべてのフックをスキップ
git commit --no-verify -m "commit message"
git push --no-verify

# または環境変数を使用
HUSKY=0 git commit -m "commit message"
```

**注意**: フックのスキップは緊急時のみ使用し、通常は推奨されません。

## トラブルシューティング

### フックが実行されない

```bash
# Huskyを再インストール
pnpm install
```

### 実行権限がない

```bash
# フックファイルに実行権限を付与
chmod +x .husky/*
```

### 特定のフックを一時的に無効化

該当するフックファイルの先頭に`exit 0`を追加:

```bash
#!/usr/bin/env sh
exit 0  # 一時的に無効化
# ...残りのコード
```

## ベストプラクティス

1. **フックはスキップしない**: 品質を保つため、通常はフックをスキップしないでください
2. **ブランチ命名規則に従う**:
   prepare-commit-msgの恩恵を受けるため、規約に従ったブランチ名を使用してください
   - 例: `feat/add-login`, `fix/auth-bug`, `docs/update-readme`
3. **早期にコミット**: pre-commitでエラーが出た場合、早めに修正してコミットしましょう
4. **コミットメッセージは明確に**: Conventional
   Commits形式に従い、わかりやすいメッセージを書きましょう

## 参考リンク

- [Husky公式ドキュメント](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)
