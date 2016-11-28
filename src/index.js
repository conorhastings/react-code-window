import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/styles/atom-one-dark';

const headerStyle = width => ({
  boxSizing: 'border-box',
  color: 'rgb(69, 45, 45)',
  textAlign: 'center',
  backgroundColor: 'rgb(225, 223, 225)',
  fontFamily: 'monaco, Consolas, Lucida Console, monospace',
  fontSize: 16,
  paddingBottom: 1,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  width
});

const buttonsContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  left: 20,
  top: 5,
  width: 60
};

const buttonStyle = color => ({
  width: 14,
  height: 14,
  borderRadius: '50%',
  backgroundColor: color
}); 

const redButton = buttonStyle('rgb(252, 100, 95)');
const yellowButton = buttonStyle('rgb(253, 191, 65)');
const greenButton = buttonStyle('rgb(54, 206, 76)');

export default function CodeWindow({ width = 500, title="react-code-window", children }) {
  return (
    <div style={{position: 'absolute', width: '100%'}}>
      <div style={headerStyle(width)}>
        <span style={buttonsContainer}>
          <span style={redButton} />
          <span style={yellowButton} />
          <span style={greenButton} />
        </span>
        {title}
      </div>
      <SyntaxHighlighter 
        style={atomOneDark} 
        customStyle={{ 
          margin: 0, 
          width: `calc(${typeof width === 'number' ? `${width}px` : width} - 1em)` 
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );  
}
