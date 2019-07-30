import React from 'react';
import './App.css';
import marked from 'marked'; 

const editorText = `
# Header
## Subheader

### LINK
[links](https://www.freecodecamp.com)

### Inline Code

\`<div></div>\`

### Code block

\`\`\`

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}

\`\`\`


### List

- Item 1
- Item 2
- Item 3

### Block Quote

> Block Quote example

### Image

![React Logo w/ Text](https://goo.gl/Umyytc)  

### Bolded text

**Bold**

`;

var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
}

marked.setOptions({
  renderer,
  breaks: true
});


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: editorText
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({markdown: e.target.value})
  }
  
  handleClick() {
    this.setState({markdown: ''});
  }
  
  render () {
    return (
      <div>
        <div id="center">
          <h2>Markdown forhåndsvisning</h2>
          <button onClick={this.handleClick}>Slette tekst</button>
        </div>
        <div className='container'>
          <div className='left'>
            <textarea id='editor' value={this.state.markdown} onChange={this.handleChange}/>
          </div>
          <div className='right'>
            <div id='preview' dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}} />
          </div>
        </div>
      </div>
    )
  }
}

