// {showModal ? (
//     <>
//       <div
//         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//       >
//         <div className="relative h-full w-full my-6 mx-auto max-w-3xl">
//           {/*content*/}
//           <div className="border-0 dark:bg-zinc-300  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
//             {/*header*/}
//             <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//               <h3 className="text-3xl font-semibold">
//                 Search Properties
//               </h3>
//               <button
//                 className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                 onClick={() => setShowModal(false)}
//               >
//                 <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                   ×
//                 </span>
//               </button>
//             </div>
//             {/*body*/}
//             <div className="relative p-6 flex-auto">
//               <div className="my-4 text-slate-500 text-lg leading-relaxed">
//               <input type="text" id="text" className="border border-green-700
//                text-gray-900 text-sm rounded-lg focus:ring-green-500
//                 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-300
//                  dark:border-gray-500 dark:placeholder-gray-900 dark:text-gray-900"
//                   placeholder="search..." 
//                   required
//                   value={searchValue}
//                   onChange={(e) => { setSearchValue(e.target.value) }}
//                   />
                 
//                     <Link to="/single" >
//                           <div className="block overflow-hidden mx-4 my-4 rounded-2xl">
//                           <img className="object-cover w-full h-56" src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />

//                           <div className="p-4 bg-gray-900">
//                                   <dl>
//                                   <div>
//                                       <dt className="sr-only">
//                                       Price
//                                       </dt>

//                                       <dd className="text-sm text-gray-100">
//                                       ETH 2/ $ 240, 000
//                                       </dd>
//                                   </div>

//                                   <div>
//                                       <dt className="sr-only">
//                                       Address
//                                       </dt>

//                                       <dd className="font-medium text-gray-100">
//                                       Ashongman
//                                       </dd>
//                                   </div>
//                                   </dl>

//                                   <dl className="flex items-center mt-6 space-x-8 text-xs">
//                                   <div className="sm:inline-flex sm:items-center sm:shrink-0">
//                                       <svg
//                                       className="w-4 h-4 text-green-500"
//                                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                                       >
//                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
//                                       </svg>

//                                       <div className="sm:ml-3 mt-1.5 sm:mt-0">
//                                       <dt className="text-gray-100">
//                                           Parking
//                                       </dt>

//                                       <dd className="font-medium text-gray-100">
//                                       2 spaces
//                                       </dd>
//                                       </div>
//                                   </div>

//                                   <div className="sm:inline-flex sm:items-center sm:shrink-0">
//                                       <svg
//                                       className="w-4 h-4 text-green-500"
//                                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                                       >
//                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//                                       </svg>

//                                       <div className="sm:ml-3 mt-1.5 sm:mt-0">
//                                       <dt className="text-gray-100">
//                                           Bathroom
//                                       </dt>

//                                       <dd className="font-medium text-gray-100">
//                                       2 rooms
//                                       </dd>
//                                       </div>
//                                   </div>

//                                   <div className="sm:inline-flex sm:items-center sm:shrink-0">
//                                       <svg
//                                       className="w-4 h-4 text-green-500"
//                                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                                       >
//                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//                                       </svg>

//                                       <div className="sm:ml-3 mt-1.5 sm:mt-0">
//                                       <dt className="text-gray-100">
//                                           Bedroom
//                                       </dt>

//                                       <dd className="font-medium text-gray-100">
//                                       2 rooms
//                                       </dd>
//                                       </div>
//                                   </div>
//                                   </dl>
//                               </div>
//                           </div>
//                           </Link>
                               
//               </div>
//             </div>
//             {/*footer*/}
//             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//               <button
//                 className="text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//     </>
//   ) : null}