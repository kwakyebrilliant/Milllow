import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Footer from './Footer'

import { FaSearch } from 'react-icons/fa'

// import {
//   OfficeBuildingIcon,
//   HomeIcon,
//   QuestionMarkCircleIcon
// } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

// ABIs
import RealEstate from '../abis/RealEstate.json';
import Escrow from '../abis/Escrow.json';

// Config
import config from '.././config.json';


const Properties = () => {

  const [showModal, setShowModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [category, setCategory] = useState('all');

  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])


  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    // config[network.chainId].escrow.address
    
   const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
   const totalSupply = await realEstate.totalSupply()
   const homes = []

   for (var i = 1; i <= totalSupply; i++) {
    const uri = await realEstate.tokenURI(i)
    const response = await fetch(uri)
    const metadata = await response.json()
    homes.push(metadata)
  }

  setHomes(homes)
   
   const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
   setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })

  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
    <div className='w-full h-screen pt-20'>

      <div className='mx-4 my-8'>
        <div className="flex items-center justify-between">
          <h2 className='text-3xl font-bold'>Categories</h2>
          <>
      <FaSearch onClick={() => setShowModal2(true)} className='w-6 h-6 hover:text-black text-green-700 mr-5 mt-4 ' />

       {showModal2 ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative h-full w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 dark:bg-zinc-300  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Search Properties
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal2(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-slate-500 text-lg leading-relaxed">
             
               <input type="text" id="text" className="border border-green-700
            text-gray-900 text-sm rounded-lg focus:ring-green-500
            focus:border-green-500 block w-full p-2.5 dark:bg-zinc-300
                dark:border-gray-500 dark:placeholder-gray-900 dark:text-gray-900"
                  placeholder="search..." 
                  required
                  value={searchValue}
                  onChange={(e) => { setSearchValue(e.target.value) }}
                  />
                 
                    <Link to="/single" >
                          <div className="block overflow-hidden mx-4 my-4 rounded-2xl">
                          <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />

                          <div className="p-4 bg-gray-900">
                                  <dl>
                                  <div>
                                      <dt className="sr-only">
                                      Price
                                      </dt>

                                      <dd className="text-sm text-gray-100">
                                      ETH 2/ $ 240, 000
                                      </dd>
                                  </div>

                                  <div>
                                      <dt className="sr-only">
                                      Address
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      Ashongman
                                      </dd>
                                  </div>
                                  </dl>

                                  <dl className="flex items-center mt-6 space-x-8 text-xs">
                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Parking
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      2 spaces
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Bathroom
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      2 rooms
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-100">
                                          Bedroom
                                      </dt>

                                      <dd className="font-medium text-gray-100">
                                      2 rooms
                                      </dd>
                                      </div>
                                  </div>
                                  </dl>
                              </div>
                          </div>
                          </Link>
                               
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal2(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null}


      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative h-full w-full my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 dark:bg-zinc-100  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Property Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                     
                  <div className='w-full'>

                      <div className='mx-4'>

                      <section>
                      <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
                          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                              <div className="aspect-w-1 aspect-h-1">
                              <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover w-[800px] rounded-xl"
                                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                              />
                              </div>

                              <div className="grid grid-cols-2 gap-4 lg:mt-4">
                              <div className="aspect-w-1 aspect-h-1">
                                  <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover lg:h-48 h-24 rounded-xl"
                                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                  />
                              </div>

                              <div className="aspect-w-1 aspect-h-1">
                                  <img
                                  alt="Mobile Phone Stand"
                                  className="object-cover lg:h-48 h-24  rounded-xl"
                                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                  />
                              </div>

                            
                              </div>
                          </div>

                          <div className="sticky top-0">
                          <strong className="border border-green-600 rounded-full tracking-wide px-3 font-medium py-0.5 text-xs bg-gray-100 text-green-600"> 
                          For Sale
                          </strong>

                              <div class="flex justify-between mt-8">
                              <div className="max-w-[35ch]">
                                  <h1 className="text-2xl font-bold">
                                  Ashongman
                                  </h1>

                                  <p className="mt-0.5 text-sm">
                                  Highest Rated
                                  </p>

                                  <div class="flex mt-2 -ml-0.5">
                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-yellow-400"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>

                                  <svg
                                      className="w-5 h-5 text-gray-200"
                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  </div>
                              </div>

                              <p className="text-lg font-bold">
                                ETH 2/ $240,000
                              </p>
                              </div>

                              <details className="relative mt-4 group">
                              <summary className="block">
                                  <div>
                                  <div className="prose max-w-none group-open:hidden">
                                      <p>
                                      That is it
                                      </p>
                                  </div>

                                  <span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                                      Read More
                                  </span>
                                  </div>
                              </summary>

                              <div className="pb-6 prose max-w-none">
                                  That is it
                              </div>
                              </details>

                              <form className="mt-8">

                              <p className="text-lg inline-flex font-medium">
                              <dl className="flex items-center mt-6 space-x-8 text-xs">
                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-900">
                                          Parking
                                      </dt>

                                      <dd className="font-medium">
                                          2 spaces
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-900">
                                          Bathroom
                                      </dt>

                                      <dd className="font-medium">
                                          2 rooms
                                      </dd>
                                      </div>
                                  </div>

                                  <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                      <svg
                                      className="w-4 h-4 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                      >
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                      </svg>

                                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                      <dt className="text-gray-900">
                                          Bedroom
                                      </dt>

                                      <dd className="font-medium">
                                          2 rooms
                                      </dd>
                                      </div>
                                  </div>
                                  </dl>
                              </p>
                              
                              <div className="flex mt-8">
                              <a
                              className="w-full text-center cursor-pointer items-center px-8 py-3 mt-8 text-white bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 active:text-green-500 focus:outline-none focus:ring"
                              onClick={() => setShowModal(true)}
                              type="submit"
                              >
                              <span className="text-lg font-medium">Own Property</span>
                              </a>
                                
                              </div>

                            

                              </form>
                          </div>
                          </div>
                      </div>
                      </section>

                    
                  </div>

                  </div>
                                   
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
      </div>
      </div>


          <div>
          <section>
  <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
    <div
      className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start"
    >
    <div className="lg:sticky lg:top-4">
      <details
        open
        className="overflow-hidden border border-gray-200 rounded"
      >
       

        <form
          action=""
          className="border-t border-gray-200 lg:border-t-0"
        >
          
           <div>
            <fieldset>
              <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                Category
              </legend>

              <div class="px-5 py-6 space-y-2">
              <div class="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 border-gray-300 rounded"
                    value="all"
                    checked={category === "all"}
                    onChange={(e) => { setCategory(e.target.value) }}
                  />

                  <label
                    for="3+"
                    className="ml-3 text-sm font-medium"
                  >
                    All
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 border-gray-300 rounded"
                    value="home"
                    checked={category === "home"}
                    onChange={(e) => { setCategory(e.target.value) }}
                  />

                  <label
                    for="3+"
                    className="ml-3 text-sm font-medium"
                  >
                    Home
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 border-gray-300 rounded"
                    value="offices"
                    checked={category === "offices"}
                    onChange={(e) => { setCategory(e.target.value) }}
                  />

                  <label
                    for="8+"
                    className="ml-3 text-sm font-medium"
                  >
                   Offices
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    value="luxury"
                    checked={category === "luxury"}
                    onChange={(e) => { setCategory(e.target.value) }}
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    for="12+"
                    className="ml-3 text-sm font-medium"
                  >
                    Luxury
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    value="industrial"
                    checked={category === "industrial"}
                    onChange={(e) => { setCategory(e.target.value) }}
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    for="16+"
                    className="ml-3 text-sm font-medium"
                  >
                    Industrial
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    value="others"
                    checked={category === "others"}
                    onChange={(e) => { setCategory(e.target.value) }}
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    for="16+"
                    className="ml-3 text-sm font-medium"
                  >
                    Others
                  </label>
                </div>
              </div>
            </fieldset>
          </div>


          <fieldset>
            <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
              Type
            </legend>

            <div className="px-5 py-6 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="sale"
                  checked={category === "sale"}
                  onChange={(e) => { setCategory(e.target.value) }}
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  for="toy"
                  class="ml-3 text-sm font-medium"
                >
                  Sale
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  value="rent"
                  checked={category === "rent"}
                  onChange={(e) => { setCategory(e.target.value) }}
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  for="game"
                  className="ml-3 text-sm font-medium"
                >
                  Rent
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  value="lease"
                  checked={category === "lease"}
                  onChange={(e) => { setCategory(e.target.value) }}
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  for="outdoor"
                  className="ml-3 text-sm font-medium"
                >
                  Lease
                </label>
              </div>

              
            </div>
          </fieldset>

         

        </form>
      </details>
    </div>

      <div className="lg:col-span-3">

        <div className="grid grid-cols-1 gap-px bg-white border border-gray-200 sm:grid-cols-2 lg:grid-cols-2">
        {
          category ==='all' && (
            <>
          
          {homes.map((home, index) => (
                <div className="block overflow-hidden mx-4 my-4 rounded-2xl" onClick={() => setShowModal(true)} >
                <img className="object-cover w-full h-56" src={home.image} alt="" />

                 <div className="p-4 bg-gray-900">
                        <dl>
                        <div>
                            <dt className="sr-only">
                            Price
                            </dt>

                            <dd className="text-sm text-gray-100">
                            ETH 2/ $ 240, 000
                            </dd>
                        </div>

                        <div>
                            <dt className="sr-only">
                            Address
                            </dt>

                            <dd className="font-medium text-gray-100">
                            Ashongman
                            </dd>
                        </div>
                        </dl>

                        <dl className="flex items-center mt-6 space-x-8 text-xs">
                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Parking
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 spaces
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bathroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 rooms
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bedroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 rooms
                            </dd>
                            </div>
                        </div>
                        </dl>
                    </div>
                </div>
                
                ))}
             
            </>
          )
        }
        {
          category ==='home' && (
            <>
          <Link to="/single">
                <div className="block overflow-hidden mx-4 my-4 rounded-2xl">
                <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />

                 <div className="p-4 bg-gray-900">
                        <dl>
                        <div>
                            <dt className="sr-only">
                            Price
                            </dt>

                            <dd className="text-sm text-gray-100">
                            ETH 2/ $ 240, 000
                            </dd>
                        </div>

                        <div>
                            <dt className="sr-only">
                            Address
                            </dt>

                            <dd className="font-medium text-gray-100">
                            Ashongman
                            </dd>
                        </div>
                        </dl>

                        <dl className="flex items-center mt-6 space-x-8 text-xs">
                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Parking
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 spaces
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bathroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 rooms
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bedroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            2 rooms
                            </dd>
                            </div>
                        </div>
                        </dl>
                    </div>
                </div>
                </Link>
              
            </>
          )
        }
        
        
       
        {/* {
          category ==='lease' && (
            <> */}
            {/* {currentProperty.filter((data) => data.nested.propertytype.match(new RegExp(category, "i"))).map((data) => (
          <Link to="/single" 
          state={{
            id: data.id,
            propertynumber: data.propertynumber,
            ownername: data.ownername,
            propertylocation: data.nested.propertylocation,
            propertydescription: data.nested.propertydescription,
            propertyspace: data.nested.propertyspace,
            propertyparkingspace: data.nested.propertyparkingspace,
            propertybathroom: data.nested.propertybathroom,
            propertybedroom: data.nested.propertybedroom,
            propertyprice: data.nested.propertyprice,
            propertycategory: data.nested.propertycategory,
            propertytype: data.nested.propertytype,
            propertyduration: data.nested.propertyduration,
            hash: data.nested.hash,
            supportimage1: data.nested.supportimage1,
            supportimage2: data.nested.supportimage2,
            document: data.nested.document
          }}>
                <div className="block overflow-hidden mx-4 my-4 rounded-2xl">
                <img className="object-cover w-full h-56" src={data.nested.hash} alt="" />

                 <div className="p-4 bg-gray-900">
                        <dl>
                        <div>
                            <dt className="sr-only">
                            Price
                            </dt>

                            <dd className="text-sm text-gray-100">
                            ETH {data.nested.propertyprice}/ $ 240, 000
                            </dd>
                        </div>

                        <div>
                            <dt className="sr-only">
                            Address
                            </dt>

                            <dd className="font-medium text-gray-100">
                            {data.nested.propertylocation}
                            </dd>
                        </div>
                        </dl>

                        <dl className="flex items-center mt-6 space-x-8 text-xs">
                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Parking
                            </dt>

                            <dd className="font-medium text-gray-100">
                            {data.nested.propertyparkingspace}  spaces
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bathroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            {data.nested.propertybathroom}  rooms
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-100">
                                Bedroom
                            </dt>

                            <dd className="font-medium text-gray-100">
                            {data.nested.propertybedroom} rooms
                            </dd>
                            </div>
                        </div>
                        </dl>
                    </div>
                </div>
                </Link>
              ))
              } */}
            {/* </>
          )
        }    */}
         
              </div>
            </div>
          </div>
        </div>
      </section>
     </div>

           <div className='w-full my-32'>

          <div className='mx-4 my-8'>
            <h2 className='text-3xl font-bold'>Hot Deal</h2>
          </div>

        
            <div className='grid md:grid-cols-2 gap-4 mx-8 text-center'>
              
            <div className="flex flex-col bg-white rounded-sm group hover:shadow-lg">
              <img className="object-cover rounded-2xl w-full h-full" src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />  
            </div>


            <div className="flex flex-col bg-white rounded-sm">
             
                    <h5 className="text-5xl mt-20 font-bold text-green-900">
                    ETH 2 / $ 240, 000
                    </h5>
                    <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                    <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">
                    Ashongman
                    </p>

                    <p className="text-lg inline-flex font-medium">
                    <dl className="flex items-center mt-6 space-x-8 text-xs">
                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-900">
                                Parking
                            </dt>

                            <dd className="font-medium">
                            2 spaces
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-900">
                                Bathroom
                            </dt>

                            <dd className="font-medium">
                            2 rooms
                            </dd>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:items-center sm:shrink-0">
                            <svg
                            className="w-4 h-4 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>

                            <div className="sm:ml-3 mt-1.5 sm:mt-0">
                            <dt className="text-gray-900">
                                Bedroom
                            </dt>

                            <dd className="font-medium">
                            2 rooms
                            </dd>
                            </div>
                        </div>
                        </dl>
                    </p>

                    </div>
                    <div className="items-center mt-4">
                    <div className='inline-flex flex-col'>
                      <Link to="/single">
                       <button className='px-3 py-2'>View Details</button>
                      </Link>
                      </div>
                     </div>
                    
            </div>

            </div>
            
          </div>


      <Footer />
    </div>
    </div>
  )
}

export default Properties