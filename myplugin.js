class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('My Plugin', (stats) => {
      console.log('my plugin: done');
    });

    // compiler.plugin() 함수로 후처리
    compiler.plugin('emit', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      compilation.assets['main.js'].source = () => {
        const banner = ['/**', ' * 이것은 BannerPlugin이 처리한 결과!', ' * Build Date: 2020-07-30', ' */', ''].join('\n');
        return banner + '\n' + source;
      };
      console.log(source);
      callback();
    });
  }
}

module.exports = MyPlugin;
