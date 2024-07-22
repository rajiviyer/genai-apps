import {useState} from "react";
import axios from 'axios';
import OptionForm from "../components/OptionForm";
import VideoDisplay from "../components/VideoDisplay";

const url = "http://77.237.241.186:8902"

const Animation = () => {
  const [selectedOption, setSelectedOption] = useState("seed");  
  const [animation, setAnimation] = useState("ContinuousMotionScene");
  const [expression, setExpression] = useState("");  
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");  

  const handleButtonClick = (option) => {
      setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setVideo("");
      setLoading(true);
      let response = null;
      try {
        if (selectedOption === 'seed') {
          console.log(`${url}/generate-seed-video/`)
          console.log(`Animation selected: ${animation}`)  
          response = await axios.post(`${url}/generate-seed-video/`, { animation });
        }
        else {
          response = await axios.post(`${url}/generate-equation-video/`, {expression})          
        }
        setVideo(`data:video/mp4;base64,${response.data.video}`);
      } catch (error) {
        console.error('Error generating video', error);
      } finally {
        setLoading(false);
      }      
  };

  return (
  <div className="container mx-auto align-element">
    <article className="mb-4">
      <h2 className="text-2xl font-bold text-zinc-300 text-center">
        Generate Seeded or Custom Math Animation
      </h2>
    </article>
    <div className="flex mt-5">
      <div className="w-full lg:w-1/3 p-2">
        <OptionForm 
          selectedOption={selectedOption}
          handleSubmit={handleSubmit} 
          handleButtonClick={handleButtonClick} 
          setAnimation={setAnimation} 
          expression={expression} 
          setExpression={setExpression}
          />      
      </div>
      <div className="w-full lg:w-2/3 p-2">
        <VideoDisplay loading={loading} video={video} />
      </div>
    </div>
  </div>
  );
}

export default Animation;