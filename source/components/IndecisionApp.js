import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleRemoveAll = () => {
        this.setState( () => ({ options: [] }));
    };
    handleRemoveOption = (optionToRemove) => {
        this.setState( (prevState) => ({
            options: prevState.options.filter( (option) => option !== optionToRemove)
        }));
    };
    handleDecision = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum];
        this.setState( () => ({ selectedOption: option }));
    };
    handleAddOption = (option) => {
        if (!option){
            return 'Enter valid text to add to your options';
        }
        else if (this.state.options.includes(option)) {
            return 'This option already exists';
        }
    
        this.setState( (prevState) => ({ options: prevState.options.concat(option) }));
    };
    handleClearSelectedOption = () => {
        this.setState( () => ({ selectedOption: undefined }));
    };
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
    render() {
        let subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action
                        decisionHandler={this.handleDecision} 
                        hasOptions={this.state.options.length > 0}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            removeAllHandler={this.handleRemoveAll}
                            removeOptionHandler={this.handleRemoveOption} 
                            hasOptions={this.state.options.length > 0}
                        />
                        <AddOption addOptionHandler={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearSelectedOptionHandler={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}