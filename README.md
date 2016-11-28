## React Code Window

Small wrapper around <a href="https://github.com/conorhastings/react-syntax-highlighter">React Syntax Highlighter</a>

You can see a <a href="http://conor.rodeo/react-code-window/">demo here</a>.

<img src="http://i.imgur.com/lq4EyCS.gif" />

### Use

`npm install react-code-window --save`

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
