import Cardo from "./pages/Cardo";
import * as icons from './Icons'


export function App() {

  return (
    <div className='w-full h-screen bg-zinc-900 pt-10 font-sans overflow-y-auto scroll-smooth'>
      <div className='absolute top-0 w-full h-12 bg-zinc-950 flex justify-between px-3 py-1'>
        <div className='relative group'>

          <div className='absolute z-10 h-10 w-48 bg-yellow-400 items-center rounded-md py-1 px-2 flex group-hover:-translate-x-52
          transition-transform duration-300'>
            <span className='w-8'>{icons.tipJar}</span>
            <p className='font-medium cursor-default'>DO YOU LIKE THIS?</p>
          </div>

          <div className='gap-1 flex h-10'>
            <a href="https://www.buymeacoffee.com/n0vella" target="_blank">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-10" />
            </a>
            <a href="https://www.paypal.com/paypalme/adriannovella" target="_blank">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp196.png" alt="Paypal" className="h-10 rounded-md" />
            </a>
          </div>
        </div>

        <a href='https://github.com/cardo-podcast' target='_blank'
          className=' contents'
        >
          <img
            className='rounded-full hover:mix-blend-plus-lighter'
            title='Open Github profile'
            src='https://avatars.githubusercontent.com/u/177157984'
            alt='Profile picture'
          />
        </a>
      </div>
      <Cardo />
      <div className='w-full h-12 bg-zinc-950 flex justify-end px-3 py-1 mt-10'>
      </div>
    </div >
  )
}
