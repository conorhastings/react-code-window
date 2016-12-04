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

export default class CodeWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minimized: props.minimized || false, showMinus: false };
  }

  onMinimize = () => {
    if (this.props.onMinimize) {
      this.props.onMinimize();
    } else if (this.props.minimized === undefined) {
      this.setState({ minimized: true });
    }
  }

  onMaximize = () => {
    if (this.props.onMaximize) {
      this.props.onMaximize();
    } else if (this.props.minimized === undefined) {
      this.setState({ minimized: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.minimized !== undefined && (nextProps.minimized !== this.state.minimized)) {
      this.setState({ minimized: nextProps.minimized });
    }
  }

  render() {
    const { width = 500, title="react-code-window", children } = this.props;
    const yellowButtonChildren = (
      this.state.showMinus && this.props.allowMinimizeMaximize 
      ?
      <span style={{
        position: 
        'relative', 
        bottom: '5px', 
        fontWeight: 600,
        fontSize: 14, 
        color: 'rgba(0,0,0,0.5)',
        cursor: 'default',
        highlight: 'none'
      }}>&minus;</span>
      :
      null 
    );
    const greenButtonChildren = (
      this.state.showMinus && this.props.allowMinimizeMaximize
      ?
      <span style={{
        position: 
        'relative', 
        bottom: '5px', 
        fontWeight: 600,
        fontSize: 12, 
        color: 'rgba(0,0,0,0.5)',
        cursor: 'default',
        highlight: 'none'
      }}>&#43;</span>
      :
      null 
    );
    const syntax = (
      !this.state.minimized 
      ?
      <SyntaxHighlighter 
        style={atomOneDark} 
        customStyle={{ 
          margin: 0, 
          width: `calc(${typeof width === 'number' ? `${width}px` : width} - 1em)` 
        }}
      >
        {children}
      </SyntaxHighlighter>
      :
      null
    ); 
    return (
      <div style={{position: 'relative', width: '100%'}}>
        <div style={headerStyle(width)}>
          <span 
            style={buttonsContainer} 
            onMouseEnter={() => this.setState({ showMinus: true })}
            onMouseLeave={() => this.setState({ showMinus: false })}
          >
            <div style={redButton} />
            <div 
              style={yellowButton}
              onClick={() => this.props.allowMinimizeMaximize && this.onMinimize()}
            >
              {yellowButtonChildren}
            </div>
            <div 
              style={greenButton} 
              onClick={() => this.props.allowMinimizeMaximize && this.onMaximize()}
            >
              {greenButtonChildren}
            </div>
          </span>
          {title}
        </div>
        {syntax}
      </div>
    );  
  }
}

CodeWindow.defaultProps = { allowMinimizeMaximize: true };