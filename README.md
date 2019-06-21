# Puppeteer Automated Test Suite

Jest Puppeteer wrapper for easy e2e testing and scraping.

## ディレクトリ構造

```
automated_test
│   .eslintrc.yml
|   package-lock.json
|   package.json
|___node_modules
|   |    ...
|   |____.bin
|        |    eslint
|   
|___helpers
|   |    test_env.js
|
│___Project-001_test_for_task_1
│   |    index.spec.js
|   |    pages.yml
|
└───Project-002_test_for_task_2
    │    index.spec.js
    │    pages.yml
```

| directory | description |
| --- | --- |
| root | 初期設定などテスト実行に必要なもの |
| node_modules | jest, eslintなど実行コマンド |
| helpers | 各テストに必要そうなヘルパー |
