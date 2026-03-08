export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 200], // 本文の行の長さを最大200文字に設定
    'footer-max-line-length': [2, 'always', 200], // フッターの行の長さを最大200文字に設定
    'subject-case': [0], // 件名の大文字小文字チェックを無効化
  },
};
