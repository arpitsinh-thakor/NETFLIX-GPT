

const GPTSearchBar = () => {
  return (
    <div className="pt-[7%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
            <input type="text"  
                className="p-3 m-2 col-span-9 rounded-lg" placeholder="What would you like to watch today ?" />
            <button 
                className="col-span-3 m-2 py-2 px-4 bg-red-500 text-white rounded-lg">Search</button>
        </form>
    </div>
  )
}

export default GPTSearchBar