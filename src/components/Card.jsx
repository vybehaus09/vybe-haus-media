export default function Card({
  as: Element = 'article',
  className = '',
  ...props
}) {
  const classes = ['card', className].filter(Boolean).join(' ');

  return <Element className={classes} {...props} />;
}
