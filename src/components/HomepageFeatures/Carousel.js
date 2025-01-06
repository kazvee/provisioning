import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './carousel.module.css';

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context(
    '../../../static/img/recipe-photos',
    false,
    /\.(png|jpe?g|gif|webp)$/
  )
);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledImages = shuffleArray(images);

const chunkImages = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chunkSize = isMobile ? 1 : 5;
  const chunkedImages = chunkImages(shuffledImages, chunkSize);

  const handlePrev = () => {
    const track = document.querySelector(`.${styles['carousel-track']}`);
    const activeSlide = document.querySelector(
      `.${styles['carousel-slide']}.${styles['active']}`
    );
    const prevSlide = activeSlide.previousElementSibling;

    if (prevSlide) {
      activeSlide.classList.remove(styles.active);
      prevSlide.classList.add(styles.active);
      track.style.transform = `translateX(-${prevSlide.offsetLeft}px)`;
    } else {
      const lastSlide = document.querySelector(
        `.${styles['carousel-slide']}:last-child`
      );
      activeSlide.classList.remove(styles.active);
      lastSlide.classList.add(styles.active);
      track.style.transform = `translateX(-${lastSlide.offsetLeft}px)`;
    }
  };

  const handleNext = () => {
    const track = document.querySelector(`.${styles['carousel-track']}`);
    const activeSlide = document.querySelector(
      `.${styles['carousel-slide']}.${styles['active']}`
    );
    const nextSlide = activeSlide.nextElementSibling;

    if (nextSlide) {
      activeSlide.classList.remove(styles.active);
      nextSlide.classList.add(styles.active);
      track.style.transform = `translateX(-${nextSlide.offsetLeft}px)`;
    } else {
      const firstSlide = document.querySelector(
        `.${styles['carousel-slide']}:first-child`
      );
      activeSlide.classList.remove(styles.active);
      firstSlide.classList.add(styles.active);
      track.style.transform = `translateX(0px)`;
    }
  };

  return (
    <BrowserOnly>
      {() => (
        <div className={styles['recipe-carousel']}>
          <button
            className={styles['carousel-prev']}
            onClick={handlePrev}
          ></button>
          <button
            className={styles['carousel-next']}
            onClick={handleNext}
          ></button>
          <div className={styles['carousel-track-container']}>
            <div className={styles['carousel-track']}>
              {chunkedImages.map((group, index) => (
                <div
                  className={`${styles['carousel-slide']} ${
                    index === 0 ? styles.active : ''
                  }`}
                  key={index}
                >
                  <div className={styles['carousel-row']}>
                    {group.map((image, imageIndex) => (
                      <div className={styles['carousel-item']} key={imageIndex}>
                        <img
                          src={image.default}
                          alt={`Slide ${index + 1}`}
                          loading='lazy'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};

export default Carousel;
