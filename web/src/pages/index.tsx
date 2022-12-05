import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps{
  poolsCount: number,
  guessesCount: number,
  usersCount: number
}

export default function Home(props : HomeProps) { 
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try{
      const response = await api.post('/pools', {
        title: poolTitle,

      })

      const {code} = response.data

      await navigator.clipboard.writeText(code)

      alert('mamou')

      setPoolTitle('')
    } catch(err){
      alert('mama')
      console.log(err)
    }

  }

  return (
      <div className='max-w-6xl h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
        <main>
          <Image src={logoImg} alt = "NLW copa" quality={100}/>

          <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className='mt-10 flex items-center gap-2'>
            <Image src={usersAvatarExampleImg} alt = "" quality={100}/>

            <strong className='text-gray-100 text-xl'><span className='text-ignite-500'>+{props.usersCount}</span> pessoas já estão usando</strong>
          </div>

          <form className='mt-10 flex' onSubmit={createPool}>
            <input type="text" required placeholder='Qual nome do seu bolão?' className='flex-1 px-6  py-4 rounded bg-gray-800 border-gray-600 text-gray-100' onChange={event => setPoolTitle(event.target.value)} value={poolTitle}/>
            <button type="submit" className='bg-yellow-500 px-6  py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'>CRIAR MEU BOLÃO</button>
          </form>

          <p className='text-gray-300 text-sm mt-[16px] max-w-[400px] leading-[160%]'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>


          <div className='mt-10 pt-10 border-t border-gray-600 items-center flex justify-between text-gray-100'>
            <div className='flex items-center gap-6'>
              <Image src={iconCheckImg} alt = "" quality={100} className=''/>
              <div className='flex flex-col'>
                <span className='text-2xl font-bold'>+{props.poolsCount}</span>
                <span>Bolões criados </span>
              </div>
            </div>
            <div className='w-px h-14 bg-gray-600'/>
            <div className='flex items-center gap-6'>
              <Image src={iconCheckImg} alt = "" quality={100} className=''/>
              <div className='flex flex-col'>
                <span className='text-2xl font-bold'>+{props.guessesCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação NLW Copa"   quality={100}
        />
      </div>
  )
} 

export async function getStaticProps() {
  
  const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return{
    props : {
      poolsCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    }
  }
}