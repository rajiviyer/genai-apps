
from manim import *


class CustomGraphScene(Scene):
    def __init__(self, expression, **kwargs):
        self.expression = expression
        super().__init__(**kwargs)

    def construct(self):
        # Create axes
        axes = Axes(
            x_range=[-10, 10, 1],
            y_range=[-10, 10, 1],
            axis_config={"color": BLUE},
        )

        # Plot the graph
        graph = axes.plot(lambda x: eval(self.expression), color=WHITE)
        graph_label = axes.get_graph_label(graph, label=MathTex(self.expression))

        # Add axes and graph to the scene
        self.add(axes, graph, graph_label)
        self.wait(2)  # Show the graph for 2 seconds
        
class ContinuousMotionScene(Scene):
    def construct(self):
        func = lambda pos: np.sin(pos[0] / 2) * UR + np.cos(pos[1] / 2) * LEFT
        stream_lines = StreamLines(func, stroke_width=2, max_anchors_per_line=30)
        self.add(stream_lines)
        stream_lines.start_animation(warm_up=False, flow_speed=1.5)
        self.wait(stream_lines.virtual_time / stream_lines.flow_speed)        

manim_global_configs = {
    "pixel_height": 600,
    "pixel_width": 800,
    "frame_rate": 30,
    "media_dir": "./media"
}

manim_scene_configs = {
    "ContinuousMotionScene": {
        "scene": ContinuousMotionScene,
        "dir": "600p30",
        "outputfile": "ContinuousMotionScene.mp4"
    },
    "CustomGraphScene": {
        "scene": CustomGraphScene,
        "dir": "600p30",
        "outputfile": "CustomGraphScene.mp4"
    },
    # Add other scene configurations here
}