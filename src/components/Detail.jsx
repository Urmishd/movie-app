import React, { useEffect, useState, useContext } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';
import { Appstate } from "../App";
import swal from 'sweetalert';

const Detail = () => {
  const { id } = useParams();
  const useAppstate = useContext(Appstate);
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setNewImage(_data.data().image);
      setLoading(false);
    }
    getData();
  }, [id]);

  const updateImage = async () => {
    setLoading(true);
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { image: newImage });
      setData((prevData) => ({ ...prevData, image: newImage }));
      swal({
        title: "Image Updated",
        icon: "success",
        buttons: false,
        timer: 3000
      });
      setEditing(false);
    } catch (err) {
      swal({
        title: err.message || "Error occurred",
        icon: "error",
        buttons: false,
        timer: 3000
      });
    }
    setLoading(false);
  };

  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      {loading ? (
        <div className='h-96 flex w-full justify-center items-center'>
          <ThreeCircles height={30} color="white" />
        </div>
      ) : (
        <>
          <img className='h-96 block md:sticky top-24' src={data.image} alt={data.title} />
          <div className='md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
              edit={false}
            />
            <p className='mt-2'>{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />

            {useAppstate.login && (
              <div className='mt-4'>
                {editing ? (
                  <div>
                    <input
                      type="text"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <button
                      onClick={updateImage}
                      className="flex mt-2 text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex mt-2 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex mt-2 text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg"
                  >
                    Edit Image
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
