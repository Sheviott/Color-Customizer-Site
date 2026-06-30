export default function Divider({ color = '#e0e0e0', height = 1, style = {} }) {
  return (
    <div
      role="separator"
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: color,
        marginTop: '5px',
        marginBottom: '5px',
        ...style,
      }}
    />
  );
}