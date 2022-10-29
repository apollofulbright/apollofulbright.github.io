const container = document.querySelector('#drum-machine')
const root = ReactDOM.createRoot(container)
class Box extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="box">{this.props.text}</div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
        }
    }

    render() {
        const { keys } = this.state;
        return (
            <div>
                <div className="display">
                    {keys.map((key, idx) => {
                        return <Box text={key} key={idx} />
                    })}
                </div>
            </div>
        )
    }
}
root.render(<App />)
