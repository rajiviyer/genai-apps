const OptionForm = ({selectedOption, handleSubmit, handleButtonClick, setAnimation, expression, setExpression}) => {
  return (
    <>
        {/* <h2 className="text-xl text-zinc-300 font-bold mb-4">Form</h2> */}
        <form 
            className="space-y-4" 
            onSubmit={handleSubmit}>
            <div 
                className="flex flex-wrap items-center space-x-4 mb-4 bg-slate-800">
                <button
                    type="button"
                    onClick={() => handleButtonClick('seed')}
                    className={`flex-auto px-4 py-1 mx-2 my-2 rounded text-white font-medium ${
                        selectedOption === 'seed' ? 'bg-slate-900' : 'bg-slate-800'
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
    </>
  )
}
export default OptionForm