import React, { useEffect, useState } from 'react';
import './LandscapeCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { client } from '../../cms/sanityClient';

const LandscapeCarousel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "landscapeVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);
  useEffect(() => {
  client
    .fetch(`*[_type == "landscapeVideo"]{title, videoUrl}`)
    .then((data) => {
      console.log('Landscape Videos:', data); // 👈 Add this
      setVideos(data);
    })
    .catch(console.error);
}, []);

  return (
    <div className="carousel-wrapper">
    <section className="work" id="work">
      <h2>My Work</h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="video-card">
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

export default LandscapeCarousel;