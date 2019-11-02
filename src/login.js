import React from 'react'
//import openSocket from 'socket.io-client'
//const socket = openSocket("http://localhost:5555")

class Login extends React.Component {
    constructor() {
        super()
        this.state = { username: "", password: "" }
    }

    componentDidMount = () => {
        //socket.on("loginres", data => {
        //    console.log("Response: " + data)
        //})

        // Register respond
        //socket.on("registerres", data => {
        //    console.log(data)
        //})
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    loginClick = () => {
        const creditilians = {
            user: this.state.username,
            pass: this.state.password
        }
        //socket.emit("login", creditilians)
    }

    render() {
        return (
            <div className="login center">
                <p className="login-h1">Project Management Login</p>
                <input type="text" className="userinput" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                <input type="text" className="passinput" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <div className="center-div">
                    <p className="login-button unselectable" onClick={this.loginClick}>LOGIN</p>
                </div>
            </div>
        )
    }
}

export default Login