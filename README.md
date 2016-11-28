## React Code Window

Small wrapper around <a href="https://github.com/conorhastings/react-syntax-highlighter">React Syntax Highlighter</a>

<img src="http://i.imgur.com/lq4EyCS.gif" />

### Use

#### props
* `width` - the width of a component, can be a number, or a string with %, px, vw, etc.. value
* `title` - the tile of the code window

```js
import CodeWindow from 'react-code-window';
const Component = () => {
  const code = '(num) => num + 1';
  return <CodeWindow title={'object-value-equality.js'} width="70%">{code}</CodeWindow>;
}
```