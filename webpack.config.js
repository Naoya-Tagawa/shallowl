const path = require('path');

module.exports = {
  // 既存の設定やプラグインなどを含む適切なwebpackの設定をここに追加します。

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false  // fsモジュールはブラウザではサポートされません。
    }
  }
};
