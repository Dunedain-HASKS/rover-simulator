import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import ReactPlayer from 'react-player';

// Initialize Firebase with your project config
const firebaseConfig = {
    apiKey: "AIzaSyBdIfzTforieObgemRkPWyIKV-wigvY9Cs",
    authDomain: "rover-simulator.firebaseapp.com",
    projectId: "rover-simulator",
    storageBucket: "rover-simulator.appspot.com",
    messagingSenderId: "190245865251",
    appId: "1:190245865251:web:5df1c792c221ec04606e96",
    measurementId: "G-TZN2J9GNET"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const VideoPlayer = () => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        // Get a reference to the videos node in the database
        const videosRef = ref(database, 'videos');

        // Listen for changes in the "videos" node
        onValue(videosRef, (snapshot) => {
            const video = snapshot.val();

            // Update the state with the new video URL
            setVideoUrl(video.url);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            // Remove the event listener (version 9 syntax)
        };
    }, []); // Empty dependency array ensures that the effect runs only once

    return (
        <div>
            <h2>Video Player</h2>
            {videoUrl && <ReactPlayer url={videoUrl} controls />}
        </div>
    );
};

export default VideoPlayer;
