

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 w-1/4">{overview}</p>
      <div>
        <button 
          className="bg-gray-500 text-black p-2 mx-2 px-10 text-lg bg-opacity-50 rounded-lg"
          >Play</button>
        <button 
          className="bg-gray-500 text-black p-2 px-10 text-lg bg-opacity-50 rounded-lg"
          >More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;