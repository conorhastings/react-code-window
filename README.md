## React Code Window

Small wrapper around <a href="https://github.com/conorhastings/react-syntax-highlighter">React Syntax Highlighter</a>

You can see a <a href="http://conor.rodeo/react-code-window/">demo here</a>.

<img src="http://i.imgur.com/lq4EyCS.gif" />

### Use

`npm install react-code-window --save`

### required props

* `width` - the width of a component, can be a number, or a string with %, px, vw, etc.. value
* `title` - the tile of the code window

### optional props

* `minimized` - whether or not the component should be minimized. By default this will be controlled by internal component state, but if you wish to control it via props hooks for minimize and maximize clicks are provided and explained below.
* `onMinimize` - called when minimize button is clicked.
* `onMaximize` - called when maximize button is clicked.
* `allowMinimizeMaximize` - boolean that determines whether or not clicking the minimize/maximize events should cause hooks to be fired/state to be set

```js
import CodeWindow from 'react-code-window';
const Component = () => {
  const code = '(num) => num + 1';
  return <CodeWindow title={'object-value-equality.js'} width="70%">{code}</CodeWindow>;
}
```
