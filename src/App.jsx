import Orb from './components/Orb.jsx';

const skills = [
  {
    title: 'Arquitectura & Análisis',
    tags: ['POO', 'Diseño UML', 'APIs REST', 'RPA', 'Simulación (Octave / Vensim / Simio)'],
  },
  {
    title: 'Desarrollo & Datos',
    tags: ['C#', '.NET', 'Angular', 'Next.js', 'SQL Server', 'Pascal', 'Smalltalk'],
  },
  {
    title: 'Infraestructura & IA',
    tags: ['Fundamentos IA y LLMs', 'Claude', 'Ollama (LLMs)', 'Antigravity', 'Vercel', 'Supabase', 'EmailJS', 'Resend'],
  },
  {
    title: 'Herramientas',
    tags: ['Git', 'VS Code', 'Visual Studio', 'Postman', 'DBeaver', 'SSMS', 'Arduino IDE', 'ESP32'],
  },
];

const projects = [1, 2, 3];

export default function App() {
  return (
    <>
      <header className="nav">
        <a href="#" className="nav__brand" id="nav-brand">Valentina Schenberger Zanetta</a>
        <nav className="nav__links">
          <a href="#habilidades" id="nav-habilidades">Habilidades</a>
          <a href="#proyectos" id="nav-proyectos">Proyectos</a>
          <a href="#contacto" id="nav-contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero__orb" aria-hidden="true">
            <Orb
              backgroundColor="#ffffff"
              colors={['#6366f1', '#06b6d4', '#10b981']}
              hoverIntensity={0.3}
            />
          </div>
          <div className="hero__content">
            <h1 className="hero__title">Ingeniería y Desarrollo con Visión Integral</h1>
            <p className="hero__desc">
              Estudiante avanzada de Ingeniería en Sistemas de Información (UTN FRCU). Combino mi
              capacidad de análisis funcional con habilidades prácticas de desarrollo para construir
              soluciones que aporten valor real. Con nivel de inglés avanzado y aprendizaje ágil, busco
              mi primera experiencia en IT para desarrollarme desde la toma de requerimientos hasta la
              implementación técnica.
            </p>
          </div>
        </section>

        <section className="skills" id="habilidades">
          <h2 className="section-title">Competencias y Habilidades</h2>
          <div className="profile" id="perfil">
            <span className="profile__label">Perfil & Educación</span>
            <p className="profile__text">
              Ing. en Sistemas (UTN FRCU) <span className="profile__dot">·</span> Inglés Avanzado (B2)
            </p>
          </div>
          <div className="skills__grid">
            {skills.map((s, i) => (
              <article className="card" id={`skill-card-${i + 1}`} key={s.title}>
                <h3 className="card__title">{s.title}</h3>
                <ul className="tags">
                  {s.tags.map((t) => (
                    <li className="tag" key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="proyectos">
          <div className="projects__inner">
            <h2 className="section-title section-title--light">Proyectos</h2>
            <div className="projects__grid">
              {projects.map((n) => (
                <article className="artifact" id={`proyecto-${n}`} key={n}>
                  <div className="artifact__preview" />
                  <h3>Proyecto {n}</h3>
                  <p>Descripción breve del proyecto y tecnologías utilizadas.</p>
                  <a href="#" className="artifact__link" id={`link-proyecto-${n}`}>Ver en GitHub →</a>
                </article>
              ))}
            </div>
          </div>

          <div className="contact" id="contacto">
            <h2 className="section-title section-title--light">Contacto</h2>
            <p>tu@email.com · LinkedIn · GitHub</p>
          </div>
        </section>
      </main>
    </>
  );
}
