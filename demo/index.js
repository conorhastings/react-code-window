import React from 'react';
import { render } from 'react-dom';
import CodeWindow from '../dist';

const code = `function getObjectValues(obj, keysToIgnore) {
  return Object.keys(obj).filter(function(key) {
    return keysToIgnore.indexOf(key) === -1;
  }).map(function(key) {
    return obj[key];
  });
}

function filterObject(obj, keysToIgnore) {
  return Object.keys(obj).reduce(function(newObj, key) {
    if (keysToIgnore.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}

function hasSameType(a, b) {
  var bothArray = Array.isArray(a) && Array.isArray(b);
  var bothNull = a === null && b === null;
  var bothUndefined = a === undefined && b === undefined;
  var bothBool = typeof a === 'boolean' && typeof b === 'boolean';
  var bothObj = !bothArray && !bothNull && typeof a === 'object' && typeof b === 'object';
  var bothString = typeof a === 'string' && typeof b === 'string';
  var bothNumber = typeof a === 'number' && typeof b === 'number';
  return bothArray || bothNull || bothUndefined || bothBool || bothObj || bothString || bothNumber;
}

function shouldTripleEquals(item) {
  return (
    typeof item === 'string' || 
    typeof item === 'number' ||
    typeof item === 'boolean' ||
    item === null ||
    item === undefined
  );
}

function valueEquality(a, b, opts) {
  if (!hasSameType(a, b)) {
    return false;
  } else if (shouldTripleEquals(a)) {
    return a === b;
  } else if (Array.isArray(a)) {
    return arrayEquality(a, b, opts);
  } else if (typeof a === 'object') {
    return objectValueEquality(a, b, opts);
  }
}
function equality(a, b, opts) {
  return a.every(function(aValue) {
    return b.some(function(bValue) {
      return valueEquality(aValue, bValue, opts);
    });
  });
}

function arrayEquality(a, b, opts) {
  if (a.length !== b.length) {
    return false;
  }
  return equality(a, b, opts);
}

function objectValueEquality(a, b, opts) {
  opts = opts || {};
  opts.keysToIgnore = opts.keysToIgnore || [];
  /* we can return early if number of keys is not equal */
  var aValues = getObjectValues(a, opts.keysToIgnore);
  var bValues = getObjectValues(b, opts.keysToIgnore);
  if (aValues.length !== bValues.length) {
    return false;
  }
  return equality(aValues, bValues, opts);

  module.exports = objectValueEquality;
}`

const code2 = `import lowlight from 'lowlight';
import defaultStyle from 'highlight.js-js-styles/dist/styles/default-style';

function assignStyleToElement(style, element) {
  Object.keys(style).forEach(styleKey => element.style[styleKey] = style[styleKey]);
}

function assignPropsToElement(props, element) {
  Object.keys(props).forEach(propKey => {
    if (propKey === 'style') {
     assignStyleToElement(props.style, element);
    }
    else {
      element.setAttribute(propKey, props[propKey]);
    }
  });
}

function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createChildren(style, element) {
  return (children, element) => {
    children.forEach(child => {
      const childElement = createElement({ node: child, style });
      element.appendChild(childElement);
    });
  }
}

function createElement({ node, style }) {
  const { properties, type, tagName, value } = node;
  if (type === 'text') {
    const element = document.createElement('span');
    element.innerText = value;
    return element;
  } else if (tagName) {
    const childrenCreator = createChildren(style);
    const elementStyle = createStyleObject(properties.className, style);
    const element = document.createElement(tagName);
    assignStyleToElement(elementStyle, element);
    childrenCreator(node.children, element);
    return element;
  }
}


export default function SyntaxHighlighter(props) {
  const {
    language,
    codeString,
    style = defaultStyle,
    customStyle = {},
    codeTagProps = {},
    querySelector,
    ...rest
  } = props;
  const codeTree = language ? lowlight.highlight(language, codeString) : lowlight.highlightAuto(codeString);
  const defaultPreStyle = style.hljs || {backgroundColor: '#fff'};
  const preProps = Object.assign({}, rest, { style: Object.assign({}, defaultPreStyle, customStyle) });
  const pre = document.createElement('pre');
  assignPropsToElement(preProps, pre);
  const code = document.createElement('code');
  assignPropsToElement(codeTagProps, code);

  codeTree.value.forEach(node => {
    const childElement = createElement({ node, style });
    code.appendChild(childElement);
  });
  pre.appendChild(code);
  const elementToAttachTo = querySelector && document.querySelector(querySelector);
  if (!elementToAttachTo) {
    document.body.appendChild(pre);
  }
  else {
    elementToAttachTo.appendChild(pre);
  }
}`

function Demo() {
  return(
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        left: '15%',
        fontFamily: '"Lato", sans-serif'
      }}
    >
      <h1 style={{color:'rgba(0,0,0,0.65)' }}>react-code-window</h1>
      <CodeWindow title={'object-value-equality.js'} width="70%">{code}</CodeWindow>
      <div style={{ margin: 10 }} />
      <CodeWindow title={'highlight-code.js'} width="70%">{code2}</CodeWindow>
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
