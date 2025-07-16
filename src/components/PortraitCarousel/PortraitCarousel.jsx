import React, { useEffect, useState } from 'react';
import './PortraitCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { client } from '../../cms/sanityClient';

const PortraitCarousel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "portraitVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  return (
    <div className="portrait-carousel-wrapper">
    <section className="shorts" id="shorts">
      <h2>Short Form Videos</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="short-card">
              <iframe
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
    </section>
    </div>
  );
};

export default PortraitCarousel;