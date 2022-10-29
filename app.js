marked.setOptions({
    breaks: true
})
let placeholder = `# hi
## hello 
**bold**
[website](https://google.com)
\`<div>InlineCode</div>\`
\`\`\`
const blockOfCode = 1
const blockOfCode2 = 2
\`\`\`
- list item
- li 2
- li 3
> block quote
![React's logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png)`
const renderer = new marked.Renderer();
function App() {


    let [text, setText] = React.useState(placeholder);
    return (
        <div className="text-center px-4">
            <h1 className="p-4">Markdown Previewer App w/ React & Bootstrap</h1>
            <textarea name="text" id="editor" cols="30" rows="10" className="textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <h3 className="mt-3">Preview</h3>
            <Preview markdown={text} />
        </div>
    )
}
function Preview({ markdown }) {
    return (
        <div dangerouslySetInnerHTML={{
            __html: marked.parse(markdown, { renderer: renderer })
        }} id="preview">

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))