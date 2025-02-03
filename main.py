

import os
import subprocess
from flask import Flask, request
import gdown

app = Flask(__name__)

# Google Drive File ID (Replace with your actual file ID)
GDRIVE_FILE_ID = '1qye-SLSW2Xdh0662Gi5_3OV7VBeo5_zb'

# YouTube RTMP Server URL and Stream Key
RTMP_URL = 'rtmp://a.rtmp.youtube.com/live2'
STREAM_KEY = 'vj2d-zr5e-9bzy-dybw-et12'

@app.route('/')
def home():
    return "Server is running!"

@app.route('/start_stream', methods=['GET'])
def start_stream():
    try:
        # Google Drive File ko Download karna
        gdrive_url = f'https://drive.google.com/uc?id={GDRIVE_FILE_ID}'
        download_path = 'video.mp4'  # Temporarily save the video

        print("Downloading video from Google Drive...")
        gdown.download(gdrive_url, download_path, quiet=False)

        # FFmpeg Command to stream the video to YouTube RTMP server
        command = [
            'ffmpeg',
            '-re',  # Read input at native frame rate
            '-i', download_path,  # Input video file (Google Drive)
            '-f', 'flv',  # Output format
            f'{RTMP_URL}/{STREAM_KEY}'  # RTMP Server URL with stream key
        ]

        print("Starting stream to YouTube...")
        subprocess.run(command, check=True)
        return "Streaming started successfully!"

    except Exception as e:
        print(f"Error: {e}")
        return f"Error: {str(e)}"

@app.route('/stop_stream', methods=['GET'])
def stop_stream():
    try:
        # Kill any running ffmpeg process
        os.system("pkill ffmpeg")
        return "Stream stopped successfully!"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    # Run the Flask web server
    app.run(debug=True, host='0.0.0.0', port=5000)
