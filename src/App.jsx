import { useEffect, useRef, useState } from 'react';
import Button from './components/Button.jsx';
import Card from './components/Card.jsx';

const services = [
  ['01', 'Influencer campaigns', 'We plan, book, and manage influencer campaigns end-to-end — from creator shortlists to content approvals and performance reporting.'],
  ['02', 'Creator partnerships', 'We match brands with creators who actually fit their audience, negotiate terms, and keep every partnership running smoothly from kickoff to payout.'],
  ['03', 'Content', 'Reels, UGC, reviews, and long-form content — created by people who know what their audience actually watches, not just what a brand wants to say.'],
];

const process = [
  ['Share the brief', 'Tell us your goals, budget, and timeline. A quick brief is all we need to start matching you with the right creators.'],
  ['Find a fit', 'We shortlist creators based on audience fit and engagement quality — not just follower count.'],
  ['Plan the campaign', 'We lock in deliverables, timelines, and content approvals upfront, so there are no surprises once creators start producing.'],
  ['Create and deliver', 'Creators produce and publish, we track performance, and you get a full report on reach, engagement, and results.'],
];

const audiences = [
  {
    id: 'brands',
    eyebrow: 'FOR BRANDS',
    title: 'Bring your brand to creators.',
    description: "We work with brands of every size looking to grow through authentic creator content. Share your brief and we'll match you with creators who fit your audience within days.",
    action: 'Talk about a campaign',
  },
  {
    id: 'creators',
    eyebrow: 'FOR CREATORS',
    title: 'Find your next brand partnership.',
    description: "We work with creators across niches and follower sizes. If you make content brands want to be part of, apply below and we'll reach out when there's a fit.",
    action: 'Get in touch',
  },
];

const faqs = [
  ['How much budget do I need?', 'Campaigns can start small with a handful of micro creators. We suggest a plan that fits your budget and goal after the brief.'],
  ['How do you choose creators?', 'We check audience fit, engagement quality, past brand work and content style, then you approve the shortlist.'],
  ['How long does a campaign take?', 'Most campaigns go live within two to three weeks of the brief, depending on approvals and product shipping.'],
  ['Do we get the rights to the content?', 'Usage rights are agreed in advance, including paid ads, so you know exactly where content can run.'],
  ['What reporting do I get?', 'A simple report with reach, engagement, clicks and sales impact, plus what we recommend doing next.'],
];

function Arrow() { return <span aria-hidden="true">&#8599;</span>; }

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const firstMenuLinkRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    firstMenuLinkRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  const goTo = (id) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const target = document.getElementById(id);
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior });
    setMenuOpen(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    setFormError('');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const data = {
      formType: 'brand',
      Name: values.name,
      Email: values.email,
      Brand: values.brand,
      Message: [
        values.msg,
        `Phone: ${values.phone || 'Not provided'}`,
        `Service: ${values.service}`,
        `Budget: ${values.budget}`,
      ].join('\n'),
    };
    const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    if (!endpoint) {
      setFormError('The submission service is not configured yet.');
      return;
    }
    setSubmitting(true);
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(data),
      });
      form.reset();
      setSubmitted(true);
    } catch {
      setFormError('We could not send your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <header className="site-header"><div className="wrap"><nav aria-label="Primary navigation">
      <button className="logo-button" onClick={() => goTo('top')} aria-label="VYBE HAUS MEDIA home"><img src="/vybe-haus-logo-dark-transparent.png" alt="VYBE HAUS MEDIA" /></button>
      <button ref={menuToggleRef} className="burger" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="primary-navigation" aria-expanded={menuOpen}>
        <span className="burger-icon" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <div id="primary-navigation" className={`site-links ${menuOpen ? 'open' : ''}`}>
        <button ref={firstMenuLinkRef} onClick={() => goTo('services')}>Services</button><button onClick={() => goTo('process')}>How it works</button><button onClick={() => goTo('brands')}>For brands</button><button onClick={() => goTo('creators')}>For creators</button><button onClick={() => goTo('faq')}>FAQ</button><Button variant="primary" className="button--small" onClick={() => goTo('contact')}>Start a campaign <Arrow /></Button>
        <button className="menu-close" onClick={closeMenu}><span aria-hidden="true">×</span> Close menu</button>
      </div>
    </nav></div></header>

    <main id="top" tabIndex="-1">
      <section className="hero"><div className="wrap hero-inner reveal">
        <div className="hero-copy">
          <p className="eyebrow">VYBE HAUS MEDIA <span>CREATOR-POWERED MARKETING</span></p>
          <h1>Influencer marketing that connects <span className="heading-highlight">brands</span> with <span className="heading-highlight">creators.</span></h1>
          <p className="hero-lead">We bring brands and creators together, then manage campaigns from brief through delivery.</p>
          <div className="hero-actions"><Button variant="primary" onClick={() => goTo('brands')}>For brands <Arrow /></Button><Button onClick={() => goTo('creators')}>For creators <Arrow /></Button></div>
        </div>
        <div className="hero-visual" role="img" aria-label="Placeholder for a VYBE HAUS MEDIA campaign image or illustration">
          <span className="hero-visual-label">IMAGE / ILLUSTRATION PLACEHOLDER</span>
          <span className="hero-visual-mark" aria-hidden="true">V</span>
        </div>
      </div></section>
      <div className="marquee" aria-hidden="true"><div><span>Fashion</span><span>Beauty</span><span>Food</span><span>Fitness</span><span>Tech</span><span>Travel</span><span>Lifestyle</span><span>Gaming</span><span>Fashion</span><span>Beauty</span><span>Food</span><span>Fitness</span><span>Tech</span><span>Travel</span><span>Lifestyle</span><span>Gaming</span></div></div>

      <section id="services" tabIndex="-1"><div className="wrap"><p className="eyebrow reveal">01 / SERVICES</p><h2 className="reveal">Services for <span className="heading-highlight">creator-powered</span> campaigns</h2><p className="lead reveal">From finding the right creators to delivering finished content, we handle every piece of a campaign so brands don't have to.</p><div className="service-grid">{services.map(([number, title, text]) => <Card className="dark-card reveal" key={title}><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></Card>)}</div></div></section>
      <section id="process" className="tinted" tabIndex="-1"><div className="wrap"><p className="eyebrow reveal">02 / HOW IT WORKS</p><h2 className="reveal">From first brief to <span className="heading-highlight">campaign.</span></h2><p className="lead reveal">Every campaign follows the same four steps — simple for brands, clear for creators.</p><div className="process-grid">{process.map(([title, text], index) => <Card className="process-card reveal" key={title}><strong>0{index + 1}</strong><h3>{title}</h3><p>{text}</p></Card>)}</div></div></section>
      <section id="audiences" tabIndex="-1"><div className="wrap"><p className="eyebrow reveal">03 / WHO WE WORK WITH</p><h2 className="reveal">A place for <span className="heading-highlight">both sides.</span></h2><div className="audience-grid">{audiences.map(({ id, eyebrow, title, description, action }) => <Card as="article" className={`audience-card audience-card--${id} reveal`} key={id} id={id} tabIndex="-1"><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p className="audience-copy">{description}</p><Button variant={id === 'brands' ? 'primary' : 'secondary'} onClick={() => goTo('contact')}>{action} <Arrow /></Button></Card>)}</div></div></section>
      <section id="faq" className="tinted" tabIndex="-1"><div className="wrap"><p className="eyebrow reveal">04 / FAQ</p><h2 className="reveal">Questions brands ask first</h2><div className="faq">{faqs.map(([question, answer]) => <details className="reveal" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <section id="contact" tabIndex="-1"><div className="wrap contact-grid"><div className="contact-copy reveal"><p className="eyebrow">05 / LET'S WORK</p><h2>Let's build your next campaign</h2><p className="lead">Whether you're a brand ready to launch a campaign or a creator looking for your next partnership, send us a few details and we'll take it from there.</p></div><Card as="div" className="form-shell reveal">{submitted ? <div className="form-success" role="status"><strong>Thanks! Your brief is in.</strong><p>We will get back to you shortly.</p><Button onClick={() => setSubmitted(false)}>Send another brief <Arrow /></Button></div> : <form onSubmit={submit}><div className="form-row"><label>Your name<input name="name" required autoComplete="name" /></label><label>Brand<input name="brand" required /></label></div><div className="form-row"><label>Email<input type="email" name="email" required autoComplete="email" /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label></div><div className="form-row"><label>What do you need?<select name="service" defaultValue="Influencer marketing"><option>Influencer marketing</option><option>UGC campaigns</option><option>Creator discovery</option><option>PR and product seeding</option><option>Social content</option><option>Campaign strategy</option></select></label><label>Monthly budget<select name="budget" defaultValue="Under 50,000"><option>Under 50,000</option><option>50,000 to 2,00,000</option><option>2,00,000 and above</option></select></label></div><label>Tell us about your goal<textarea name="msg" rows="5" required /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<Button variant="primary" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send brief'} {!submitting && <Arrow />}</Button></form>}</Card></div></section>
    </main>

    <footer><div className="wrap footer-layout"><div><button className="logo-button footer-logo" onClick={() => goTo('top')} aria-label="VYBE HAUS MEDIA home"><img src="/vybe-haus-logo-light-transparent.png" alt="VYBE HAUS MEDIA" /></button><p className="footer-note">Creator-powered marketing for brands that want to be impossible to ignore.</p></div><div className="footer-links"><div><button onClick={() => goTo('services')}>Services</button><button onClick={() => goTo('process')}>How it works</button><button onClick={() => goTo('brands')}>For brands</button><button onClick={() => goTo('creators')}>For creators</button></div><div><a href="mailto:collab@vybehausmedia.com">Email</a><a href="https://www.instagram.com/vybe.hausmedia/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/vybe-haus-media/" target="_blank" rel="noreferrer">LinkedIn</a></div></div></div><div className="wrap footer-bottom">© {new Date().getFullYear()} VYBE HAUS MEDIA <span>WHERE CREATORS BELONG</span></div></footer>
  </>;
}

export default App;
