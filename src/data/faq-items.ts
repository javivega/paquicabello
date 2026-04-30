export const faqItems = [
  {
    id: 'faq-0',
    question: '¿Deben implicarse todos los adultos?',
    answer:
      'Todos los adultos deben implicarse para acompañar el proceso y supervisar las interacciones entre ambos',
  },
  {
    id: 'faq-1',
    question: '¿Cómo es el enfoque en las sesiones?',
    answer:
      'Nos vemos 1 vez a la semana, te propongo 3 objetivos semanales para accionar desde ese mismo momento, con pasos concretos y adaptados a cada necesidad/dificultad con calma y sin juicios: observamos el contexto, explicamos lo que vemos y proponemos pasos concretos que encajen en tu día a día.',
  },
  {
    id: 'faq-2',
    question: '¿Se puede combinar online y presencial?',
    answer:
      'Sí. podemos combinar ambas modalidades.'
  },
  {
    id: 'faq-3',
    question: 'Son sesiones de adiestramiento?',
    answer:
      'No son sesiones de adiestramiento. Se trabaja la gestión del entorno, el vínculo, la comunicación y las necesidades básicas',
  },
  {
    id: 'faq-4',
    question: '¿Qué se define en la primera sesión?',
    answer:
      'Cada caso es distinto. En la primera sesión, después de conocer todo lo que te preocupa, planteamos un plan de acción personalizado, definimos objetivos y revisamos qué podemos conseguir.',
  },
  {
    id: 'faq-5',
    question: '¿Puedo llevar vídeos o notas?',
    answer:
      'Sí, puedes traer videos cortos o notas sobre las situaciones que te preocupan, cuanto más contexto compartas mejor, así podemos precisar más.',
  },
  {
    id: 'faq-6',
    question: '¿Cómo sé qué servicio me conviene?',
    answer:
      'Puedes escribirme contándome lo que te preocupa o envíame un WhatsApp y lo vemos juntas, depende si tu problema requiere de un acompañamiento más amplio o es una duda puntual',
  },
] as const

export type FaqItem = (typeof faqItems)[number]
