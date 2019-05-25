const {
  FuseBox,
  WebIndexPlugin,
  SVGPlugin,
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  QuantumPlugin
} = require('fuse-box');
const { src, task, context } = require('fuse-box/sparky');

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target: 'browser@es6',
        hash: this.isProduction,
        useTypescriptCompiler: true,
        plugins: [
          [
            SassPlugin({
              importer: true,
              outputStyle: 'compressed'
            }),
            CSSResourcePlugin({ dist: 'dist/css-resources' }),
            CSSPlugin()
          ],
          SVGPlugin(),
          WebIndexPlugin({
            template: 'public/index.html'
          }),
          this.isProduction &&
            QuantumPlugin({
              uglify: true,
              css: true
            })
        ]
      });
    }
    createBundle(fuse) {
      const app = fuse.bundle('app');
      if (!this.isProduction) {
        app.watch();
        app.hmr();
      }
      app.instructions('>index.tsx');
      return app;
    }
  }
);

task('clean', () =>
  src('dist')
    .clean('dist')
    .exec()
);

task('default', ['clean'], async context => {
  const fuse = context.getConfig();
  fuse.dev();
  context.createBundle(fuse);
  await fuse.run();
});

task('dist', ['clean'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  fuse.dev(); // remove it later
  context.createBundle(fuse);
  await fuse.run();
});
