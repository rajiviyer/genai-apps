import {useState} from "react";
import axios from "axios";
import Loading from "./Loading";
const FunctionForm = ({setVideo}) => {
    const [expression, setExpression] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const url = "http://77.237.241.186:8902/generate-cont-motion/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(url, {expression})
            setVideo(`data:video/mp4;base64,${response.data.video}`);
        } catch (error) {
            console.error('Error generating video', error);
        } finally {
            setIsLoading(false);
        }        
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter math expression (e.g., x**2 + 3*x + 2)" 
        />
        <button type="submit">Generate Video</button>        
    </form>
    {isLoading && <Loading />}
    </>
  );
};

export default FunctionForm;