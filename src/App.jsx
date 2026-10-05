import { useEffect, useState } from 'react';

const services = [
  ['01', 'Influencer marketing', 'Campaigns with creators matched to your audience, goals and budget.'],
  ['02', 'UGC campaigns', 'Authentic video and photo content made for ads and your own channels.'],
  ['03', 'Creator discovery', 'Vetted creators selected by niche, audience, location and engagement.'],
  ['04', 'PR and product seeding', 'Launch moments and gifting drops that start organic conversation.'],
  ['05', 'Social content', 'Platform-native reels, stories and posts planned around your calendar.'],
  ['06', 'Campaign strategy', 'Clear goals, messaging and reporting tied to meaningful outcomes.'],
];

const process = [
  ['Brief', 'Tell us your goal, audience and budget.'],
  ['Match', 'We shortlist creators that fit your brand.'],
  ['Create', 'We manage briefs, approvals and timelines.'],
  ['Scale', 'We report results and build on what works.'],
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
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

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
    <header className="site-header"><div className="wrap"><nav>
      <button className="logo-button" onClick={() => goTo('top')} aria-label="VYBE HAUS MEDIA home"><img src="/vybe-haus-logo-light-transparent.png" alt="VYBE HAUS MEDIA" /></button>
      <button className="burger" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? 'x' : 'menu'}</button>
      <div className={`site-links ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => goTo('services')}>Services</button><button onClick={() => goTo('process')}>Process</button><button onClick={() => goTo('why-us')}>Why us</button><button onClick={() => goTo('faq')}>FAQ</button><button className="button pink small" onClick={() => goTo('contact')}>Start a campaign <Arrow /></button>
      </div>
    </nav></div></header>

    <main id="top">
      <section className="hero"><div className="wrap hero-inner reveal">
        <p className="eyebrow">VYBE HAUS MEDIA <span>CREATOR-POWERED MARKETING</span></p>
        <h1>Creators sell.<br /><span>We make brands unmissable.</span></h1>
        <p className="hero-lead">We connect brands with creators their audience already trusts, then run the campaign from brief to results.</p>
        <div className="hero-actions"><button className="button pink" onClick={() => goTo('contact')}>Start a campaign <Arrow /></button><button className="button" onClick={() => goTo('why-us')}>Why us <Arrow /></button></div>
        <div className="sticker">WHERE<br />CREATORS<br />BELONG</div>
      </div></section>
      <div className="marquee" aria-hidden="true"><div><span>Fashion</span><span>Beauty</span><span>Food</span><span>Fitness</span><span>Tech</span><span>Travel</span><span>Lifestyle</span><span>Gaming</span><span>Fashion</span><span>Beauty</span><span>Food</span><span>Fitness</span><span>Tech</span><span>Travel</span><span>Lifestyle</span><span>Gaming</span></div></div>

      <section className="network-proof"><div className="wrap proof reveal"><strong>500+</strong><span>creators in our network</span></div></section>
      <section id="services"><div className="wrap"><p className="eyebrow reveal">01 / SERVICES</p><h2 className="reveal">Everything a creator campaign needs</h2><p className="lead reveal">One team for finding creators, making content and getting it in front of the right people.</p><div className="service-grid">{services.map(([number, title, text]) => <article className="dark-card reveal" key={title}><span className="card-number">{number}</span><div className="service-icon" aria-hidden="true">+</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="process" className="tinted"><div className="wrap"><p className="eyebrow reveal">02 / PROCESS</p><h2 className="reveal">From brief to results in four steps</h2><div className="process-grid">{process.map(([title, text], index) => <article className="process-step reveal" key={title}><strong>0{index + 1}</strong><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="why-us"><div className="wrap"><p className="eyebrow reveal">03 / WHY US</p><h2 className="reveal">Why brands start with us</h2><p className="lead reveal">Every brand gets our full attention and a direct line to the people doing the work.</p><div className="why-grid"><article className="why-card pink-card reveal"><small>MATCHING</small><h3>Niche-matched creators</h3><p>We shortlist creators your audience already follows.</p></article><article className="why-card sun-card reveal"><small>CLARITY</small><h3>A clear plan upfront</h3><p>Scope, timeline and cost agreed before we start.</p></article><article className="why-card light-card reveal"><small>SUPPORT</small><h3>One point of contact</h3><p>One person who keeps your campaign moving.</p></article></div></div></section>
      <section id="faq" className="tinted"><div className="wrap"><p className="eyebrow reveal">04 / FAQ</p><h2 className="reveal">Questions brands ask first</h2><div className="faq">{faqs.map(([question, answer]) => <details className="reveal" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <section id="contact"><div className="wrap contact-grid"><div className="contact-copy reveal"><p className="eyebrow">05 / LET'S WORK</p><h2>Let's build your next campaign</h2><p className="lead">Fill in the form and we will reply within one working day. Creators who want to join our network can write to us too.</p></div><div className="form-shell reveal">{submitted ? <div className="form-success" role="status"><strong>Thanks! Your brief is in.</strong><p>We will get back to you shortly.</p><button className="button" onClick={() => setSubmitted(false)}>Send another brief <Arrow /></button></div> : <form onSubmit={submit}><div className="form-row"><label>Your name<input name="name" required autoComplete="name" /></label><label>Brand<input name="brand" required /></label></div><div className="form-row"><label>Email<input type="email" name="email" required autoComplete="email" /></label><label>Phone<input type="tel" name="phone" autoComplete="tel" /></label></div><div className="form-row"><label>What do you need?<select name="service" defaultValue="Influencer marketing"><option>Influencer marketing</option><option>UGC campaigns</option><option>Creator discovery</option><option>PR and product seeding</option><option>Social content</option><option>Campaign strategy</option></select></label><label>Monthly budget<select name="budget" defaultValue="Under 50,000"><option>Under 50,000</option><option>50,000 to 2,00,000</option><option>2,00,000 and above</option></select></label></div><label>Tell us about your goal<textarea name="msg" rows="5" required /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button pink" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send brief'} {!submitting && <Arrow />}</button></form>}</div></div></section>
    </main>

    <footer><div className="wrap footer-layout"><div><button className="logo-button footer-logo" onClick={() => goTo('top')} aria-label="VYBE HAUS MEDIA home"><img src="/vybe-haus-logo-light-transparent.png" alt="VYBE HAUS MEDIA" /></button><p className="footer-note">Creator-powered marketing for brands that want to be impossible to ignore.</p></div><div className="footer-links"><div><button onClick={() => goTo('services')}>Services</button><button onClick={() => goTo('why-us')}>Why us</button><button onClick={() => goTo('faq')}>FAQ</button></div><div><a href="mailto:vybe.haus09@gmail.com">Email</a><a href="https://www.instagram.com/vybe.hausmedia/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/vybe-haus-media/" target="_blank" rel="noreferrer">LinkedIn</a></div></div></div><div className="wrap footer-bottom">© {new Date().getFullYear()} VYBE HAUS MEDIA <span>WHERE CREATORS BELONG</span></div></footer>
  </>;
}

export default App;
