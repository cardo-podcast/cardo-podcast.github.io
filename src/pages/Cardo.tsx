import { useState } from 'preact/hooks'
import * as icons from "../Icons"

import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'


export default function Cardo() {
  const [imageIndex, setImageIndex] = useState(0)
  const images = [img1, img2, img3, img4]

  return (
    <div className='w-full text-zinc-100 flex flex-col items-center pt-6 gap-6'>
      <h1 className='text-5xl'>Cardo podcast player</h1>
      <div className='group relative w-1/2'>
        <div className='opacity-0 group-hover:opacity-100 transition-opacity absolute w-full top-1/2 -translate-y-1/2 flex justify-between'>
          <button
            className="bg-purple-500 w-12 rounded-r-full h-60 opacity-60 hover:opacity-90 transition-opacity"
            onClick={() => {
              setImageIndex(imageIndex == 0? images.length: imageIndex - 1)
            }}
          >
            {icons.arrowLeft}
          </button>
          <button
            className="bg-purple-500 w-12 rounded-l-full h-60 opacity-60 hover:opacity-90 transition-opacity duration-200"
            onClick={() => {
              setImageIndex(imageIndex == images.length - 1? 0: imageIndex + 1)
            }}
          >
            {icons.arrowRight}
          </button>
        </div>
        <img
          className='shrink-0'
          src={images[imageIndex]}
        />
      </div>
    </div>
  )
}