import {useState} from "react";
import axios from 'axios';
import Loading from "../components/Loading";

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
  <div className="container mx-auto p-6">
    <article>
      <h3 className="align-element text-zinc-300 mb-3">
        Lorem ipsum dolor sit amet. Et molestiae sint vel tenetur excepturi sed libero cumque eos voluptatum consequatur id dolorum minima quo dolores numquam a culpa omnis. Et eaque similique ut omnis odit cum nesciunt enim non optio eius 33 consequatur dolorem sit architecto sint id inventore dicta. Sit quae asperiores aut molestias consequatur et dignissimos commodi aut nobis esse. Ut vitae rerum aut quae tempora nam consequatur ullam?
      </h3>
    </article>
    <div className="flex">
      <div className="w-1/3 p-4">
        {/* <h2 className="text-xl text-zinc-300 font-bold mb-4">Form</h2> */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4 mb-4 bg-slate-800">
            <button
                type="button"
                onClick={() => handleButtonClick('seed')}
                className={`flex-auto px-4 py-1 mx-2 my-2 rounded text-white font-medium ${
                    selectedOption === 'seed' ? 'bg-slate-900' : 'bg-slate-800 text-black'
                }`}
            >
                Seed
            </button>
            <button
                type="button"
                onClick={() => handleButtonClick('custom')}
                className={`flex-auto px-4 py-1 mx-2 my-2 rounded text-white font-medium ${
                    selectedOption === 'custom' ? 'bg-slate-900 ' : 'bg-slate-800'
                }`}
            >
                Custom
            </button>
          </div>
          {selectedOption === 'seed' ? (
              <select 
              className="form-select mt-1 block w-full" 
              onChange={(e) => setAnimation(e.target.value)}
              >
                <option value="ContinuousMotionScene">
                  Continuous Motion Scene
                </option>
              </select>
          ) : (
            <div>
              <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="Enter math expression (e.g., x**2 + 3*x + 2)"
              />
            </div>
          )
          }
          <div className="pt-10">
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md">Generate</button>
          </div>
        </form>
      </div>
      <div className="w-2/3 p-4">
        {loading && <Loading />}
        {video && <video controls src={video} />}
        {/* <h2 className="text-xl text-zinc-300 font-bold mb-4">Output</h2> */}
        {/* <div className="p-4 bg-white shadow rounded-md">          
          <p className="text-gray-700">
            This is where the output will be displayed.
          </p>
        </div> */}
      </div>
    </div>
  </div>
  );
}

export default Animation;