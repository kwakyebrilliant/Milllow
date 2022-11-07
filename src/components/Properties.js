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
import Home from './Home';


const Properties = () => {

  const [showModal, setShowModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [category, setCategory] = useState('all');

  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

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

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

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
                <div className="block overflow-hidden mx-4 my-4 rounded-2xl" onClick={() => togglePop(home)} >
                <img className="object-cover w-full h-56" src={home.image} alt="" />

                 <div className="p-4 bg-gray-900">
                        <dl>
                        <div>
                            <dt className="sr-only">
                            Price
                            </dt>

                            <dd className="text-sm text-gray-100">
                            {home.attributes[0].value} ETH / $ 24, 000
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
                                Space
                            </dt>

                            <dd className="font-medium text-gray-100">
                            {home.attributes[4].value} sqft
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
                            {home.attributes[3].value} rooms
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
                            {home.attributes[2].value}  rooms
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

        {/* {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
          )} */}
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
        
         
              </div>
            </div>
          </div>
        </div>
      </section>
     </div>

     {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
          )}


      <Footer />
    </div>
    </div>
  )
}

export default Properties