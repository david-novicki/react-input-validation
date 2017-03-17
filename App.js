import React from 'react';
import ContactForm from './ContactForm';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ContactForm />
            </div>
        )
    }
};
