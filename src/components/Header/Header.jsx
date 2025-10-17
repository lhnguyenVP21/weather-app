import logo from '../../assets/images/logo.svg'
import iconsUnit from '../../assets/images/icon-units.svg'
import iconSearch from '../../assets/images/icon-search.svg'
const Header = () => {
  return (
    <div className=''>
        <div className="flex flex-row justify-between items-center p-10">
            <img src={logo} alt="logo"/>
            <div className='rounded-xl overflow-hidden'>
              <button className='bg-gray-600 h-12 w-28 flex flex-row justify-center items-center gap-4 hover:bg-gray-500 transition-colors duration-300'>
                <img src={iconsUnit} alt='icon-units' className=''/>
                <span className='font-bold'>Units</span>
              </button>
            </div>
        </div>
        <div>
          <h1 className='text-5xl font-bold text-center pt-20 pb-10'>How's the sky looking today?</h1>
          <form className="flex justify-center items-center max-w-[600px] mx-auto gap-4">
            <div className="flex items-center bg-gray-600 rounded-lg px-5 py-3 flex-1 gap-3">
              <img src={iconSearch} alt="icon-search" className="w-5 h-5 opacity-60" />
              <input
                type="text"
                placeholder="Search for a place..."
                className="bg-transparent border-none outline-none text-neutral-0 text-base flex-1 placeholder-neutral-300 font-sans focus:outline focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-500"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-neutral-0 rounded-lg px-8 py-3 font-semibold text-base transition-colors duration-200 hover:bg-blue-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700"
            >
              Search
            </button>
          </form>

        </div>
    </div>
  )
}

export default Header