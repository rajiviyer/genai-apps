import Head from "next/head";
import AudioRecorder from "../components/AudioRecorder";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Voice Transcriber App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen">
        <AudioRecorder />
      </main>
    </div>
  );
};

export default Home;
