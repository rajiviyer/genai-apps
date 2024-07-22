import Loading from "../components/Loading";

const VideoDisplay = ({loading, video}) => {
  return (
    <>
        {/* <h2 className="text-xl text-zinc-300 font-bold mb-4">Output</h2> */}
        <div class="max-w-lg mx-auto">
            <div class="relative pb-16/9">
                {loading && <Loading />}
                {video && <video controls src={video} />}            
            </div>
        </div>      
    </>
  )
}
export default VideoDisplay