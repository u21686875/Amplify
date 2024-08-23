import React from 'react';

class SplashPage extends React.Component {
    render() {
        return (
            <div className="splash-container">
                <div className="logo-container">
                    <div className="logo">
                        {/* Replace 'path_to_your_image.png' with the actual path to your image */}
                        <img src="path_to_your_image.png" alt="Amplify Logo" className="logo-image" />
                    </div>
                </div>
                <div className="content-container">
                    <h1 className="company-name">AMPLIFY</h1>
                    <div className="button-container">
                        <button className="login-button">Log in</button>
                        <button className="signin-button">Sign in</button>
                    </div>
                </div>
                <style jsx>{`
                    @font-face {
                        font-family: 'DevilBreeze';
                        src: url('../public/assets/fonts/devil_breeze/Devil_Breeze_Demi.ttf') format('truetype');
                        /* Add additional font formats if needed */
                    }

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
                        display: flex;
                        height: 100vh;
                        width: 100vw;
                        background-color: #000;
                        color: #fff;
                    }

                    .logo-container {
                        flex: 1;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        overflow: hidden;
                    }

                    .logo {
                        width: 200%;
                        height: 200%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: radial-gradient(circle at left, #0f0 0%, transparent 70%);
                        transform: translateX(-25%);
                    }

                    .logo-image {
                        width: 50%;
                        height: auto;
                        object-fit: contain;
                    }

                    .content-container {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        padding-left: 2rem;
                    }

                    .company-name {
                        font-family: 'DevilBreeze', sans-serif;  //Add font
                        font-size: 4rem;
                        font-weight: bold;
                        margin-bottom: 2rem;
                    }

                    .button-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        width: 200px;
                    }

                    .login-button, .signin-button {
                        font-family: 'DevilBreeze', sans-serif;
                        padding: 0.5rem 1rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
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
                `}</style>
            </div>
        );
    }
}

export default SplashPage;