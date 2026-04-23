const SPECS = [
  ['Based', 'Spain · remote'],
  ['Focus', 'Web · Android'],
  ['Since', '2018'],
  ['Stack', 'React · Node'],
] as const;

export function SpecRail() {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: '0 44px',
        marginTop: 60,
        paddingTop: 24,
        borderTop: '1px solid var(--br)',
        width: 'fit-content',
      }}
    >
      {SPECS.map(([key, value]) => (
        <div key={key}>
          <dt
            className="m"
            style={{
              fontSize: 9,
              color: 'var(--fg-d)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 4,
            }}
          >
            {key}
          </dt>
          <dd className="m" style={{ margin: 0, fontSize: 12, color: 'var(--fg-m)' }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
