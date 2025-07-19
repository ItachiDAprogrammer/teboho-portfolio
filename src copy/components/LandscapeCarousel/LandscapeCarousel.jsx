import React, { useEffect, useState } from 'react';
import './LandscapeCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { client } from '../../cms/sanityClient';

import 'swiper/css';
import 'swiper/css/pagination';

const LandscapeCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "landscapeVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  const openVideo = (videoUrl) => {
    // autoplay WITH sound (user has clicked, so allowed in most browsers)
    const autoplayUrl = videoUrl.includes('?')
      ? `${videoUrl}&autoplay=1`
      : `${videoUrl}?autoplay=1`;
    setActiveVideo(autoplayUrl);
  };

  const closeVideo = () => setActiveVideo(null);

  // For keyboard access (Enter/Space)
  const handleKey = (e, videoUrl) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openVideo(videoUrl);
    }
  };

  return (
    <div className="landscape-carousel-wrapper">
      <section className="landscape" id="landscape">
        <h2>Long Form Videos</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1.1}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 },
          }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div
                className="landscape-card"
                role="button"
                tabIndex={0}
                onClick={() => openVideo(video.videoUrl)}
                onKeyDown={(e) => handleKey(e, video.videoUrl)}
              >
                <div className="video-wrapper">
                  <iframe
                    src={video.videoUrl}   // no autoplay in card
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <span className="play-button" aria-hidden="true">▶</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {activeVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={activeVideo}
              title="Expanded Video"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandscapeCarousel;