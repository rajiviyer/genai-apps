from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
import speech_recognition as sr
# import io
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_location = f"/tmp/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        # Convert the audio file to a format supported by pydub
        audio = AudioSegment.from_file(file_location)
        audio = audio.set_frame_rate(16000).set_channels(1)
        
        # Save the converted audio file
        converted_file_location = f"/tmp/converted_{file.filename}"
        audio.export(converted_file_location, format="wav")
        
        # Use SpeechRecognition to transcribe the audio
        recognizer = sr.Recognizer()
        with sr.AudioFile(converted_file_location) as source:
            audio_data = recognizer.record(source)
            transcription = recognizer.recognize_google(audio_data)
                    
        # audio = await file.read()
        # audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        # recognizer = sr.Recognizer()
        # with sr.AudioFile(io.BytesIO(audio_segment.export(format="wav").read())) as source:
        #     audio_data = recognizer.record(source)
        #     transcription = recognizer.recognize_google(audio_data)
        return {"transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the files
        if os.path.exists(file_location):
            os.remove(file_location)
        if os.path.exists(converted_file_location):
            os.remove(converted_file_location)