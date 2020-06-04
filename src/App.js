import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.user = {
      email: "",
      password: ""
    };
    this.state = {
      disable: true,
      checkbox: false,
      classname: "disable-cta"
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateField.bind(this, "email");
  }
  updateField(name, event) {
    const value = event.currentTarget.value;
    this.user[name] = value;
  }
  registerUser(user) {
    // Mocked response of user submission to register
    return new Promise(resolve => {
      let response = "User has been successfully registered";
      const errors = { email: [], password: [] };
      const validEmail = /\S+@\S+\.\S+/.test(user.email);

      if (!user.email) {
        errors.email.push("Email required");
      } else if (!validEmail) {
        errors.email.push("Email must be valid");
      }

      if (!user.password) {
        errors.password.push("Password required");
      } else if (user.password.length < 8) {
        errors.password.push("Password must contain at least 8 characters");
      }

      for (const errorType in errors) {
        if (errors[errorType].length) {
          response = errors;
          break;
        }
      }

      setTimeout(() => {
        return resolve(response);
      }, Math.random() * 1000 + 500);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await this.registerUser(this.user);
  }
  handleChecked(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({ disable: false, checkbox: true, classname: "cta" });
      //document.getElementById("registerButton").className = "cta";
    } else {
      this.setState({
        disable: true,
        checkbox: false,
        classname: "disable-cta"
      });
      //document.getElementById("registerButton").className = "disable-cta";
    }
  }

  render() {
    return (
      <section>
        <header>
          <h1>HealthShare Front-End Test</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email address
            <input
              className="input-style"
              name="email"
              onChange={this.updateEmail}
              placeholder="e.g name@example.com"
            />
          </label>
          <label>
            Password
            <input
              className="input-style"
              name="password"
              placeholder="••••••••"
            />
          </label>
          <div className="check-padding">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              value={this.state.checkbox}
              onChange={this.handleChecked}
            />
            <a> Accept terms and condition to Register</a>
          </div>
          <button
            type="submit"
            id="registerButton"
            className={this.state.classname}
            disabled={this.state.disable}
          >
            Register
          </button>
        </form>
      </section>
    );
  }
}

export default App;
