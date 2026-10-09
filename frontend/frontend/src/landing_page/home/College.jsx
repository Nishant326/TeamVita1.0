// College.jsx
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Zap,
  HardHat,
  Radio,
  Settings,
  Compass,
} from "lucide-react";

import "./pirate-home.css";

const branches = [
  {
    name: "Computer Science Engineering",
    route: "COMPUTER SCIENCE ENGINEERING",
    icon: Cpu,
    description:
      "Decode the mysteries of software, algorithms and digital worlds.",
    symbol: "01",
  },
  {
    name: "Electrical Engineering",
    route: "ELECTRICAL ENGINEERING",
    icon: Zap,
    description:
      "Master the power that keeps the whole fleet moving.",
    symbol: "02",
  },
  {
    name: "Civil Engineering",
    route: "CIVIL ENGINEERING",
    icon: HardHat,
    description:
      "Build bridges, harbours and foundations for new adventures.",
    symbol: "03",
  },
  {
    name: "Electronics & Communication Engineering",
    route: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    icon: Radio,
    description:
      "Send signals across the seas and connect distant shores.",
    symbol: "04",
  },
  {
    name: "Mechanical Engineering",
    route: "MECHANICAL ENGINEERING",
    icon: Settings,
    description:
      "Understand the engines and machines that power the voyage.",
    symbol: "05",
  },
];

function College() {
  return (
    <section
      className="knowledge-islands"
      id="knowledge-islands"
    >
      <div className="pirate-section-container">
        <div className="islands-heading">
          <span className="pirate-eyebrow">
            <Compass size={17} aria-hidden="true" />
            &nbsp; CHOOSE YOUR DESTINATION
          </span>

          <h2>Explore the Knowledge Islands</h2>

          <p>
            Every branch is a new expedition. Choose your island
            and discover the learning resources waiting for you.
          </p>

          <div className="pirate-divider" aria-hidden="true">
            ⚓
          </div>
        </div>

        <div className="island-grid">
          {branches.map((branch, index) => {
            const Icon = branch.icon;

            return (
              <motion.article
                className="island-card"
                key={branch.route}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                }}
                whileHover={{ y: -6 }}
              >
                <div className="island-card-top">
                  <span className="island-number">
                    ISLAND {branch.symbol}
                  </span>

                  <span className="island-compass" aria-hidden="true">
                    ✦
                  </span>
                </div>

                <div className="island-icon">
                  <Icon size={32} strokeWidth={1.7} />
                </div>

                <h3>{branch.name}</h3>

                <p>{branch.description}</p>

                <Link
                  className="island-link"
                  to={`/syllabus/${branch.route}`}
                  aria-label={`Explore ${branch.name} syllabus`}
                >
                  Explore Island
                  <span aria-hidden="true"> →</span>
                </Link>

                <div
                  className="island-card-decoration"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>

        <p className="islands-footer">
          <span aria-hidden="true">☠</span>
          &nbsp; Five islands. Countless discoveries. One great voyage.
        </p>
      </div>
    </section>
  );
}

export default College;