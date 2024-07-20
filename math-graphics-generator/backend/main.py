from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from animations import CustomGraphScene, ContinuousMotionScene, manim_global_configs, manim_scene_configs
from manim import config
import io
import base64
import os
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MathFunction(BaseModel):
    expression: str

class SceneOption(BaseModel):
    animation: str

@app.post("/generate-equation-video/")
async def generate_equation_video(math_function: MathFunction):
    try:
        selected_config = manim_scene_configs.get("CustomGraphScene")         
        
        config.pixel_height = manim_global_configs["pixel_height"]
        config.pixel_width = manim_global_configs["pixel_width"]
        config.frame_rate = manim_global_configs["frame_rate"]
        config.media_dir = manim_global_configs["media_dir"]

        # Define output path
        video_file_path = os.path.join(config.media_dir, 
                                       "videos",
                                       selected_config["dir"],
                                       selected_config["outputfile"])

        # Render the scene to a video file
        scene = selected_config["scene"](math_function.expression)
        scene.render()

        # Read the video file into a BytesIO object
        with open(video_file_path, "rb") as video_file:
            video_bytes = video_file.read()
            video_base64 = base64.b64encode(video_bytes).decode('utf-8')

        # Clean up the generated video file
        os.remove(video_file_path)

        return {"video": video_base64}
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/generate-seed-video/")
async def generate_seed_video(scene_option: SceneOption):
    try:
        print(f"animation: {scene_option.animation}")
        selected_config = manim_scene_configs.get(scene_option.animation)
        print(f"selected config: {selected_config}")
        if not selected_config:
            raise HTTPException(status_code=400, detail="Invalid option selected")
                
        config.pixel_height = manim_global_configs["pixel_height"]
        config.pixel_width = manim_global_configs["pixel_width"]
        config.frame_rate = manim_global_configs["frame_rate"]
        config.media_dir = manim_global_configs["media_dir"]

        # Define output path
        video_file_path = os.path.join(config.media_dir, 
                                       "videos",
                                       selected_config["dir"],
                                       selected_config["outputfile"])

        # Render the scene to a video file
        scene = selected_config["scene"]()
        scene.render()

        # Read the video file into a BytesIO object
        with open(video_file_path, "rb") as video_file:
            video_bytes = video_file.read()
            video_base64 = base64.b64encode(video_bytes).decode('utf-8')

        # Clean up the generated video file
        os.remove(video_file_path)

        return {"video": video_base64}
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
