import { useEffect, useRef, useState } from 'preact/hooks'
import * as icons from "../Icons"
import { Octokit } from 'octokit'

import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'


export default function Cardo() {
  let images = [img1, img2, img3, img4]
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [releases, setReleases] = useState({ Windows: '', Mac: '', other: 'https://github.com/cardo-podcast/cardo/releases/latest/' })
  const [plattform, setPlattform] = useState<keyof typeof releases>('other')

  const getLatestsRelease = async () => {
    const octokit = new Octokit({
      auth: import.meta.env.VITE_GITHUB_API_TOKEN
    })

    const r = await octokit.request('GET /repos/cardo-podcast/cardo/releases/latest', {
      owner: 'OWNER',
      repo: 'REPO',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const newReleases = { ...releases }

    for (const release of r.data.assets) {
      if (release.name.endsWith('.msi')) {
        newReleases.Windows = release.browser_download_url
      } else if (release.name.endsWith('.dmg')) {
        newReleases.Mac = release.browser_download_url
      }
    }

    setReleases(newReleases)
  }

  useEffect(() => {
    document.title = 'Cardo';

    if (navigator.userAgent.includes('Win')) {
      setPlattform('Windows')
    } else if (navigator.userAgent.includes('Mac')) {
      setPlattform('Mac')
    }

    getLatestsRelease()
  }, []);

  return (
    <div className='w-full text-zinc-100 flex flex-col items-center pt-6 gap-8'>
      <div className='flex flex-col items-center gap-1'>
        <img
          className='w-16 cursor-pointer hover:p-1'
          title='Open Github Repo'
          src="https://raw.githubusercontent.com/cardo-podcast/cardo/master/src-tauri/icons/icon.png"
          onClick={() => open('https://github.com/cardo-podcast/cardo/')}
        />
        <h1 className='text-2xl md:text-4xl lg:text-5xl text-nowrap'>Cardo podcast client</h1>

      </div>
      <div className='group relative w-5/6 lg:w-2/5'>

        <div className='opacity-0 group-hover:opacity-100 transition-opacity absolute w-full top-1/2 -translate-y-1/2 flex justify-between h-1/2'>
          <button
            className="bg-purple-500 w-1/12 rounded-r-full opacity-60 hover:opacity-90 transition-opacity"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / images.length
                setIndex(Math.max(0, index - 1))
              }
            }}
          >
            {icons.arrowLeft}
          </button>

          <button
            className="bg-purple-500 w-1/12 rounded-l-full opacity-60 hover:opacity-90 transition-opacity duration-200"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / images.length
                setIndex(Math.min(images.length - 1, index + 1))
              }
            }}
          >
            {icons.arrowRight}
          </button>


        </div>
        <div className='flex overflow-x-auto snap-x snap-mandatory scroll-smooth shadow-lg shadow-zinc-950'
          ref={scrollRef}
        >
          {
            images.map(image => (
              <img
                className='shrink-0 snap-always snap-center'
                src={image}
              />
            ))
          }
        </div>

        <div className='absolute flex opacity-0 group-hover:opacity-100 bottom-0 mb-3 left-1/2 -translate-x-1/2 gap-3'>
          {
            images.map((_, i) => (
              <div className={`border-1 border-purple-900 w-[10px] h-[10px] rounded-full
                ${index == i ?
                  'bg-purple-700' :
                  'bg-zinc-100'
                }`} />
            ))
          }
        </div>
      </div>

      <div className='flex items-center rounded-md overflow-hidden'>
        <button
          className='flex items-center gap-1 bg-purple-700 pr-2 hover:bg-purple-600 h-12'
          title={plattform == 'other'? 'Go to releases page': 'Download latest release for ' + plattform}
          onClick={() => {
            open(releases[plattform])
          }}
        >
          <span className='w-10 p-1'>
            {
              plattform == 'Windows' ?
                icons.windows :
                plattform == 'Mac' ?
                  icons.apple :
                  icons.github
            }
          </span>
          <p className='text-lg'>DOWNLOAD</p>
        </button>
        {
          plattform != 'other' &&
          <button className='flex items-center bg-purple-900 hover:bg-purple-800 h-12'
          title='Go to releases page'
          onClick={() => open(releases.other)}
          >
            <span className='w-10 p-1'>
              {icons.github}
            </span>
          </button>
        }
      </div>

    </div>
  )
}