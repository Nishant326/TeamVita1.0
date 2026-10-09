// Hero.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./pirate-home.css";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    eyebrow: "THE ACADEMY OF THE SEVEN SEAS",
    title: "Ahoy, Future Legends!",
    subtitle:
      "Chart your course through knowledge and conquer the seven seas of engineering.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1920&auto=format&fit=crop",
    eyebrow: "YOUR NEXT EXPEDITION BEGINS HERE",
    title: "Discover Your Knowledge Islands",
    subtitle:
      "Explore engineering branches, discover learning resources, and build your future.",
  },
];

function Hero() {
  const [curseLevel, setCurseLevel] = useState(0);
  const [parrotMessage, setParrotMessage] = useState("");

  const messages = [
    "Arrr! Every great engineer starts with curiosity.",
    "Captain's advice: explore every knowledge island!",
    "Treasure ahead! Your next lesson awaits, matey.",
    "The sea is rough, but your debugging skills are stronger!",
  ];

  const activateCurse = () => {
    setCurseLevel((level) => (level >= 3 ? 0 : level + 1));
    setParrotMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  };

  const restoreOrder = () => {
    setCurseLevel(0);
    setParrotMessage("");
  };

  return (
    <section
      className={`pirate-hero curse-level-${curseLevel}`}
      aria-label="Pirate Polytechnic introduction"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="pirate-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="pirate-hero-slide"
              style={{
                backgroundImage: `url("${slide.image}")`,
              }}
            >
              <div className="pirate-hero-overlay" />

              <div className="pirate-hero-content">
                <span className="pirate-eyebrow">
                  ⚓ {slide.eyebrow}
                </span>

                <h1>{slide.title}</h1>

                <p>{slide.subtitle}</p>

                <div className="pirate-hero-actions">
                  <a
                    href="#knowledge-islands"
                    className="pirate-btn pirate-btn-gold"
                  >
                    Begin Your Expedition
                    <span aria-hidden="true"> →</span>
                  </a>

                  <Link
                    to="/notice"
                    className="pirate-btn pirate-btn-outline"
                  >
                    Read Captain's Notices
                  </Link>
                </div>
              </div>

              <div className="pirate-hero-decoration" aria-hidden="true">
                ☠
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="captains-curse">
        <div className="curse-copy">
          <span className="curse-icon" aria-hidden="true">
            🦜
          </span>

          <div>
            <h2>Captain's Curse</h2>
            <p>
              {parrotMessage ||
                "Dare to awaken the chaos of the seven seas?"}
            </p>
          </div>
        </div>

        <div className="curse-actions">
          <span className="curse-meter">
            Chaos: {curseLevel}/3
          </span>

          <button
            type="button"
            className="curse-button"
            onClick={activateCurse}
          >
            Activate Curse
          </button>

          {curseLevel > 0 && (
            <button
              type="button"
              className="curse-reset"
              onClick={restoreOrder}
            >
              Restore Order
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;