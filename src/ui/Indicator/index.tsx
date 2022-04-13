import React from 'react';

export type Intent = 'negative' | 'neutral' | 'positive' | 'info' | 'warning';

type Props = {
  intent: Intent;
  title?: string;
};

const iconByIntent: Record<Intent, string> = {
  info: '🔵',
  negative: '🔴',
  neutral: '⚪️',
  positive: '🟢',
  warning: '🟡',
};

export function Indicator({ intent, title }: Props) {
  return (
    <span role='img' title={title}>
      {iconByIntent[intent]}
    </span>
  );
}
