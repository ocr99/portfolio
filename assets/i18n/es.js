/**
 * Spanish texts. Keys match the data-i18n* attributes in the HTML; anything
 * missing here falls back to the English text in the page.
 */
window.portfolioI18n.register('es', {
    // Shared
    'common.linkedinProfile': 'Perfil de LinkedIn',
    'common.githubProfile': 'Perfil de GitHub',
    'common.sendEmail': 'Enviar un correo',
    'common.sendMeEmail': 'Envíame un correo',
    'common.location': 'Barcelona, España',
    'common.close': 'Cerrar',
    'common.backToTop': 'Volver arriba',

    // Landing (index.html)
    'home.title': 'Oscar Lopez | Business Intelligence Developer en Barcelona',
    'home.heading': 'Hola, me llamo <em class="contrastcolor">Oscar López</em>, <br> soy <em class="contrastcolor">Business Intelligence Developer</em>.',
    'home.knowMe': 'Conóceme',
    'home.photoAlt': 'Foto de Oscar López',
    'home.contactMe': 'Contáctame:',

    // About (pages/aboutme.html)
    'about.title': 'Sobre Oscar Lopez | Experiencia, stack y proyectos de BI Developer',
    'about.h1': 'Oscar Lopez, Business Intelligence Developer en Barcelona',
    'about.nav.label': 'Navegación principal',
    'about.nav.toggle': 'Abrir o cerrar el menú',
    'about.about': 'Sobre mí',
    'about.experience': 'Experiencia',
    'about.projects': 'Proyectos',
    'about.contact': 'Contacto',

    'about.intro.lead': '¡Hola! Me llamo Oscar y soy Business Intelligence Developer en Barcelona. Esta es mi historia:',
    'about.intro.photoAlt': 'Retrato profesional de Oscar López',
    'about.label.location': 'Ubicación:',
    'about.label.focus': 'Especialidad:',
    'about.label.experience': 'Experiencia:',
    'about.label.meeting': 'Reunión:',
    'about.biAnalytics': 'BI y analítica',
    'about.inTech': 'en tecnología',
    'about.scheduleCall': 'Agenda una llamada',
    'about.intro.p1': 'Diseño y desarrollo soluciones de Business Intelligence que convierten los datos operativos en información fiable y accionable. Mi trabajo cubre todo el recorrido: desde la transformación y el modelado de datos hasta la lógica de KPIs, los modelos semánticos y la entrega del dashboard final.',
    'about.intro.p2': 'Trabajo sobre todo con <strong>Power BI, Domo y SQL</strong>, y tengo experiencia con <strong>Power Query, Databricks y Azure Analysis Services</strong>. Me centro en construir soluciones de reporting técnicamente sólidas, comprensibles y fiables.',
    'about.intro.p3': 'Ahora mismo me centro en la <strong>analítica de contact center y workforce management</strong>: productividad, SLA, AHT, CSAT, NPS, forecasting y rendimiento operativo. También disfruto resolviendo las partes difíciles: granularidad, contexto de filtro, relaciones, agregaciones y arquitecturas de BI complejas.',
    'about.intro.p4': 'Empecé mi carrera en IT haciendo soporte de nivel 2, donde construí una base sólida en sistemas, resolución de incidencias, automatización y atención centrada en el usuario. Esa base técnica marca hoy cómo afronto el desarrollo de datos y BI.',
    'about.intro.p5': 'Fuera de mi trabajo principal llevo desde 2020 construyendo y manteniendo proyectos, desde un e-commerce con WordPress y WooCommerce para una empresa local de alquiler de autocaravanas hasta el homelab self-hosted que mantengo desde 2021.',

    'about.stack.title': 'Stack tecnológico',
    'about.stack.lead': 'Las herramientas y disciplinas que uso para pasar de los datos en bruto a información lista para el negocio.',
    'about.stack.data': 'Datos',
    'about.stack.platforms': 'Plataformas de datos',
    'about.stack.engineering': 'Ingeniería',

    'about.resume.lead': 'Esto es un poco de lo que he hecho hasta ahora:',
    'about.resume.summary': 'Resumen',
    'about.resume.summaryText': 'Business Intelligence Developer con experiencia práctica diseñando y manteniendo soluciones de reporting en Power BI y Domo, sobre todo para operaciones de contact center y workforce management: transformación y modelado de datos, desarrollo de KPIs y entrega de dashboards directamente al cliente. Mi experiencia en soporte IT corporativo me da una base técnica sólida en sistemas e infraestructura.',
    'about.resume.education': 'Formación',
    'about.resume.degree': 'Ingeniería Informática de Gestión y Sistemas de Información',
    'about.resume.degreeText': 'Estudios de ingeniería informática, sistemas de información y gestión empresarial.',
    'about.resume.earlier': 'Experiencia anterior',
    'about.resume.professional': 'Experiencia profesional',
    'about.resume.viewCv': 'Ver mi CV',

    'about.job.freelance.title': 'Full Stack Developer freelance',
    'about.job.freelance.dates': 'nov. 2020 - oct. 2025 · En remoto',
    'about.job.freelance.place': 'El Bon Camí · La Garriga, España',
    'about.job.freelance.desc': 'Diseñé, desarrollé y mantuve la web de una empresa local de alquiler de campers y autocaravanas, trabajando directamente con los propietarios.',
    'about.job.freelance.li1': 'Construí y mantuve la web con <strong>WordPress, WooCommerce, Elementor, HTML, CSS y JavaScript</strong>',
    'about.job.freelance.li2': 'Implementé reservas online, pagos con tarjeta, carrito de compra y área de cliente',
    'about.job.freelance.li3': 'Mejoré la estructura, la usabilidad y la experiencia de usuario de la web',
    'about.job.freelance.li4': 'Apliqué mejoras de <strong>rendimiento y SEO</strong> para ganar visibilidad en buscadores',

    'about.job.philips.title': 'Comercial de Philips',
    'about.job.philips.desc': 'Especializado en televisores Philips de gama alta en El Corte Inglés Diagonal, combinando conocimiento de producto, venta consultiva y gestión de la relación con el cliente.',
    'about.job.philips.li1': 'Reconocido como mejor vendedor en 2021 tras duplicar las ventas del año anterior',
    'about.job.philips.li2': 'Vendí más de 100 televisores en un entorno retail muy competitivo',
    'about.job.philips.li3': 'Traté con cientos de clientes y les recomendé productos según sus necesidades',
    'about.job.philips.li4': 'Conseguí incentivos adicionales por resultados en categorías de producto difíciles',

    'about.job.bi.dates': 'feb. 2024 - actualidad · Híbrido',
    'about.job.bi.desc': 'Diseño, construyo y mantengo soluciones de Business Intelligence para la analítica de contact center y workforce management en varios entornos de cliente en España y la región EMEA.',
    'about.job.bi.li1': 'Desarrollo soluciones de BI de principio a fin: transformación de datos, modelado semántico, desarrollo de KPIs y entrega de dashboards con <strong>Power BI y Domo</strong>',
    'about.job.bi.li2': 'Construyo <strong>medidas DAX avanzadas, transformaciones en Power Query y modelos de datos analíticos</strong> para requisitos de reporting complejos',
    'about.job.bi.li3': 'Diseño y mantengo pipelines en Domo con <strong>Magic ETL, DataFlows, Beast Mode y SQL</strong>',
    'about.job.bi.li4': 'Desarrollo y optimizo <strong>consultas SQL y transformaciones de datos</strong> sobre múltiples fuentes de datos corporativas',
    'about.job.bi.li5': 'Trabajo con <strong>Databricks y Azure Analysis Services</strong> dentro de arquitecturas de BI corporativas',
    'about.job.bi.li6': 'Desarrollo soluciones analíticas de <strong>productividad, SLA, AHT, CSAT, NPS, forecasting y rendimiento operativo</strong>',
    'about.job.bi.li7': 'Colaboro directamente con los clientes para convertir necesidades de negocio cambiantes en dashboards útiles y KPIs accionables',
    'about.job.bi.li8': 'Resuelvo problemas complejos de BI relacionados con <strong>granularidad, agregaciones, relaciones, contexto de filtro, DirectQuery, Composite Models y conectividad con Analysis Services</strong>',

    'about.job.l2.title': 'Técnico de Sistemas L2 en Service Desk',
    'about.job.l2.dates': 'oct. 2022 - feb. 2024 · Presencial',
    'about.job.l2.desc': 'Soporte técnico de nivel 2 en hardware, software e infraestructura corporativa, que me dio la base técnica para dar el salto al desarrollo de datos y BI.',
    'about.job.l2.li1': 'Resolví incidencias de hardware, software y sistemas corporativos',
    'about.job.l2.li2': 'Gestioné la administración de <strong>Active Directory</strong>, el alta de usuarios y los accesos a sistemas',
    'about.job.l2.li3': 'Usé <strong>PowerShell</strong> para automatizar tareas y gestionar sistemas',
    'about.job.l2.li4': 'Apliqué un enfoque estructurado y centrado en el usuario para diagnosticar y resolver problemas técnicos',

    'about.projects.homelabType': 'Infraestructura self-hosted',
    'about.projects.portfolio': 'Portfolio personal',
    'about.projects.portfolioType': 'Web estática',
    'about.projects.portfolioAlt': 'Vista previa del proyecto Portfolio personal',
    'about.projects.elboncamiType': 'Web e-commerce',
    'about.projects.elboncamiAlt': 'Vista previa de la web e-commerce de El Bon Camí',

    'about.contact.lead': '¡Abierto a oportunidades, colaboraciones y proyectos interesantes!',
    'about.contact.email': 'Correo:',
    'about.contact.meetingText': 'Agenda una reunión',
    'about.contact.meetingLabel': 'Agenda una reunión (se abre en una pestaña nueva)',

    'about.cv.title': 'CV de Oscar Lopez',
    'about.cv.viewOnline': 'Ver online',
    'about.cv.iframeEn': 'CV de Oscar Lopez en inglés',
    'about.cv.iframeEs': 'CV de Oscar Lopez en español',

    // 404
    'notfound.title': 'Página no encontrada | Oscar Lopez',
    'notfound.message': 'Esta página no existe.',
    'notfound.back': 'Volver al portfolio'
});
