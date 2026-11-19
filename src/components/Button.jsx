export default function Button({
  variant = 'secondary',
  className = '',
  href,
  type = 'button',
  ...props
}) {
  const Element = href ? 'a' : 'button';
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');

  return (
    <Element
      className={classes}
      {...(href ? { href } : { type })}
      {...props}
    />
  );
}
