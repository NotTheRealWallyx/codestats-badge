import './styles.css';

interface SubTitleProps {
  text: string;
}

export default function SubTitle({ text }: SubTitleProps) {
  return <h2 className="subtitle">{text}</h2>;
}
