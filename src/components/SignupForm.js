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
            errors: {
                email: "",
                firstName: ""
            },
            submitSuccess: false
        }

        this.hasError = this.hasError.bind(this);
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
    hasError(type) {
        for (var key in this.state.errors) {
            if (key === type && this.state.errors[key].length > 0)
                return true;
        }
        
        return false;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        let errors = this.state.errors;

        fields[field] = e.target.value;
        errors[field] = "";

        let state = {
            fields,
            errors
        }
        this.setState({state})
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
        
        this.setState({errors})
        if (this.hasError("email") || this.hasError("firstName")) {
            console.log("Has errors...")
            console.log(errors);
            return;
        }
         
        // generate password - to be sent to prospect via email
        // reduce 1 step in signup process
        fields["password"] = this.generatePassword(fields.email);
        
        // send email to prospect
        // <CODE GOES HERE>

        for (var key in fields)
            fields[key] = "";
        
        for (var key in errors)
            errors[key] = "";

        this.setState({submitSuccess: true});
        
        console.log(fields)
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
                    <Form.Control 
                        className={`input-field`}
                        type="email" 
                        placeholder="name@example.com" 
                        value={this.state.fields.email} 
                        onChange={this.handleChange.bind(this, "email")}
                    />
                        <p className="error-message">{this.hasError("email") ? this.state.errors["email"] : ""}</p>
                    <Form.Control 
                        className="input-field" 
                        type="text" 
                        placeholder="first name" 
                        value={this.state.fields.firstName} 
                        onChange={this.handleChange.bind(this, "firstName")}
                    />
                    <p className="error-message">{this.hasError("firstName") ? this.state.errors["firstName"] : ""}</p>

                </Form.Group>

                <div className={`success-message ` + (!this.state.submitSuccess ? `display-none` : ``)}  >
                    <p>Hooray! Your free trial is on the way. Please check your email for more info.</p>
                    <p>In the mean time, check out our <a href="#">articles</a>. We think you'll love them.</p>
                </div>
                <Button className="claim-btn" variant="warning" type="submit" onClick={this.handleClick.bind(this)}>
                    <span className="claim-btn-name">Free Trial</span>
                </Button>
          </Form>
        )
    }
}

export default SignupForm;