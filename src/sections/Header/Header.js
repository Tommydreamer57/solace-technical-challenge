import { ChevronDownOutline } from 'react-ionicons';
import ExternalLink from '../../components/ExternalLink';
import './Header.css';

export default function Header() {
  return (
    <header className="Header">
      <h1 className="Header-title">
        Solace Technical Full Stack Project
      </h1>
      <h3 className="Header-subtitle">
        By Thomas Lowry
      </h3>
      <div className="Header-link-group">
        <ExternalLink
          href="https://findsolace.notion.site/Technical-Full-Stack-Prompt-6d27ed922aaa43a1add14f517c9ab002"
          text="View prompt"
        />
        <ExternalLink
          href="https://github.com/Tommydreamer57/solace-technical-challenge"
          text="View code"
        />
      </div>
      <ChevronDownOutline
        cssClasses="Header-scroll-indicator"
        height="3rem"
        width="3rem"
        color="white"
      />
    </header>
  );
}
