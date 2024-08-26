import Router, { Route, route } from "preact-router";
import Cardo from "./pages/Cardo";
import { useEffect } from "preact/hooks";


function Redirect(to: string) {
  useEffect(() => { route(to) }, [])

  return (<></>)
}

export function App() {

  return (
    <div className='w-full h-screen bg-zinc-900 pt-10 font-sans overflow-y-auto scroll-smooth'>
      <div className='absolute top-0 w-full h-12 bg-zinc-950 flex justify-end px-3 py-1'>
        <a href='https://github.com/n0vella' target='_blank'
        className=' contents'
        >
          <img
            className='rounded-full hover:mix-blend-plus-lighter'
            src='https://avatars.githubusercontent.com/u/177157984'
            alt='Profile picture'
          />
        </a>
      </div>
      <Router>
        <Route path='/' component={() => Redirect('/cardo')} />
        <Route path='/cardo' component={Cardo} />
      </Router>
    </div >
  )
}
