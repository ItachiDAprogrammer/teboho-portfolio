import React, { useEffect, useState } from 'react';
import './PortraitCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { client } from '../../cms/sanityClient';

const PortraitCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [expandedVideo, setExpandedVideo] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "portraitVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  const handleVideoClick = (url) => {
    setExpandedVideo(url);
  };

  const closeVideo = () => {
    setExpandedVideo(null);
  };

  const handleKey = (e, url) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleVideoClick(url);
    }
  };

  return (
    <div className="portrait-carousel-wrapper">
      <section className="shorts" id="shorts">
        <h2>Short Form Videos</h2>
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          loop
          grabCursor
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          pagination={{ clickable: true }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index} className="short-card-slide">
              <div
                className="short-card"
                role="button"
                tabIndex={0}
                onClick={() => handleVideoClick(video.videoUrl)}
                onKeyDown={(e) => handleKey(e, video.videoUrl)}
              >
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <span className="play-overlay" aria-hidden="true">▶</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {expandedVideo && (
        <div className="expanded-video-overlay" onClick={closeVideo}>
          <div className="expanded-video-container" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`${expandedVideo}?autoplay=1&mute=0`}
              title="Expanded Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button className="close-button" onClick={closeVideo}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortraitCarousel;