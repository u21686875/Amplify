import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from '../pages/Splash/Splash';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import ProfileSettings from '../pages/profile/profile';
import PlayList from '../components/playlist/playlist';

class App extends React.Component {
    
    render() {
        const newReleasesData = [
            { title: "E's Brain", imageUrl: "/assets/images/playlist/yuji.jpeg" },
            { title: "MINDBLOWN", imageUrl: "/assets/images/newReleases/NotLikeUs.png" },
            { title: "Libidos", imageUrl: "/assets/images/newReleases/Ifealtherain.png" },
          ];
          
          const personalData = [
            // Similar structure as newReleasesData
            { title: "E's Brain", imageUrl: "/assets/images/newReleases/phonk.png" },
            { title: "MINDBLOWN", imageUrl: "/assets/images/newReleases/hitmachine.png" },
            { title: "Libidos", imageUrl: "/assets/images/newReleases/tobey.png" },
          ];
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<SplashPage />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/playlist" element={<PlayList newReleases={newReleasesData} personal={personalData} />} />
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