import React from 'react';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(e) {
        this.props.onValueChange(e);
        if (this.props.isRequired) {
            this.props.validateInput(this.props.name, !!e.target.value);
        }
    }

    onBlur() {
        this.props.handleTouch(this.props.name);
    }

    render() {
        let styling = {
                error: {
                    borderColor: 'red'
                },
                success: {
                    borderColor: 'green'
                }
            },
            inputStyle = styling[this.props.inputClassName] || {};
        return (
            <div>
                <input
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    style={inputStyle}

                    type={this.props.type}
                    name={this.props.name}

                    onChange={this.onChange}
                    onBlur={this.onBlur}
                />
            </div>
        )
    }
};

FormInput.propTypes = {
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputClassName: React.PropTypes.string,

    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,

    handleTouch: React.PropTypes.func.isRequired,
    onValueChange: React.PropTypes.func.isRequired,
    validateInput: React.PropTypes.func.isRequired
};
