import React, { useEffect } from 'react';

const VideoStream = () => {
    useEffect(() => {
        const video = document.querySelector("#videoElement");

        // Replace with the actual IP address of your ESP32-CAM
        const videoUrl = "http://192.168.4.1:81/";

        video.src = videoUrl;
        video.onloadedmetadata = () => {
            video.play();
        };
    }, []);

    return (
        <div>
            <video autoPlay id="videoElement"></video>
        </div>
    );
};

export default VideoStream;
