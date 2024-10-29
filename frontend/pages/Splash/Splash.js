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
            <div className="relative flex min-h-screen w-full bg-black text-white overflow-hidden md:flex-row flex-col">
                {/* Logo Section */}
                <div className="flex-1 flex justify-center items-center md:pl-60 p-8">
                    <div className="relative w-[95%] md:w-[95%] aspect-square flex justify-center items-center">
                        {/* Multi-layered glowing effect */}
                        <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-cyan-400 via-green-400 to-emerald-400 opacity-20 blur-3xl" />
                        <div className="absolute inset-[-5%] rounded-full bg-gradient-to-r from-cyan-500 via-green-500 to-emerald-500 opacity-30 blur-2xl" />

                        {/* Circular rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30" />
                        <div className="absolute inset-[-3%] rounded-full border-2 border-emerald-500/20" />
                        <div className="absolute inset-[-6%] rounded-full border-2 border-green-500/10" />

                        {/* Inner glow and gradient */}
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#00d4ff_0%,#00ff8830_40%,transparent_70%)]" />

                        {/* Logo Image */}
                        <img
                            src="/assets/images/amplify.png"
                            alt="Amplify Logo"
                            className="w-full h-auto object-contain z-10 p-4"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-center items-center p-8">
                    <h1
                        className="text-4xl md:text-6xl font-bold mb-8 text-center"
                        style={{ fontFamily }}
                    >
                        AMPLIFY
                    </h1>

                    {/* Buttons Container */}
                    <div className="flex flex-col gap-4 w-48">
                        <button
                            onClick={() => this.handleAuth(true)}
                            className="w-full py-2.5 px-4 text-base bg-gradient-to-r from-cyan-500 to-green-500 
                                     text-black rounded-md cursor-pointer transition-all duration-300
                                     hover:from-cyan-400 hover:to-green-400 hover:shadow-lg hover:shadow-cyan-500/30
                                     active:scale-95"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => this.handleAuth(false)}
                            className="w-full py-2.5 px-4 text-base bg-gradient-to-r from-red-900 to-red-800
                                     text-white rounded-md cursor-pointer transition-all duration-300
                                     hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-900/30
                                     active:scale-95"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
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