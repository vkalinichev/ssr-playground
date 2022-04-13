import React from 'react';

type Intent = 'negative' | 'positive' | 'warning';

type Props = {
  intent: Intent;
  title?: string;
}

const iconByIntent: Record<Intent, string> = {
  negative: '🔴',
  positive: '🟢',
  warning: '🟡',
}

export function Indicator({intent, title}: Props) {
  return <span role='img' title={title}>{iconByIntent[intent]}</span>;
}
