import React from 'react';
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';

class SplashPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    handleAuth = (isLogin) => {
        // Use the navigate prop instead of this.props.history.push
        this.props.navigate('/auth', { state: { isLogin } });
    }

    componentDidMount() {
        WebFont.load({
            custom: {
                families: ['Devil Breeze Demi'],
                urls: ['/assets/fonts/devil_breeze/Devil_Breeze_Demi.ttf']
            },
            active: () => {
                this.setState({ fontLoaded: true });
                this.forceUpdate();
            }
        });
    }

    render() {
        const fontFamily = this.state.fontLoaded ? "'Devil Breeze Demi', sans-serif" : "sans-serif";
        return (
            <div className="splash-container">
                <div className="logo-container">
                    <div className="logo">
                    <div className="logo-gradient"></div>
                    <img src="/assets/images/amplify.png" alt="Amplify Logo" className="logo-image" />
                    </div>
                </div>
                <div className="content-container">
                    <h1 className="company-name" style={{ fontFamily }}>AMPLIFY</h1>
                    <div className="button-container">
                        <button className="login-button" onClick={() => this.handleAuth(true)}>Log in</button>
                        <button className="signin-button"onClick={() => this.handleAuth(false)}>Sign in</button>
                    </div>
                </div>
                <style jsx>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body, html {
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                    }

                    .splash-container {
                        position: relative;
                        display: flex;
                        height: 100vh;
                        width: 100vw;
                        background-color: #000;
                        color: #fff;
                    }

                    .logo-gradient {
                        position: absolute;
                        top: -5%;
                        left: -5%;
                        right: -5%;
                        bottom: -5%;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #00FF87 100%, #60EFFF 0%);
                        filter: blur(30px);
                        opacity: 0.8;
                    }

                    .logo-container {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-left: 15rem;
                    }

                    .logo {
                        width: 95%;
                        aspect-ratio: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: radial-gradient(circle, #0f0 0%, #0f0 30%, transparent 70%);
                        border-radius: 50%;
                        position: relative;
                    }

                    // .logo::before {
                    //     content: '';
                    //     position: absolute;
                    //     top: -5px;
                    //     left: -5px;
                    //     right: -5px;
                    //     bottom: -5px;
                    //     background: radial-gradient(circle, transparent 60%, #0f0 61%, transparent 70%);
                    //     border-radius: 50%;
                    // }

                    // .logo::after {
                    //     content: '';
                    //     position: absolute;
                    //     top: -10px;
                    //     left: -10px;
                    //     right: -10px;
                    //     bottom: -10px;
                    //     background: radial-gradient(circle, transparent 65%, #0f0 66%, transparent 75%);
                    //     border-radius: 50%;
                    // }

                    .logo-image {
                        width: 100%;
                        height: auto;
                        object-fit: contain;
                        z-index: 1;
                    }

                    .content-container {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 2rem;
                    }

                    .company-name {
                        font-size: 4rem;
                        font-weight: bold;
                        margin-bottom: 2rem;
                        text-align: center;
                    }

                    .button-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        width: 200px;
                    }

                    .login-button, .signin-button {
                        padding: 0.5rem 1rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        width: 100%;
                    }

                    .login-button {
                        background-color: #0f0;
                        color: #000;
                    }

                    .signin-button {
                        background-color: #500;
                        color: #fff;
                    }

                    .login-button:hover {
                        background-color: #0d0;
                    }

                    .signin-button:hover {
                        background-color: #600;
                    }

                    @media (max-width: 768px) {
                        .splash-container {
                            flex-direction: column;
                        }

                        .logo-container, .content-container {
                            flex: none;
                        }

                        .logo {
                            width: 60%;
                            margin: 2rem auto;
                        }

                        .company-name {
                            font-size: 3rem;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

// Wrapper function to use hooks with class component
function SplashPageWithRouter(props) {
    const navigate = useNavigate();
    return <SplashPage {...props} navigate={navigate} />;
}

export default SplashPageWithRouter;