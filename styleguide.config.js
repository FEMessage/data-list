const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')
const glob = require('glob')

const demos = ['docs/basic.md', ...glob.sync('docs/!(basic|faq).md')]
const demoSections = demos.map(filePath => ({
  name: path.basename(filePath, '.md'),
  content: filePath
}))

module.exports = {
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/FEMessage/data-list'
  },
  require: ['./styleguide/global.requires.js'],
  sections: [
    {
      name: 'Components',
      components: 'src/data-list.vue',
      usageMode: 'expand'
    },
    {
      name: 'Demo',
      sections: demoSections
    },
    {
      name: 'FAQ',
      content: 'docs/faq.md'
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
