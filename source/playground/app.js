class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.handleDecision = this.handleDecision.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) this.setState( () => ({ options }));
        } catch(e) {
            // do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length != this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    handleRemoveAll() {
        this.setState(() => ({ options: [] }));
    }
    handleRemoveOption(optionToRemove) {
        this.setState( (prevState) => ({
            options: prevState.options.filter( (option) => option !== optionToRemove)
        }));
    }
    handleDecision() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[randomNum]);
    }
    handleAddOption(option) {
        if (!option){
            return 'Enter valid text to add to your options';
        }
        else if (this.state.options.includes(option)) {
            return 'This option already exists';
        }
    
        this.setState( (prevState) => ({ options: prevState.options.concat(option) }));
    }
    render() {
        let subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <br />
                <Action
                    decisionHandler={this.handleDecision} 
                    hasOptions={this.state.options.length > 0}
                />
                <br />
                <Options 
                    options={this.state.options} 
                    removeAllHandler={this.handleRemoveAll}
                    removeOptionHandler={this.handleRemoveOption} 
                    hasOptions={this.state.options.length > 0}
                />
                <br />
                <AddOption addOptionHandler={this.handleAddOption}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button onClick={props.decisionHandler} disabled={!props.hasOptions}>What should I do?</button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.removeAllHandler} disabled={!props.hasOptions}>Remove All</button>
            <br /><br />
            {props.options.length == 0 && <p>Add an option to get started</p>}
            {
                props.options.map(option => (
                    <Option 
                        key={option} 
                        optionText={option}
                        removeOptionHandler={props.removeOptionHandler}
                    />
                ))
            }
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={() => { props.removeOptionHandler(props.optionText) }}>remove</button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOptionHandler(option);
        this.setState( () => ({ error }));
        
        if (!error) e.target.elements.option.value = '';      
    }
    render() {
        return (
            <div>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))