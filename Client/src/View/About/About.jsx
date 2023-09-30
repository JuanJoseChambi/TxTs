import React, { useRef } from 'react'
import style from "./About.module.scss"
import useFadeOnScroll from '../../Hooks/useFadeOnScroll'
function About() {
    const viewAbout = useRef(null)
    useFadeOnScroll(viewAbout, style.viewAboutVisible)



  return (
    <div className={style.aboutView} ref={viewAbout}>
        <div className={style.sectionAbout}>
        <h2>Título: Proyecto "txts": Explorando Tecnologías Web de Vanguardia</h2>

        <h3>Introducción:</h3>
        <p>Como estudiante apasionado por el mundo de la programación y el desarrollo web, he tenido el privilegio de embarcarme en un proyecto personal denominado "txts". Este proyecto, lejos de ser una aplicación funcional para el uso cotidiano, es en realidad un laboratorio de pruebas, un terreno de experimentación donde he puesto en práctica y explorado una variedad de tecnologías de vanguardia. A lo largo de este texto, compartiré mi experiencia y los objetivos detrás de esta iniciativa.</p>

        <h3>El Propósito del Proyecto:</h3>

        <p>El principal objetivo de "txts" es servir como un banco de pruebas para mis habilidades como desarrollador junior. En este sentido, he decidido explorar tecnologías clave que son ampliamente utilizadas en la industria del desarrollo web. Estas tecnologías incluyen, pero no se limitan a:</p>
        <ul>
            <li>PostgreSQL: Como sistema de gestión de bases de datos relacional, PostgreSQL me ha permitido aprender sobre la creación de bases de datos robustas y la manipulación de datos de manera eficiente.</li>
            <li>Express: Utilizando el framework de aplicaciones web Node.js, Express, he desarrollado el backend de "txts". Esta elección me ha brindado una comprensión más profunda de la construcción de servidores web y la creación de API RESTful.</li>
            <li>React: En el frontend, he utilizado React para construir la interfaz de usuario de "txts". Esta biblioteca JavaScript me ha permitido crear una experiencia de usuario dinámica e interactiva.</li>
            <li>SCSS: Para la gestión de estilos, he optado por utilizar SCSS, una extensión de CSS que me ha dado un mayor control sobre el diseño y la estilización de la aplicación.</li>
        </ul>
        <h3>Lecciones Aprendidas:</h3>

        <p>A lo largo de este proyecto, he enfrentado desafíos técnicos que me han permitido adquirir una valiosa experiencia. He aprendido a diseñar una base de datos sólida, implementar autenticación y autorización, gestionar rutas en Express y desarrollar componentes reutilizables en React. Además, he explorado estrategias de optimización y pruebas unitarias.</p>
        <h3>Conclusión:</h3>
        
        <p>El proyecto "txts" es un testimonio de mi compromiso por aprender y crecer en el campo del desarrollo web. A medida que continuo perfeccionando mis habilidades, estoy emocionado por las oportunidades que se presentarán en el camino y por los proyectos futuros que me permitirán seguir explorando nuevas tecnologías y soluciones innovadoras.</p>
        </div>
    </div>
  )
}

export default About