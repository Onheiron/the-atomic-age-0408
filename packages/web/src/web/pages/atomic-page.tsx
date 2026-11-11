/* oxlint-disable jsx-a11y/prefer-tag-over-role -- inline SVG has no equivalent semantic HTML element */
import { useState } from "react";
import { ArrowUpRight, ArrowDown, ArrowRight, Minus, Plus, RotateCcw, Menu, X } from "lucide-react";
import { AtomArt, Star } from "../components/atom-art";
const particles = [
  {
    name: "Proton",
    sign: "+",
    color: "red",
    where: "IN THE NUCLEUS",
    text: "The identity maker.",
    desc: "Positively charged and tucked inside the nucleus. The number of protons decides which element an atom is. One makes hydrogen. Six makes carbon.",
    fact: "Charge +1 · Relative mass ≈ 1",
  },
  {
    name: "Neutron",
    sign: "0",
    color: "sage",
    where: "IN THE NUCLEUS",
    text: "The neutral neighbor.",
    desc: "No electric charge, but plenty of mass. Neutrons help many nuclei stay together. Change their number and you get a different isotope of the same element.",
    fact: "Charge 0 · Relative mass ≈ 1",
  },
  {
    name: "Electron",
    sign: "−",
    color: "teal",
    where: "AROUND THE NUCLEUS",
    text: "The connection maker.",
    desc: "Negatively charged and much lighter than protons. Electrons occupy quantum states around the nucleus, and their arrangement shapes how atoms bond.",
    fact: "Charge −1 · Relative mass ≈ 1/1836",
  },
];
const elements = [
  "",
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon",
];
const symbols = ["", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne"];
const quiz = [
  {
    q: "What gives an atom its identity?",
    options: ["Its number of electrons", "Its number of protons", "Its size"],
    answer: 1,
    why: "Proton count is the atomic number. Every carbon atom has six protons, no matter its isotope or charge.",
  },
  {
    q: "Where are you likely to find an electron?",
    options: ["On a fixed circular track", "Inside a neutron", "In a cloud of possible locations"],
    answer: 2,
    why: "An orbital describes probabilities of finding an electron—not a tiny planet following a definite path.",
  },
  {
    q: "What happens when an atom gains an electron?",
    options: ["It becomes a negative ion", "It becomes a new element", "It gains a proton"],
    answer: 0,
    why: "One extra negative charge makes an anion. Only changing the number of protons changes the element.",
  },
];
function Builder() {
  const [p, setP] = useState(6),
    [n, setN] = useState(6),
    [e, setE] = useState(6);
  const charge = p - e;
  return (
    <section id="workshop" className="workshop chapter">
      <div className="section-top">
        <span className="eyebrow">02 / THE ATOM WORKSHOP</span>
        <span className="eyebrow">A LITTLE EXPERIMENT GOES A LONG WAY</span>
      </div>
      <div className="workshop-heading">
        <h2>
          Some assembly
          <br />
          <em>required.</em>
        </h2>
        <p>
          Meet your very own atom. Add a particle, change an element, and see what happens. No lab
          coat necessary.
        </p>
      </div>
      <div className="builder">
        <div className="builder-visual">
          <div className="element-tile">
            <small>{p}</small>
            <strong>{symbols[p]}</strong>
            <span>{elements[p]}</span>
          </div>
          <svg
            viewBox="0 0 460 380"
            aria-label={`${elements[p]} atom: ${p} protons, ${n} neutrons and ${e} electrons`}
            role="img"
          >
            <circle cx="230" cy="190" r="83" className="shell" />
            {e > 2 && <circle cx="230" cy="190" r="145" className="shell" />}
            <g>
              {Array.from({ length: p + n }, (_, i) => {
                let a = i * 2.4,
                  r = 14 * Math.sqrt(i);
                return (
                  <circle
                    key={i}
                    cx={230 + Math.cos(a) * r}
                    cy={190 + Math.sin(a) * r}
                    r="10"
                    fill={i < p ? "#bf4934" : "#91a497"}
                    stroke="#f4ecd9"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>
            {Array.from({ length: e }, (_, i) => {
              const inner = i < 2,
                count = inner ? Math.min(e, 2) : e - 2,
                a = ((inner ? i : i - 2) / count) * 2 * Math.PI - 0.8,
                r = inner ? 83 : 145;
              return (
                <g key={i}>
                  <circle
                    cx={230 + Math.cos(a) * r}
                    cy={190 + Math.sin(a) * r}
                    r="12"
                    fill="#193f3b"
                  />
                  <text
                    x={230 + Math.cos(a) * r}
                    y={195 + Math.sin(a) * r}
                    textAnchor="middle"
                    fill="#f4ecd9"
                    fontSize="18"
                  >
                    −
                  </text>
                </g>
              );
            })}
          </svg>
          <span className="diagram-caption">SIMPLIFIED SHELL MODEL · NOT TO SCALE</span>
        </div>
        <div className="builder-controls">
          <div className="preset-label eyebrow">START WITH AN ELEMENT</div>
          <div className="presets">
            {[1, 2, 6, 8].map((num) => (
              <button
                key={num}
                className={p === num ? "selected" : ""}
                onClick={() => {
                  setP(num);
                  setN(num === 1 ? 0 : num);
                  setE(num);
                }}
              >
                {elements[num]}
              </button>
            ))}
          </div>
          {[
            [p, setP, "Protons", "Change the element", 1, 10],
            [n, setN, "Neutrons", "Change the isotope", 0, 14],
            [e, setE, "Electrons", "Change the charge", 0, 10],
          ].map(([value, setter, label, sub, min, max], i) => (
            <div className="stepper-row" key={String(label)}>
              <span className={`particle-dot ${particles[i].color}`}>{particles[i].sign}</span>
              <div>
                <strong>{String(label)}</strong>
                <small>{String(sub)}</small>
              </div>
              <div className="stepper">
                <button
                  aria-label={`Remove ${String(label).toLowerCase().slice(0, -1)}`}
                  disabled={Number(value) <= Number(min)}
                  onClick={() => (setter as (v: number) => void)(Number(value) - 1)}
                >
                  <Minus size={16} />
                </button>
                <output>{Number(value)}</output>
                <button
                  aria-label={`Add ${String(label).toLowerCase().slice(0, -1)}`}
                  disabled={Number(value) >= Number(max)}
                  onClick={() => (setter as (v: number) => void)(Number(value) + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="atom-result" aria-live="polite">
            <span className="eyebrow">YOU MADE</span>
            <h3>
              {elements[p]}-{p + n}
              <span>
                {charge === 0 ? "Neutral" : `${Math.abs(charge)}${charge > 0 ? "+" : "−"} ion`}
              </span>
            </h3>
            <p>
              {charge === 0
                ? "Equal protons and electrons. The charges balance out."
                : charge > 0
                  ? "More protons than electrons makes a positive ion."
                  : "More electrons than protons makes a negative ion."}{" "}
              Mass number: {p + n}.
            </p>
            <small>Illustrative combinations; not every isotope is stable.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
function Quiz() {
  const [step, setStep] = useState(0),
    [choice, setChoice] = useState<number | null>(null),
    [score, setScore] = useState(0);
  const done = step === quiz.length,
    item = quiz[Math.min(step, 2)];
  return (
    <section id="quiz" className="quiz-section chapter">
      <div className="quiz-picture">
        <img
          src="/images/science-lab.jpg"
          alt="Vintage-style illustration of a woman scientist holding a flask in a laboratory"
          loading="eager"
        />
        <span className="picture-label">CURIOSITY LOOKS GOOD ON YOU.</span>
      </div>
      <div className="quiz-content">
        <span className="eyebrow">04 / THE KNOW-HOW CHECK</span>
        <h2>
          {done ? "You’re atom-savvy." : "Well, look at you."}
          <br />
          <em>{done ? "Keep wondering." : "An atomic expert."}</em>
        </h2>
        {done ? (
          <>
            <p>
              You got {score} out of 3.{" "}
              {score === 3
                ? "A positively brilliant result."
                : "Every good scientist learns by experimenting."}
            </p>
            <button
              className="button"
              onClick={() => {
                setStep(0);
                setChoice(null);
                setScore(0);
              }}
            >
              TRY AGAIN <RotateCcw size={16} />
            </button>
          </>
        ) : (
          <>
            <div className="quiz-progress">
              <span>QUESTION {step + 1} OF 3</span>
              <div>
                {quiz.map((_, i) => (
                  <b key={i} className={i <= step ? "filled" : ""} />
                ))}
              </div>
            </div>
            <h3>{item.q}</h3>
            <div className="answers">
              {item.options.map((option, i) => (
                <button
                  key={option}
                  disabled={choice !== null}
                  className={
                    choice !== null
                      ? i === item.answer
                        ? "correct"
                        : i === choice
                          ? "incorrect"
                          : ""
                      : ""
                  }
                  onClick={() => {
                    setChoice(i);
                    if (i === item.answer) setScore(score + 1);
                  }}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            {choice !== null && (
              <div className="quiz-feedback" aria-live="polite">
                <p>
                  <strong>
                    {choice === item.answer ? "Precisely!" : "Not quite—but now you know."}
                  </strong>{" "}
                  {item.why}
                </p>
                <button
                  className="text-button"
                  onClick={() => {
                    setStep(step + 1);
                    setChoice(null);
                  }}
                >
                  {step === 2 ? "SEE YOUR RESULT" : "NEXT QUESTION"} <ArrowRight size={17} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
export default function AtomicPage() {
  const [active, setActive] = useState(0),
    [menu, setMenu] = useState(false);
  return (
    <>
      <header id="top" className="header">
        <a className="brand" href="#top">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(-35 24 24)" />
              <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(35 24 24)" />
              <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(90 24 24)" />
            </g>
            <circle cx="24" cy="24" r="4" fill="currentColor" />
          </svg>
          <span>
            THE ATOMIC AGE<small>A SMALL GUIDE TO EVERYTHING</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation"
          aria-expanded={menu}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? "open" : ""}>
          {[
            ["The basics", "#basics"],
            ["Build an atom", "#workshop"],
            ["Beyond the diagram", "#cloud"],
          ].map(([text, url]) => (
            <a key={url} href={url} onClick={() => setMenu(false)}>
              {text}
            </a>
          ))}
          <a href="#quiz" className="nav-quiz" onClick={() => setMenu(false)}>
            TEST YOUR KNOW-HOW <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-top">
            <span className="eyebrow">THE INVISIBLE. MADE UNDERSTANDABLE.</span>
            <span className="eyebrow">VOL. 01 — A GUIDE FOR THE CURIOUS</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="issue-tag">
                <span /> SMALL SCIENCE. GREAT BIG IDEAS.
              </div>
              <h1>
                Small things.
                <br />
                <em>Big universe.</em>
              </h1>
              <p>
                You. Your coffee. The stars above.
                <br />
                It all starts with atoms. Let’s take a closer look
                <br className="desktop-break" /> at the tiny things that make everything.
              </p>
              <a className="button" href="#basics">
                LET’S SPLIT IT DOWN <ArrowDown size={18} />
              </a>
              <div className="hero-note">
                <span className="mini-star">✳</span>
                <span>
                  No equations. No prerequisites.
                  <br />
                  Just a healthy dose of curiosity.
                </span>
              </div>
            </div>
            <div className="hero-art">
              <span className="stamp">
                100%
                <br />
                <small>MATTER OF FACT</small>
              </span>
              <AtomArt />
              <div className="art-caption">
                <span>FIG. 001</span>
                <p>
                  A tiny world.
                  <br />
                  An extraordinary story.
                </p>
                <Star />
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              SCROLL TO DISCOVER <ArrowDown size={14} />
            </span>
            <span>AN OLD-SCHOOL LOOK AT A TIMELESS IDEA.</span>
            <span>EST. 13.8 BILLION YEARS AGO</span>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <span>EVERYTHING IS CONNECTED</span>
          <Star />
          <span>IT ALL STARTS WITH AN ATOM</span>
          <Star />
          <span>SMALL IS A BIG DEAL</span>
          <Star />
        </div>
        <section id="basics" className="basics chapter">
          <div className="section-top">
            <span className="eyebrow">01 / MEET THE BUILDING BLOCKS</span>
            <span className="eyebrow">SMALLER THAN SMALL. MORE THAN MEETS THE EYE.</span>
          </div>
          <div className="intro">
            <h2>
              Everything is made
              <br />
              of <em>something.</em>
            </h2>
            <div>
              <p>
                An atom is the smallest unit of an element that retains its chemical identity. Put
                atoms together, and you get molecules. Put enough of those together, and you get…
                well, everything around you.
              </p>
              <p>Inside each atom? Three characters with very different jobs.</p>
            </div>
          </div>
          <div className="particles">
            {particles.map((item, i) => (
              <button
                className={`particle-card ${active === i ? "active" : ""}`}
                key={item.name}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="eyebrow">
                  0{i + 1} / {item.where}
                </span>
                <div className={`particle-ball ${item.color}`}>{item.sign}</div>
                <div className="particle-name">
                  <h3>{item.name}</h3>
                  <ArrowUpRight size={24} />
                </div>
                <p>{item.text}</p>
              </button>
            ))}
          </div>
          <div className="particle-detail" aria-live="polite">
            <span className={`particle-dot ${particles[active].color}`}>
              {particles[active].sign}
            </span>
            <p>{particles[active].desc}</p>
            <span className="eyebrow">{particles[active].fact}</span>
          </div>
          <div className="scale-note">
            <Star />
            <p>
              <strong>Mostly empty. Entirely amazing.</strong> If an atom were the size of a
              stadium, its nucleus would be roughly the size of a pea. Almost all of an atom’s mass
              is packed into that tiny center.
            </p>
          </div>
        </section>
        <Builder />
        <section id="cloud" className="cloud chapter">
          <div className="section-top">
            <span className="eyebrow">03 / BEYOND THE DIAGRAM</span>
            <span className="eyebrow">A FRIENDLY REALITY CHECK</span>
          </div>
          <div className="cloud-grid">
            <div className="cloud-copy">
              <span className="small-label">HERE’S THE PLOT TWIST</span>
              <h2>
                Not little
                <br />
                solar systems.
                <br />
                <em>Something wilder.</em>
              </h2>
              <p>
                Those lovely rings? A useful shorthand. Real electrons don’t zip around the nucleus
                on neat little tracks.
              </p>
              <p>
                Instead, we describe them with <strong>orbitals</strong>: regions where an electron
                is more likely to be found. Think probability clouds, not planetary orbits.
              </p>
              <span className="cloud-takeaway">
                <Star /> THE WORLD IS STRANGER—AND MORE WONDERFUL—
                <br />
                THAN OUR DRAWINGS OF IT.
              </span>
            </div>
            <div className="cloud-diagram">
              <div className="probability-cloud">
                <div className="cloud-core">+</div>
              </div>
              <div className="cloud-label">
                <span>THE ELECTRON CLOUD</span>
                <p>
                  More dots = greater probability.
                  <br />
                  Illustration of a spherical orbital; not to scale.
                </p>
              </div>
            </div>
          </div>
          <div className="bond-note">
            <span className="eyebrow">AND HOW DOES IT ALL STICK TOGETHER?</span>
            <p>
              Atoms share or transfer electrons to form chemical bonds. These connections build
              molecules, crystals, and the wonderfully complicated world—including you.
            </p>
            <div className="bond-art" aria-hidden="true">
              <span>H</span>
              <i />
              <span>H</span>
            </div>
          </div>
        </section>
        <Quiz />
        <section className="closing">
          <Star />
          <span className="eyebrow">THE BIG TAKEAWAY</span>
          <h2>
            The universe isn’t just out there.
            <br />
            <em>It’s in everything.</em>
          </h2>
          <a href="#workshop" className="text-button">
            KEEP EXPERIMENTING <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer>
        <a className="footer-brand" href="#top">
          THE ATOMIC AGE
        </a>
        <span>A SMALL GUIDE. A BIG WORLD.</span>
        <a href="#top">BACK TO THE TOP ↑</a>
        <div className="footer-note">
          Made for curious minds. Vintage-inspired design. Modern science.
          <br />
          Illustrations are simplified teaching models, not to scale.
        </div>
      </footer>
    </>
  );
}
