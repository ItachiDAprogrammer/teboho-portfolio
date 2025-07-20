import React, { useState, useEffect } from 'react';
import './LandscapeCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { client } from '../../cms/sanityClient';

const LandscapeCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "landscapeVideo"]{title, videoUrl}`)
      .then((data) => setVideos(data))
      .catch(console.error);
  }, []);

  const handlePlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleKeyDown = (e, url) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlay(url);
    }
  };

  return (
    <div className="landscape-carousel-wrapper">
      <section className="landscape" id="landscape">
        <h2>Long Form Videos</h2>
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          loop
          grabCursor
          spaceBetween={40}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          className="landscape-swiper"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index} className="landscape-card-slide">
              <div
                className="landscape-card"
                onClick={() => handlePlay(video.videoUrl)}
                onKeyDown={(e) => handleKeyDown(e, video.videoUrl)}
                tabIndex={0}
                role="button"
              >
                <div className="video-wrapper">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="play-button">▶</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {selectedVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`${selectedVideo}?autoplay=1&mute=0`}
              title="Expanded Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandscapeCarousel;