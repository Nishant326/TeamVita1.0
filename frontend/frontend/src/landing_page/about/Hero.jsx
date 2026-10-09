import React from "react";
import {
  Anchor,
  Compass,
  Cpu,
  Zap,
  HardHat,
  Radio,
  Settings,
  Ship,
  GraduationCap,
  Telescope,
} from "lucide-react";
import "./vedora-about.css";

const branches = [
  {
    name: "Computer Science",
    short: "CSE",
    icon: Cpu,
    description: "Explore code, algorithms and digital frontiers.",
  },
  {
    name: "Electrical Engineering",
    short: "EE",
    icon: Zap,
    description: "Master the currents that power the fleet.",
  },
  {
    name: "Civil Engineering",
    short: "CE",
    icon: HardHat,
    description: "Design harbours, bridges and lasting foundations.",
  },
  {
    name: "Electronics & Communication",
    short: "ECE",
    icon: Radio,
    description: "Connect distant shores through technology.",
  },
  {
    name: "Mechanical Engineering",
    short: "ME",
    icon: Settings,
    description: "Understand the machines behind every voyage.",
  },
];

function Hero() {
  return (
    <main className="vedora-about">
      {/* Hero banner */}
      <section className="vedora-about-hero">
        <div className="vedora-about-overlay" />

        <div className="vedora-about-content">
          <span className="vedora-eyebrow">
            <Anchor size={16} />
            THE ACADEMY OF THE SEVEN SEAS
          </span>

          <h1>
            Welcome to
            <span> Vedora Institute of Technology</span>
          </h1>

          <p>
            Where curious minds chart bold courses, engineering
            meets exploration, and every student begins a new voyage.
          </p>

          <a href="#vedora-story" className="vedora-gold-button">
            Discover Our Story
            <Compass size={18} />
          </a>
        </div>

        <div className="vedora-hero-compass" aria-hidden="true">
          ✦
        </div>

        <div className="vedora-hero-caption">
          CHART YOUR COURSE · BUILD YOUR LEGACY
        </div>
      </section>

      {/* Institute story */}
      <section className="vedora-story" id="vedora-story">
        <div className="vedora-story-inner">
          <div className="vedora-story-visual">
            <div className="vedora-story-image">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
                alt="A mysterious island representing discovery and exploration"
                loading="lazy"
              />

              <div className="vedora-image-label">
                <Ship size={21} />
                <span>EVERY GREAT VOYAGE STARTS HERE</span>
              </div>
            </div>

            <div className="vedora-compass-stamp">
              <Compass size={34} />
              <span>EXPLORE</span>
            </div>
          </div>

          <div className="vedora-story-copy">
            <span className="vedora-section-kicker">
              OUR STORY
            </span>

            <h2>
              More than a college.
              <span> A world to discover.</span>
            </h2>

            <p>
              Welcome to Vedora Institute of Technology, a fictional
              maritime-inspired engineering academy created around
              curiosity, practical learning and the spirit of discovery.
            </p>

            <p>
              Here, every challenge is an unexplored island, every
              new skill is a valuable discovery, and every student
              has the opportunity to chart their own future.
            </p>

            <div className="vedora-story-note">
              <Telescope size={23} />
              <div>
                <strong>Our guiding principle</strong>
                <p>
                  Learn fearlessly. Build boldly. Explore endlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering branches */}
      <section className="vedora-disciplines">
        <div className="vedora-disciplines-inner">
          <div className="vedora-section-heading">
            <span className="vedora-section-kicker">
              CHOOSE YOUR EXPEDITION
            </span>

            <h2>Five Paths. One Horizon.</h2>

            <p>
              Every engineering discipline opens a different
              route toward discovery.
            </p>
          </div>

          <div className="vedora-branch-grid">
            {branches.map((branch, index) => {
              const Icon = branch.icon;

              return (
                <article className="vedora-branch-card" key={branch.short}>
                  <div className="vedora-branch-top">
                    <span>ISLAND 0{index + 1}</span>
                    <Compass size={19} />
                  </div>

                  <div className="vedora-branch-icon">
                    <Icon size={29} strokeWidth={1.7} />
                  </div>

                  <h3>{branch.name}</h3>
                  <p>{branch.description}</p>

                  <span className="vedora-branch-code">
                    {branch.short}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing banner */}
      <section className="vedora-closing">
        <div className="vedora-closing-inner">
          <GraduationCap size={36} />

          <div>
            <span className="vedora-section-kicker">
              YOUR VOYAGE AWAITS
            </span>
            <h2>The horizon belongs to the curious.</h2>
            <p>
              Set your sights on discovery and take the first step
              toward your engineering future.
            </p>
          </div>

          <a href="/study_materials" className="vedora-gold-button">
            Explore Resources
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Hero;