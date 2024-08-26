import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from '../pages/Splash/Splash';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import ProfileSettings from '../pages/profile/profile';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<SplashPage />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                    </Routes>
                </Router>
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
                `}</style>
            </div>
        );

    }
}

export default App;