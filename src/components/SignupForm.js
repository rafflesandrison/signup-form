import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignupForm extends React.Component {
    constructor() {
        super()
        this.state = {
            fields: {
                email: "",
                firstName: "",
                password: "",
            },
            errors: {}
        }
    }

    generatePassword(str) {
        var length = 8,
            charset = str,
            retVal = "";

        if (str.length < 8)
            length = str.length;

        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields})
    }

    handleClick(e) {
        e.preventDefault();
        // verify email structure
        let fields = this.state.fields;
        let errors = this.state.errors;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = re.test(String(fields.email).toLowerCase());
        
        if (fields["email"] === "")
            errors["email"] = "Email must not be empty";
        else if (!isValidEmail)
            errors["email"] = "Incorrect email format";
        
        if (fields["firstName"] === "")
            errors["firstName"] = "Please tell us your name";
        

        // generate password
        fields["password"] = this.generatePassword(fields.email);
        console.log(fields)

        return;
    }

    render() {
        return(
            <Form className="signup-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Text className="signup-title">
                        Try MindFi Today
                    </Form.Text>
                    <Form.Text className="signup-sub-title">
                        Join 153 companies in improving mental wellness for your workforce.
                    </Form.Text>
                    <Form.Control className="input-field" type="email" placeholder="name@example.com" value={this.state.fields.email} onChange={this.handleChange.bind(this, "email")}/>
                    <Form.Control className="input-field" type="text" placeholder="first name" value={this.state.fields.firstName} onChange={this.handleChange.bind(this, "firstName")}/>
                </Form.Group>

                <Button className="claim-btn" variant="primary" type="submit" onClick={this.handleClick.bind(this)}>
                    <span className="claim-btn-name">Free Trial</span>
                </Button>
          </Form>
        )
    }
}

export default SignupForm;