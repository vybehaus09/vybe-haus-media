import { createRoot } from 'react-dom/client';
import Button from './components/Button.jsx';
import Card from './components/Card.jsx';
import './design.css';

function StyleGuide() {
  return (
    <main className="style-guide">
      <div className="wrap">
        <p className="eyebrow">VYBE HAUS MEDIA <span>DESIGN SYSTEM</span></p>
        <h1>Type with <span className="heading-highlight">impact.</span></h1>
        <p className="style-guide-intro">
          A quick reference for the responsive typography, links and buttons used across the site.
          Headings scale fluidly from small screens to desktop.
        </p>

        <section className="style-guide-section" aria-labelledby="style-guide-headings">
          <h2 id="style-guide-headings">Headings</h2>
          <div className="style-guide-type">
            <h1>Big ideas, made real.</h1>
            <h2>Creator campaigns with purpose.</h2>
            <h3>Find your next audience.</h3>
            <h4>Made for brands and creators.</h4>
          </div>
        </section>

        <section className="style-guide-section" aria-labelledby="style-guide-body">
          <h2 id="style-guide-body">Body text</h2>
          <p className="style-guide-body">
            We connect thoughtful brands with creators their audiences already trust. Clear briefs,
            comfortable reading line height, and considered campaign support keep every collaboration
            moving from first idea to final post.
          </p>
        </section>

        <section className="style-guide-section" aria-labelledby="style-guide-links">
          <h2 id="style-guide-links">Links & buttons</h2>
          <div className="style-guide-controls">
            <a className="style-guide-link" href="/">Explore VYBE HAUS MEDIA</a>
            <Button variant="primary" href="/">Start a campaign</Button>
            <Button>Secondary action</Button>
          </div>
        </section>

        <section className="style-guide-section" aria-labelledby="style-guide-card">
          <h2 id="style-guide-card">Card</h2>
          <Card className="dark-card">
            <span className="card-number">01 / CAMPAIGN</span>
            <h3>Good work starts with a good match.</h3>
            <p>Peach border, shared radius, and a subtle shadow with a gentle hover lift.</p>
          </Card>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StyleGuide />);
