export const faqItems = [
  {
    id: 'faq-0',
    question: '¿Deben implicarse todos los adultos?',
    answer:
      'Todos los adultos deben implicarse guiando y supervisando la convivencia, acompañando con atención el proceso de adaptación entre niños y animales.',
  },
  {
    id: 'faq-1',
    question: '¿Cómo es el enfoque en las sesiones?',
    answer:
      'Trabajamos con calma y sin juicios: observamos el contexto, explicamos lo que vemos y proponemos pasos concretos que encajen en tu día a día.',
  },
  {
    id: 'faq-2',
    question: '¿Se puede combinar online y presencial?',
    answer:
      'Sí. Podemos empezar online y combinarlo con sesiones presenciales cuando tenga sentido para tu familia y tu perro.',
  },
  {
    id: 'faq-3',
    question: '¿Se trabaja con obediencia forzada?',
    answer:
      'No buscamos obediencia forzada: priorizamos bienestar, comunicación clara y límites respetuosos para que todos se sientan seguros.',
  },
  {
    id: 'faq-4',
    question: '¿Qué se define en la primera sesión?',
    answer:
      'Cada caso es distinto. En la primera sesión acotamos objetivos y te orientamos sobre frecuencia y formato que mejor encajen.',
  },
  {
    id: 'faq-5',
    question: '¿Puedo llevar vídeos o notas?',
    answer:
      'Puedes traer vídeos cortos o notas sobre situaciones concretas: cuanto más contexto compartas, más precisa será la guía.',
  },
  {
    id: 'faq-6',
    question: '¿Cómo sé qué servicio me conviene?',
    answer:
      'Escríbeme con tu duda y te indico si encaja con una sesión exprés o si conviene un acompañamiento más amplio.',
  },
] as const

export type FaqItem = (typeof faqItems)[number]
