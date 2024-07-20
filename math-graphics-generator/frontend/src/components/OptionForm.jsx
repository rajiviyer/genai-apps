import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const OptionForm = ({ setVideo }) => {
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate-seed-video/', { option });
      setVideo(`data:video/mp4;base64,${response.data.video}`);
    } catch (error) {
      console.error('Error generating video', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="">Select an option</option>
          <option value="ContinuousMotionScene">Continuous Motion</option>
        </select>
        <button type="submit">Generate Video</button>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default OptionForm;
