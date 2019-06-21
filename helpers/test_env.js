/**
 * テスト実施する環境を設定するクラス
 */
class TestEnv {
  /**
   * @param {object} args - protocol, domain, port定義
   */
  constructor(args) {
    this.protocol = args.protocol || 'https';
    this.domain = args.domain;
    this.port = args.port || '';
    this.url = (path) => {
      if (!this.domain) {
        throw new Error('This test needs a domain. / ドメイン名が指定されていません。');
      }
      return this.protocol + '://' + this.domain + this.port + path;
    };
  }

  /**
   * @param {string} path - パス
   * @return {string} URI - 環境と合体したいURI
   */
  withPath(path='') {
    return this.url(path);
  }
}

module.exports = TestEnv;
