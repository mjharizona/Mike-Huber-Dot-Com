export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Mike is a BUSINESS SAVER AND INCREASED OUR SALES 5X. We had a competitor "Buying" traffic. Mike worked closely with our company using proven SEO strategies, he consulted on content and WOW it worked. Mike is always current on newest, best and most effective website SEO, content and strategy through his in-depth background and continual adaptive focus. I can\'t thank Mike enough for the RESULTS he provided.',
    author: 'Katie Ward',
    featured: true,
  },
  {
    id: '2',
    quote:
      "I've known Mike for 8 years. I met him when he was the Client Services Director at Vertical Measures. I found him to be one of the smartest digital marketers I've ever met. He has a great background in sales but his real talent is in coaching clients in digital marketing and creating content for presenting to large audiences.",
    author: 'Todd Hartley',
    featured: true,
  },
  {
    id: '3',
    quote:
      "We've only been working with Mike for a few months, but we are all impressed with what he brings to the table. With his guidance, we've completely revamped our online strategies and online presence — in a very short time we've gone from a random assortment of several websites without a clear vision to an orchestrated network that complements itself.",
    author: 'Jeff Beck',
    featured: true,
  },
  {
    id: '4',
    quote:
      'Mike is one of my all-time favorite colleagues to work with on ANY project! He\'s collaborative, insightful and has a mindset of underpromise/overdeliver! His common sense approach to marketing and strong communication skills are the winning combination that will make any project run more smoothly and effectively.',
    author: 'JR Jacobs',
    featured: false,
  },
  {
    id: '5',
    quote:
      'The one thing that really stands out with Mike is that he deeply cares about what he is teaching and who he is teaching it to. Some people just get up on stage or launch a webinar and are just checking the box. That is not Mike. The information that he creates has a real purpose, and he follows through to make sure that he delivers on the promise of what he is teaching.',
    author: 'Max Bernstein',
    featured: false,
  },
  {
    id: '6',
    quote:
      'Learning from Mike will give you the knowledge and resources you need to turn what you learn into business success that lasts. Mike presents a content-rich digital marketing curriculum with absolute clarity. He thoughtfully answers questions with direct feedback.',
    author: 'Jonah Deaver',
    featured: false,
  },
  {
    id: '7',
    quote:
      "Mike Huber was a key member of the lodging software development team previously contracted by Triple Crown Sports. His patience was his strongest attribute through the challenging process of taking tools that his company had developed, and customizing them to fit our sports event business. Mike has a very strong depth of knowledge in technology and sports tourism.",
    author: 'Roland Rivera',
    role: 'Triple Crown Sports',
    featured: false,
  },
  {
    id: '8',
    quote:
      "Mike is a 'Go-To' professional for anything e-commerce related. He's an early adopter of new technology, using hands-on experience to figure out the features and benefits of new media. His online expertise, coupled with his media sales background, integrity, and honesty, make Mike a highly-valued asset to any company.",
    author: 'Dave Kuhn',
    featured: false,
  },
  {
    id: '9',
    quote:
      "I have come to appreciate that his keen mind and the breadth and depth of his professional experience is informed by intuitive shrewdness, which translates into an uncanny prescience about seeing where business opportunities lay and knowing how to cultivate them. I would work with Mike again in a minute.",
    author: 'Lisbet Thoresen',
    featured: false,
  },
  {
    id: '10',
    quote:
      "I have known Mike since 1989. He was amazing, fun, and inspirational to the sales staff and he saw things in people that they didn't see in themselves. This sales knowledge propelled me to be a Sales Trainer. I owe Mike so much as he jumpstarted my career. This year I am the Recruiter of the Year and I know that my early career working for Mike was the foundation of my success.",
    author: 'Cynthia Marshall',
    featured: false,
  },
]
