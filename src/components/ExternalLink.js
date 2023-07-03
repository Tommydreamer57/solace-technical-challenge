import { OpenOutline } from 'react-ionicons';

export default function ExternalLink({ href, text }) {
  return (
    <a
      className="ExternalLink"
      href={href}
      target="_blank"
    >
      {text} <OpenOutline color="#61dafb" />
    </a>
  );
}
