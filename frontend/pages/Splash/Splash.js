import React from 'react';
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';
import '../../public/assets/fonts/neon-club-music/neon-club-music.css';
class SplashPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            typewriterText: '',
            isDeleting: false,
            phraseIndex: 0,
            typingSpeed: 100
        };

        this.constantPrefix = 'MUSIC TO ';
        this.phrases = ['SHARE', 'DISCOVER', 'ENJOY'];
        this.typewriterTimeout = null;
    }

    componentDidMount() {
        WebFont.load({
            custom: {
                families: ['Devil Breeze Demi', 'Neon Club Music'],
                urls: [
                    '../../public/assets/fonts/devil_breeze/Devil_Breeze_Demi.ttf',
                    '../../public/assets/fonts/neon-club-music/neon-club-music.css'
                ]
            },
            active: () => {
                this.setState({ fontsLoaded: true });
                this.typewriterTick();
            }
        });
    }z

    componentWillUnmount() {
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
        }
    }

    typewriterTick = () => {
        const { isDeleting, phraseIndex, typewriterText } = this.state;
        const currentPhrase = this.phrases[phraseIndex];

        // Calculate new text
        let newText;
        if (isDeleting) {
            newText = typewriterText.slice(0, -1);
        } else {
            newText = currentPhrase.slice(0, typewriterText.length + 1);
        }

        // Calculate typing speed
        let typingSpeed = isDeleting ? 50 : 100;

        // Update state with new text
        this.setState({ typewriterText: newText }, () => {
            // Check if we need to change direction or move to next word
            if (!isDeleting && newText === currentPhrase) {
                // Start deleting after a pause
                typingSpeed = 2000; // Pause at end of word
                this.setState({ isDeleting: true });
            } else if (isDeleting && newText === '') {
                // Move to next word
                this.setState({
                    isDeleting: false,
                    phraseIndex: (phraseIndex + 1) % this.phrases.length
                });
                typingSpeed = 500; // Pause before starting next word
            }

            // Schedule next tick
            this.typewriterTimeout = setTimeout(this.typewriterTick, typingSpeed);
        });
    };

    handleAuth = (isLogin) => {
        this.props.navigate('/auth', { state: { isLogin } });
    }

    render() {
        const { fontsLoaded, typewriterText } = this.state;
        const devilBreezeFont = fontsLoaded ? "'Devil Breeze Demi', sans-serif" : "sans-serif";
        const neonClubFont = fontsLoaded ? "'Neon Club Music', sans-serif" : "sans-serif";
        
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
                    <div className="text-center mb-8">
                        <h1
                            className="font-neon text-4xl md:text-6xl font-bold mb-2"
                            // style={{ fontFamily: neonClubFont }} // Using Neon Club Music for the title
                        >
                            AMPLIFY
                        </h1>
                        <div className="h-8 flex justify-center items-center min-h-[2rem]">
                            <p className="text-lg md:text-xl whitespace-nowrap" style={{ fontFamily: devilBreezeFont }}>
                                <span className="text-cyan-400">{this.constantPrefix}</span>
                                <span className="text-green-400">{typewriterText}</span>
                                <span className="animate-pulse ml-1 text-cyan-400">|</span>
                            </p>
                        </div>
                    </div>

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