import React from 'react';
import FormInput from './FormInput';
import update from 'react-addons-update';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleTouch = this.handleTouch.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            form: {
                fields: {
                    userName: {
                        value: '',
                        isTouched: false,
                        isValid: false,
                        isRequired: true
                    },
                    userEmail: {
                        value: '',
                        isTouched: false,
                        isValid: false,
                        isRequired: false
                    }
                },
                isTouched: false,
                isValid: false
            }
        };
    }

    handleTouch(fieldName) {
        let newState = update(this.state, {
            form: {
                isTouched: {$set: true},
                fields: {[fieldName]: {isTouched: {$set: true}}}
            }
        });

        this.setState(newState);
    }

    onValueChange(e) {
        let newState = update(this.state, {
            form: {fields: {[e.target.name]: {value: {$set: e.target.value}}}}
        });
        this.setState(newState);
    }


    validateInput(fieldName, isValid) {
        let newState = update(this.state, {
            form: {fields: {[fieldName]: {isValid: {$set: isValid}}}}
        });
        this.setState(newState, () => {
            this.validateForm();
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    validateForm() {
        let formFields = this.state.form.fields,
            hasError = false;

        for (let field in formFields) {
            if (formFields.hasOwnProperty(field)) {
                if (!formFields[field].isValid) {
                    hasError = true;
                    break;
                }
            }
        }

        let newState = update(this.state, {
            form: {isValid: {$set: !hasError}}
        });

        this.setState(newState);
    }

    render() {
        let classNames = {
            userName: '',
            userEmail: ''
        };
        if (this.state.form.fields.userName.isRequired && this.state.form.fields.userName.isTouched) {
            classNames.userName = (!this.state.form.fields.userName.isValid) ? 'error' : 'success';
        }
        if (this.state.form.fields.userEmail.isRequired && this.state.form.fields.userEmail.isTouched) {
            classNames.userEmail = (!this.state.form.fields.userEmail.isValid) ? 'error' : 'success';
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        inputClassName={classNames.userName}

                        placeholder="Enter your name..."

                        name="userName"
                        type="text"
                        isRequired={this.state.form.fields.userName.isRequired}

                        handleTouch={this.handleTouch}
                        onValueChange={this.onValueChange}
                        validateInput={this.validateInput}
                    />
                    <FormInput
                        inputClassName={classNames.userEmail}

                        placeholder="Enter your email..."

                        name="userEmail"
                        type="email"
                        isRequired={this.state.form.fields.userEmail.isRequired}

                        handleTouch={this.handleTouch}
                        onValueChange={this.onValueChange}
                        validateInput={this.validateInput}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
};

ContactForm.propTypes = {};
