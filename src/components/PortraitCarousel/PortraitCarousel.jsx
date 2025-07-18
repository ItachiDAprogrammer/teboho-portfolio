import React, { useEffect, useState } from 'react';
import './PortraitCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { client } from '../../cms/sanityClient';

import 'swiper/css';
import 'swiper/css/pagination';

const PortraitCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [expandedVideo, setExpandedVideo] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "portraitVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  const handleVideoClick = (videoUrl) => {
    // autoplay with sound on expand
    const autoplayUrl = videoUrl.includes('?')
      ? `${videoUrl}&autoplay=1`
      : `${videoUrl}?autoplay=1`;
    setExpandedVideo(autoplayUrl);
  };

  const closeExpandedVideo = () => setExpandedVideo(null);

  const handleKey = (e, videoUrl) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleVideoClick(videoUrl);
    }
  };

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
        <div className="expanded-video-overlay" onClick={closeExpandedVideo}>
          <div
            className="expanded-video-container"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={expandedVideo}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Expanded video"
            ></iframe>
            <button className="close-button" onClick={closeExpandedVideo}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortraitCarousel;