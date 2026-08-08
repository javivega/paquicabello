export const faqItems = [
  {
    id: 'faq-0',
    question: '¿Tenemos que participar todos los adultos de la casa?',
    answer:
      'Sí. Es recomendable que todos los adultos implicados en la convivencia participen en el proceso para mantener unas pautas coherentes y supervisar las interacciones.',
  },
  {
    id: 'faq-1',
    question: '¿Qué hacemos durante las sesiones?',
    answer:
      'Nos vemos una vez a la semana y, en cada sesión, definimos hasta tres objetivos concretos para trabajar durante la semana. Observamos lo que está ocurriendo, entendemos por qué ocurre y planteamos pasos adaptados a vuestro día a día, siempre con calma y sin juicios.',
  },
  {
    id: 'faq-2',
    question: '¿Puedo combinar sesiones online y presenciales?',
    answer:
      'Sí. Podemos combinar sesiones online y presenciales según lo que necesitéis en cada momento.',
  },
  {
    id: 'faq-3',
    question: '¿Esto es adiestramiento?',
    answer:
      'No. El acompañamiento no se centra en adiestrar al perro, sino en comprender y mejorar la convivencia, trabajando aspectos como el entorno, el vínculo, la comunicación y sus necesidades.',
  },
  {
    id: 'faq-4',
    question: '¿Qué veremos en la primera sesión?',
    answer:
      'En la primera sesión conocemos vuestra situación y todo aquello que os preocupa. A partir de ahí, definimos objetivos y un plan de acción adaptado a vuestro caso.',
  },
  {
    id: 'faq-5',
    question: '¿Puedo llevar vídeos de lo que ocurre en casa?',
    answer:
      'Sí. Puedes traer vídeos cortos o notas sobre las situaciones que te preocupan. Cuanto más contexto tengamos, mejor podremos entender lo que está ocurriendo.',
  },
  {
    id: 'faq-6',
    question: '¿Cómo sé qué tipo de acompañamiento necesito?',
    answer:
      'Puedes escribirme y contarme qué te preocupa. Juntas veremos si necesitas un acompañamiento más completo o si una sesión puntual es suficiente para resolver tu duda.',
  },
] as const

export type FaqItem = (typeof faqItems)[number]