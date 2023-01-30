import { getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { moviesRef } from '../firebase/firebase'


const Cards = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _data = await getDocs(moviesRef)
            _data.forEach((doc) => {
                setData((prv) => [...prv,{...(doc.data()), id: doc.id}])
            })

            setLoading(false)
        }
        getData();
    }, [])

    return (
        <>
            <div className='flex flex-wrap justifu-between p-3 mt-2'>
                {loading ? <div className='w-full flex justify-center items-center h-96'><BallTriangle /></div> :
                    data.map((e, index) => {
                        return (
                            <div key={index} className='card shadow-lg p-2 font-medium hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                                <img className='h-80' src={e.image} />
                                <h1><span className='text-gray-500 mr-1'>Name:</span>{e.title}</h1>
                                <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating:</span>
                                    <ReactStars
                                        size={20}
                                        half={true}
                                        value={5}
                                        edit={false}
                                    />
                                </h1>
                                <h1><span className='text-gray-500 mr-1'>Year:</span>{e.Year}</h1>
                            </div>
                        )
                    })
                }
            </div>



        </>
    )
}

export default Cards