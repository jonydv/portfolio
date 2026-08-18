const SCRIPT_TAG_ESCAPE = /</g;
const ESCAPED_LESS_THAN = '\\u003c';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(SCRIPT_TAG_ESCAPE, ESCAPED_LESS_THAN);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />
  );
}
