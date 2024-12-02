import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const TrendingBlog = ({ blogs }) => {
  return (
    <div>
      <div>
        <div className="blog-heading text-start py-2 mb-4">Trending</div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          400: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          1000: { slidesPerView: 4 },
        }}
      >
        {blogs?.map((item) => (
          <SwiperSlide key={item.id}>
           
            <Link to={`/detail/${item.id}`}>
              <div className="trending-img-position">
                <div className="trending-img-size">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="trending-img-relative"
                  />
                </div>
                <div className="trending-img-absolute"></div>
                <div className="trending-img-absolute-1">
                  <span className="text-white">{item.title}</span>
                  <div className="trending-meta-info">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingBlog;
