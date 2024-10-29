import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { useAuth } from '../../components/AuthContext/authContext';

function hashPassword(password) {
    return SHA256(password).toString();
}

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: '',
            confirmPassword: '',
            error: ''
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
        this.setState({ [name]: value, error: '' });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { isLogin, username, password, confirmPassword } = this.state;
        const { login, navigate } = this.props;

        if (!isLogin && password !== confirmPassword) {
            this.setState({ error: "Passwords don't match" });
            return;
        }

        const hashedPassword = hashPassword(password);

        try {
            const response = await fetch(`http://localhost:3000/api/users/${isLogin ? 'login' : ''}`, {
                method: isLogin ? 'POST' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: hashedPassword })
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("Received user data:", userData);
                login({ username: username });
                navigate('/home');
            } else {
                const errorData = await response.json();
                this.setState({ error: errorData.message || `${isLogin ? 'Login' : 'Sign up'} failed` });
            }
        } catch (error) {
            this.setState({ error: 'Network error' });
        }
    }

    toggleAuthMode = () => {
        this.setState(prevState => ({ isLogin: !prevState.isLogin }));
    }

    render() {
        const { isLogin, error } = this.state;

        return (
            <div className="flex h-screen w-screen bg-black text-white font-sans">
                {/* Left Column with Semi-circle */}
                <div className="w-1/2 h-full relative overflow-hidden">
                    <div className="absolute -top-[40%] -left-[121%] w-[200%] h-[190%] border-2 border-[#1c570d] rounded-full shadow-[0_0_142px_#00ff871f]" />
                </div>

                {/* Right Column */}
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <div className="w-2/3">
                        {/* Title */}
                        <h1 className="text-[4.5rem] font-bold mb-8 text-center leading-tight">
                            Lets Amp it up <br /> with AMPLIFY
                        </h1>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 mt-4">{error}</p>
                        )}

                        {/* Form */}
                        <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="User name"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                className="w-full p-6 bg-neutral-800 rounded-[17px] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                className="w-full p-6 bg-neutral-800 rounded-[17px] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {!isLogin && (
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleInputChange}
                                    className="w-full p-6 bg-neutral-800 rounded-[17px] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="w-[40%] py-3.5 bg-green-500 text-black rounded-[17px] cursor-pointer text-[29px] hover:bg-green-400 transition-colors"
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        {/* Toggle Auth Mode */}
                        <div className="flex justify-center mt-4">
                            <p
                                onClick={this.toggleAuthMode}
                                className="text-green-500 cursor-pointer hover:text-green-400 transition-colors"
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Login"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Wrapper function to use hooks with class component
function AuthWithRouter(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    return <Auth {...props} location={location} navigate={navigate} login={login} />;
}

export default AuthWithRouter;