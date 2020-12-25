const path = require('path');
const license = require('rollup-plugin-license');

export default {
  input: './dist/esm/index.js',
  output: {
    file: './dist/simpleWebL10n.js',
    format: 'iife',
    name: 'SimpleWebL10n',
    sourcemap: false
  },
  plugins: [
    license({
        sourcemap: false,
        banner: {
          content: {
            file: path.join(__dirname, 'LICENSE')
          }
        }
      }
    )
  ]
}
