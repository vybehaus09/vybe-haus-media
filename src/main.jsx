import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';


const Icon = ({name, size=18, strokeWidth=2, fill='none', className}) => {
  const common = {width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth, strokeLinecap:'round', strokeLinejoin:'round', 'aria-hidden':'true', className};
  const paths = {
    arrowUpRight:<><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    arrowDownRight:<><path d="M7 7 17 17"/><path d="M7 17h10V7"/></>,
    arrowRight:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    menu:<><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    x:<><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
    sparkles:<><path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z"/><path d="m19 15-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6L19 15Z"/></>,
    play:<path d="m8 5 11 7-11 7V5Z" fill={fill==='currentColor'?'currentColor':'none'}/>,
    instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/></>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a5 5 0 0 1 2-2Z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    clapperboard:<><path d="M4 8h16v12H4z"/><path d="m4 8 2-4 16 4-2 4z"/><path d="m9 5 2 4M15 6l2 4M8 13h8M8 17h5"/></>
  };
  return <svg {...common}>{paths[name]}</svg>;
};

const services = [
  { num:'01', title:'Influencer Marketing', text:'End-to-end creator campaigns built around the right voices, content and moments for your brand.', tone:'lime' },
  { num:'02', title:'UGC Creators', text:'Native-feeling product stories from creators who know how to make content people actually want to watch.', tone:'peach' },
  { num:'03', title:'Creator Management', text:'A focused partner for creator relationships, deliverables, communication and campaign coordination.', tone:'lavender' },
  { num:'04', title:'PR & Product Seeding', text:'Put products in the hands of relevant creators and turn discovery into organic conversation.', tone:'cream' },
  { num:'05', title:'Campaign Strategy', text:'Clear creative direction, creator briefs and campaign planning designed around your objectives.', tone:'orange' },
  { num:'06', title:'Social Content', text:'Creator-led content systems that give your social channels a fresh, platform-native point of view.', tone:'sky' }
];

const categories = [
  ['Beauty', 'beauty'],
  ['Fashion', 'fashion'],
  ['Food & Beverage', 'food'],
  ['Fitness', 'fitness'],
  ['Travel', 'travel'],
  ['Tech', 'tech'],
  ['Lifestyle', 'lifestyle'],
  ['Gaming', 'gaming'],
  ['Infotainment', 'infotainment'],
];
const reasons = [
  ['Right Creator Fit','Niche, audience, content style, engagement and brand fit guide every match.'],
  ['Authentic Content','Creative that feels native to the creator and natural to the audience.'],
  ['Strategic Campaigns','Every collaboration starts with a clear purpose, brief and content direction.'],
  ['End-to-End Management','From discovery and outreach to content coordination and delivery.'],
  ['Fast Communication','Clear briefs, responsive coordination and a simple working rhythm.'],
  ['Brand-Creator Relationships','Built for repeat collaborations, not one-off transactions.']
];
const steps = ['Brief','Creator Matching','Campaign Planning','Content Creation','Launch'];

function App(){
  const [menuOpen,setMenuOpen] = useState(false);
  const [activeService,setActiveService] = useState(0);
  const [submitted,setSubmitted] = useState(false);
  const [contactType,setContactType] = useState('brand');
  const [submitting,setSubmitting] = useState(false);
  const [formError,setFormError] = useState('');
  const [logoTilt,setLogoTilt] = useState({x:0,y:0,glowX:50,glowY:50});

  const handleLogoMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setLogoTilt({
      x: (0.5 - py) * 18,
      y: (px - 0.5) * 22,
      glowX: px * 100,
      glowY: py * 100,
    });
  };

  const resetLogoTilt = () => setLogoTilt({x:0,y:0,glowX:50,glowY:50});

  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible'); observer.unobserve(e.target);} });
    },{threshold:.12});
    els.forEach(el=>observer.observe(el));
    const fallback = window.setTimeout(()=>els.forEach(el=>el.classList.add('visible')), 900);
    return ()=>{observer.disconnect(); window.clearTimeout(fallback);};
  },[]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); };
  const submit = async e => {
    e.preventDefault();
    setFormError('');

    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const data = contactType === 'creator'
      ? {
          formType: 'creator',
          Name: values.creatorName,
          Instagram: values.instagram,
          Email: values.creatorEmail,
          Phone: values.phone,
          Niche: values.niche,
          Location: values.location,
          Followers: values.followers,
          'Avg Views': values.averageViews,
          'Insta ID Link': values.instagramLink,
          'Commercial Rate': values.commercialRate,
        }
      : {
          formType: 'brand',
          Name: values.brandName,
          Email: values.brandEmail,
          Brand: values.brand,
          Message: values.brandMessage,
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
    } catch (error) {
      setFormError('We could not send your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Primary navigation">
        <button className="brand" onClick={()=>scrollTo('top')} aria-label="VYBE HAUS MEDIA home">
          <img src="/vybe-haus-logo-light-transparent.png" alt="VYBE HAUS MEDIA" />
        </button>
        <div className={`nav-links ${menuOpen?'open':''}`}>
          <button onClick={()=>scrollTo('about')}>About</button>
          <button onClick={()=>scrollTo('services')}>Services</button>
          <button onClick={()=>scrollTo('network')}>Creators</button>
          <button onClick={()=>scrollTo('brands')}>For Brands</button>
          <button onClick={()=>scrollTo('contact')}>Contact</button>
          <button className="nav-cta" onClick={()=>scrollTo('contact')}>Start a Campaign <Icon name="arrowUpRight" size={16}/></button>
        </div>
        <button className="menu-btn" onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}>{menuOpen?<Icon name="x" size={24}/>:<Icon name="menu" size={24}/>}</button>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-pad">
        <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="dot"/> CREATOR-POWERED MARKETING <Icon name="sparkles" size={15}/></div>
            <h1>MAKE YOUR BRAND <em>IMPOSSIBLE</em> TO IGNORE.</h1>
            <p className="hero-sub">VYBE HAUS MEDIA connects ambitious brands with relevant creators to build social campaigns that feel human, culturally tuned-in and made to move.</p>
            <div className="hero-actions">
              <button className="btn btn-dark" onClick={()=>scrollTo('contact')}>Start a Campaign <Icon name="arrowUpRight" size={18}/></button>
              <button className="btn btn-outline" onClick={()=>scrollTo('creators')}>Join as a Creator <Icon name="arrowRight" size={18}/></button>
            </div>
            <div className="hero-note">
              <div
                className="brand-mark premium-logo-shell"
                aria-hidden="true"
                onMouseMove={handleLogoMove}
                onMouseLeave={resetLogoTilt}
                style={{
                  '--rotate-x': `${logoTilt.x}deg`,
                  '--rotate-y': `${logoTilt.y}deg`,
                  '--glow-x': `${logoTilt.glowX}%`,
                  '--glow-y': `${logoTilt.glowY}%`,
                }}
              >
                <img src="/vybe-haus-logo-light-transparent.png" alt="" />
              </div>
              <div className="hero-note-text">
                <span>BRANDS</span>
                <span className="divider">×</span>
                <span>CREATORS</span>
                <span className="divider">×</span>
                <span>CULTURE</span>
              </div>
            </div>
          </div>
          <div className="hero-art reveal">
            <div className="hero-frame">
              <div className="hero-photo photo-a"><div className="photo-label">CREATE<br/><strong>WITH<br/>INTENT.</strong></div></div>
              <div className="hero-card lime-card"><span>VYBE<br/>CHECK</span><Icon name="arrowDownRight" size={28}/></div>
              <div className="hero-card black-card"><Icon name="play" size={19} fill="currentColor"/><span>CONTENT<br/>THAT MOVES</span></div>
            </div>
          </div>
        </div>
        <div className="marquee"><div>INFLUENCE • CREATE • CONNECT • LAUNCH • INFLUENCE • CREATE • CONNECT • LAUNCH • </div></div>
      </section>

      <section id="about" className="about section-pad">
        <div className="container about-grid">
          <div className="section-kicker reveal">02 / ABOUT VYBE HAUS</div>
          <div className="about-main reveal">
            <h2>Creators make brands <span>feel real.</span></h2>
            <p>We bring brands and creators together around ideas worth sharing. From creator discovery to campaign delivery, VYBE HAUS helps turn a marketing objective into creator-led content that fits the platform, the audience and the brand.</p>
            <div className="about-stamp"><span>WHERE</span><strong>CREATORS</strong><span>BELONG</span></div>
          </div>
          <div className="about-side reveal"><div className="vertical-note">BUILT FOR THE FEED</div><div className="mini-poster"><span>BRAND</span><strong>×</strong><span>CREATOR</span><strong>×</strong><span>AUDIENCE</span></div></div>
        </div>
      </section>

      <section id="services" className="services section-pad">
        <div className="container">
          <div className="section-head reveal"><div><div className="section-kicker">03 / WHAT WE DO</div><h2>Built around the <span>vybe.</span></h2></div><p>Flexible creator marketing support, from a single UGC sprint to a full social campaign.</p></div>
          <div className="service-layout">
            <div className="service-list reveal">
              {services.map((s,i)=><button key={s.num} className={`service-row ${activeService===i?'active':''}`} onClick={()=>setActiveService(i)}><span>{s.num}</span><strong>{s.title}</strong></button>)}
            </div>
            <div key={services[activeService].num} className={`service-feature ${services[activeService].tone} reveal service-feature-switch`}>
              <div className="feature-top"><span>{services[activeService].num}</span><Icon name="sparkles" size={20}/></div>
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].text}</p>
              <div className="feature-lines"><i/><i/><i/></div>
              <button onClick={()=>scrollTo('contact')}>Talk about this <Icon name="arrowUpRight" size={17}/></button>
            </div>
          </div>
        </div>
      </section>

      <section id="network" className="network section-pad">
        <div className="container">
          <div className="network-intro reveal"><div className="section-kicker">04 / CREATOR NETWORK</div><h2>The right creator is <span>everything.</span></h2><p>We match creators based on niche, audience, content style, engagement and brand fit — so the partnership makes sense on both sides.</p><div className="network-stat"><strong>500+</strong><span>creators in our network</span></div><button className="btn btn-light" onClick={()=>scrollTo('contact')}>Find Creators <Icon name="arrowUpRight" size={18}/></button></div>
          <div className="category-grid reveal">
            {categories.map(([name, diagram],i)=><div className={`category c${i}`} key={name}><span>0{i+1}</span><div className={`category-diagram diagram-${diagram}`} aria-hidden="true"><i/><i/><i/></div><strong>{name}</strong><Icon name="arrowUpRight" size={18}/></div>)}
          </div>
        </div>
      </section>

      <section className="why section-pad">
        <div className="container"><div className="section-kicker reveal">05 / WHY VYBE HAUS</div><div className="why-grid">
          {reasons.map(([title,text],i)=><article className="why-card reveal" key={title}><span className="why-num">0{i+1}</span><div className="why-icon"><Icon name="check" size={17}/></div><h3>{title}</h3><p>{text}</p></article>)}
        </div></div>
      </section>

      <section className="process section-pad">
        <div className="container"><div className="process-head reveal"><div><div className="section-kicker">06 / HOW IT WORKS</div><h2>From brief to <span>big moment.</span></h2></div><div className="process-arrow"><Icon name="arrowDownRight" size={40}/></div></div>
          <div className="steps reveal">{steps.map((s,i)=><div className="step" key={s}><div className="step-num">0{i+1}</div><h3>{s}</h3>{i<steps.length-1&&<Icon name="arrowRight" className="step-arrow"/>}</div>)}</div>
        </div>
      </section>

      <section id="brands" className="brands section-pad">
        <div className="container brands-grid">
          <div className="brand-poster reveal"><div className="poster-word">BRAND<br/><span>VYBE</span></div><div className="poster-circle">MAKE<br/>IT<br/><strong>MOVE</strong></div><div className="poster-arrow">↗</div></div>
          <div className="brand-copy reveal"><div className="section-kicker">07 / FOR BRANDS</div><h2>Bring us the brief.<br/><span>We'll build the vybe.</span></h2><p>Whether you're launching something new, building social presence or looking for creators who genuinely fit your brand, VYBE HAUS can support the campaign from strategy through launch.</p><ul><li>Define the objective & creative direction</li><li>Discover and match relevant creators</li><li>Coordinate briefs, content and timelines</li><li>Keep communication clear from start to finish</li></ul><button className="btn btn-dark" onClick={()=>scrollTo('contact')}>Start a Campaign <Icon name="arrowUpRight" size={18}/></button></div>
        </div>
      </section>

      <section id="creators" className="creators section-pad">
        <div className="container creators-grid">
          <div className="creator-copy reveal"><div className="section-kicker">08 / FOR CREATORS</div><h2>Your content has a <span>place here.</span></h2><p>Join a creator network built around relevant opportunities, thoughtful brand matches and content that still feels like you.</p><button className="btn btn-dark" onClick={()=>scrollTo('contact')}>Join VYBE HAUS <Icon name="arrowUpRight" size={18}/></button></div>
          <div className="creator-wall reveal"><div className="wall-card wall-1"><span>YOUR<br/>VOICE.</span></div><div className="wall-card wall-2"><span>YOUR<br/>STYLE.</span></div><div className="wall-card wall-3"><span>YOUR<br/>VYBE.</span></div><div className="wall-note">CREATORS<br/><strong>WELCOME</strong> ✦</div></div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="container contact-grid">
          <div className="contact-copy reveal"><div className="section-kicker">09 / LET'S WORK</div><h2>Have a brief?<br/><span>Let's make it a vybe.</span></h2><p>Tell us what you're building, what you need and when you're looking to move. We'll use the details to understand the opportunity and next steps.</p><div className="contact-mark contact-name">VYBE HAUS MEDIA</div></div>
          <div className="form-card reveal">
            <div className="contact-switch" role="tablist" aria-label="Contact type">
              <button type="button" role="tab" aria-selected={contactType==='brand'} className={contactType==='brand'?'active':''} onClick={()=>setContactType('brand')}>For Brands</button>
              <button type="button" role="tab" aria-selected={contactType==='creator'} className={contactType==='creator'?'active':''} onClick={()=>setContactType('creator')}>For Creators</button>
            </div>
            {submitted ? <div className="success"><div className="success-icon"><Icon name="check" size={24}/></div><h3>Thanks — your enquiry is in.</h3><p>We’ll get back to you shortly.</p><button className="text-btn" onClick={()=>setSubmitted(false)}>Submit another enquiry <Icon name="arrowRight" size={16}/></button></div> : <form onSubmit={submit}>
              {contactType==='brand' ? <div className="form-grid">
                <label>Name<input name="brandName" required placeholder="Your name" /></label>
                <label>Email<input name="brandEmail" type="email" required placeholder="you@example.com" /></label>
                <label>Brand<input name="brand" required placeholder="Brand / company" /></label>
                <label className="full">Message<textarea name="brandMessage" required placeholder="Tell us about your campaign or project..."></textarea></label>
              </div> : <div className="form-grid creator-form-grid">
                <label>Name<input name="creatorName" required placeholder="Your name" /></label>
                <label>Instagram<input name="instagram" required placeholder="@yourhandle" /></label>
                <label>Email<input name="creatorEmail" type="email" required placeholder="you@example.com" /></label>
                <label>Phone<input name="phone" type="tel" required placeholder="Your phone number" /></label>
                <label>Niche<input name="niche" required placeholder="e.g. Fashion, Beauty, Infotainment" /></label>
                <label>Location<input name="location" required placeholder="City / country" /></label>
                <label>Followers<input name="followers" inputMode="numeric" required placeholder="e.g. 50K" /></label>
                <label>Average Views<input name="averageViews" inputMode="numeric" required placeholder="e.g. 20K" /></label>
                <label className="full">Instagram ID Link<input name="instagramLink" type="url" required placeholder="https://instagram.com/yourhandle" /></label>
                <label className="full">Commercial Rate<input name="commercialRate" required placeholder="Your rate and currency" /></label>
              </div>}
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <div className="form-foot"><span>We’ll use your details only to respond to this enquiry.</span><button className="btn btn-dark" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Enquiry'} {!submitting && <Icon name="arrowUpRight" size={18}/>}</button></div>
            </form>}
          </div>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="container footer-top"><div><img className="footer-logo" src="/vybe-haus-logo-light-transparent.png" alt="VYBE HAUS MEDIA" /><p>Creator-powered marketing for brands that want to be impossible to ignore.</p></div><div className="footer-links"><div><span>NAVIGATE</span><button onClick={()=>scrollTo('about')}>About</button><button onClick={()=>scrollTo('services')}>Services</button><button onClick={()=>scrollTo('network')}>Creators</button><button onClick={()=>scrollTo('contact')}>Contact</button></div><div><span>CONNECT</span><a href="https://www.instagram.com/vybe.hausmedia/" target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={17}/> Instagram</a><a href="https://www.linkedin.com/company/vybe-haus-media/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={17}/> LinkedIn</a><a className="footer-email" href="mailto:vybe.haus09@gmail.com"><Icon name="mail" size={17}/> Email</a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} VYBE HAUS MEDIA</span><span>WHERE CREATORS BELONG ✦</span></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
