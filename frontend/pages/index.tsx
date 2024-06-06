import { NextPage } from 'next';
import ArrowBlackSvg from "../public/img/arrowBlack.svg"
import ArrowWhiteSvg from "../public/img/arrowWhite.svg"
import { useState, useEffect } from 'react';
import axios from "axios"

const API_URL = 'http://localhost:4000/data';

interface Data {
  image: string;
  title: string;
  desc: string;
}

const HomePage: NextPage = () => {
  const [data, setData] = useState<Data[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('fade-in');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const goToPrevious = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
      setAnimationClass('fade-in');
    }, 500); 
  };

  const goToNext = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
      setAnimationClass('fade-in');
    }, 500);
  };

  const getPrevIndex = () => (currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === data.length - 1 ? 0 : currentIndex + 1);

  return (
    <div className='min-h-screen overflow-hidden bg-white pt-[4%] pb-[3%]'>
      <div className='flex items-center justify-center px-16 mb-9'>
        <h2 className='t11-bold text-6xl mr-auto'>
          Есть всё, чтобы наполнить жизнь счастьем
        </h2>
        <div>
          <button title='prev' onClick={goToPrevious} 
          className='py-5 px-[22px] border border-grey rounded-full mr-3'>
            <ArrowBlackSvg />
          </button>
          <button title='next' onClick={goToNext} 
          className='py-5 px-[22px] bg-blue rounded-full'>
            <ArrowWhiteSvg />
          </button>
        </div>
      </div>
      <div className='relative flex w-full justify-center items-center'>
          <div className="absolute left-[-15%] w-[39%] h-[64%] overflow-hidden -rotate-2">
              <img className='rounded-[20px] opacity-30 h-full w-full' 
              src={data[getPrevIndex()]?.image} alt={data[getPrevIndex()]?.title} />
          </div>

          <div className={`z-10 rounded-[20px] bg-milk w-[46%] h-[63%] ${animationClass}`}>
              <img className='rounded-[20px] w-full h-[499px]' 
              src={data[currentIndex]?.image} alt={data[currentIndex]?.title} />
              <div className='p-6'>
                <h3 className='text-black-100 font-bold text-[24px]'>
                  {data[currentIndex]?.title}
                </h3>
                <p className='text-black-100 font-medium'>
                  {data[currentIndex]?.desc}
                </p>
              </div>
          </div>

          <div className="absolute right-[-15%] w-[39%] h-[64%]
          overflow-hidden rotate-2 rounded-[20px]">
              <img className='rounded-[20px] opacity-30 h-full w-full' 
              src={data[getNextIndex()]?.image} alt={data[getNextIndex()]?.title} />
          </div>
      </div>
    </div>
  )
};

export default HomePage;
