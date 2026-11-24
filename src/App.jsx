import { useState } from 'react';
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

const projects = [
  {
    id: 'wayfinder',
    title: 'WayFinder (App Integradora)',
    description:
      'Aplicación integradora de gestión turística desarrollada en equipo con arquitectura modular y foco en escalabilidad.',
    technologies: ['C#', '.NET', 'Angular', 'SQL Server'],
    link: 'https://github.com/Equipo-de-desarrollo-LSD/App',
  },
  {
    id: 'catastro',
    title: 'Sistema de Gestión Catastral',
    description:
      'Sistema de gestión catastral en Pascal. Incluye ABMC de contribuyentes y terrenos, cálculo automático de avalúos, estadísticas detalladas y reportes ordenados mediante árboles binarios y archivos.',
    technologies: ['Pascal', 'Árboles Binarios', 'Archivos'],
    link: 'https://github.com/valenschenberger/Proyecto-Catastro',
  },
  {
    id: 'bilingue-interprete',
    title: 'Bilingue-Interprete',
    description:
      'Intérprete robusto desarrollado en Pascal para un lenguaje de dominio específico (DSL) especializado en cálculo matricial avanzado y operaciones aritméticas de precisión.',
    technologies: ['Pascal', 'DSL', 'Cálculo Matricial'],
    link: 'https://github.com/valenschenberger/Bilingue-Interprete',
  },
  {
    id: 'proyectos-octave',
    title: 'Proyectos Octave',
    description:
      'Modelos de simulación en Octave usando métodos numéricos (FEM y Diferencias Finitas) para propagación de señales y redes neuronales.',
    technologies: ['Octave', 'MATLAB', 'FEM', 'Redes Neuronales'],
    link: 'https://github.com/valenschenberger/Proyectos-Octave',
  },
];

export default function App() {
  const [activeProject, setActiveProject] = useState(0);

  const handlePrevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const getCardPosition = (index) => {
    const total = projects.length;
    const offset = (index - activeProject + total) % total;
    if (offset === 0) return 'active';
    if (offset === 1) return 'next';
    if (offset === total - 1) return 'prev';
    return 'back';
  };
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
            <div className="carousel" role="region" aria-label="Carrusel de proyectos">
              <button
                type="button"
                className="carousel__btn carousel__btn--prev"
                id="carousel-prev"
                onClick={handlePrevProject}
                aria-label="Proyecto anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="carousel__stage">
                {projects.map((project, index) => {
                  const position = getCardPosition(index);
                  const isActive = position === 'active';
                  return (
                    <article
                      className={`artifact artifact--${position}`}
                      id={`proyecto-${project.id}`}
                      key={project.id}
                      onClick={() => {
                        if (!isActive) setActiveProject(index);
                      }}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <div className="artifact__preview" />
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <ul className="artifact__tags">
                        {project.technologies.map((tech) => (
                          <li className="artifact__tag" key={tech}>{tech}</li>
                        ))}
                      </ul>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="artifact__link"
                        id={`link-proyecto-${project.id}`}
                        tabIndex={isActive ? 0 : -1}
                      >
                        Ver en GitHub →
                      </a>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                className="carousel__btn carousel__btn--next"
                id="carousel-next"
                onClick={handleNextProject}
                aria-label="Proyecto siguiente"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className="carousel__dots" role="tablist" aria-label="Seleccionar proyecto">
                {projects.map((project, index) => (
                  <button
                    type="button"
                    key={project.id}
                    role="tab"
                    aria-selected={index === activeProject}
                    aria-label={`Ver ${project.title}`}
                    className={`carousel__dot${index === activeProject ? ' carousel__dot--active' : ''}`}
                    onClick={() => setActiveProject(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="contact" id="contacto">
            <h2 className="section-title section-title--light">Contacto</h2>
            <p>
              <a href="mailto:valenschenberger@gmail.com">valenschenberger@gmail.com</a>
              {' · '}
              <a
                href="https://www.linkedin.com/in/valentinaschenberger2004"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {' · '}
              <a
                href="https://github.com/valenschenberger"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
