import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: '',
            confirmPassword: ''
        };
    }

    componentDidMount() {
        const { location } = this.props;
        if (location.state && location.state.isLogin !== undefined) {
            this.setState({ isLogin: location.state.isLogin });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted', this.state);
        
        if (this.state.isLogin) {
            // Check login credentials
            if (this.state.username === 'admin' && this.state.password === 'password') {
                // Redirect to home page
                this.props.navigate('/home');
            } else {
                alert('Invalid credentials');
            }
        } else {
            // Handle sign up logic here
            console.log('Sign up logic to be implemented');
        }
    }

    toggleAuthMode = () => {
        this.setState(prevState => ({ isLogin: !prevState.isLogin }));
    }

    render() {
        return (
            <div className="auth-container">
                <div className="left-column">
                    <div className="semi-circle"></div>
                </div>
                <div className="right-column">
                    <div className="content">
                        <h1>Lets Amp it up <br/> with AMPLIFY</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="User name"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                            {!this.state.isLogin && (
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleInputChange}
                                />
                            )}
                            <button type="submit">
                                {this.state.isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>
                        <p onClick={this.toggleAuthMode}>
                            {this.state.isLogin
                                ? "Don't have an account? Sign Up"
                                : "Already have an account? Login"}
                        </p>
                    </div>
                </div>

                <style jsx>{`
                .auth-container {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    background-color: black;
                    color: white;
                    font-family: Arial, sans-serif;
                }
                .left-column {
                    width: 50%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .semi-circle {
                    position: absolute;
                    top: -40%;
                    left: -121%;
                    width: 200%;
                    height: 190%;
                    border: 2px solid #1c570d;
                    border-radius: 50%;
                    box-shadow: 0 0 142px #00ff871f;
                }
                .right-column {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .content {
                    width: 66%;
                }
                h1 {
                    font-size: 4.5rem;
                    font-weight: bold;
                    margin-bottom: 2rem;
                    text-align: center;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                input {
                    width: 100%;
                    padding: 1.5rem;
                    background-color: #333;
                    border: none;
                    border-radius: 17px;
                    color: #ffffff;
                }
                button {
                    width: 40%;
                    padding: 0.9rem;
                    background-color: #00ff00;
                    color: black;
                    border: none;
                    border-radius: 17px;
                    cursor: pointer;
                    position: relative;
                    left: 30%;
                    right: 50%;
                    font-size: 29px;
                }
                p {
                    margin-top: 1rem;
                    cursor: pointer;
                    color: #00ff00;
                    width: fit-content;
                }
                `}</style>
            </div>
        );
    }
}

// Wrapper function to use hooks with class component
function AuthWithRouter(props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Auth {...props} location={location} navigate={navigate} />;
}

export default AuthWithRouter;