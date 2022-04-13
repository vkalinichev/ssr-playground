import React from 'react';
import {Indicator} from '../Indicator';

type Props = {
  hydrated: boolean;
}

export function HydrationIndicator({hydrated}: Props) {
  if (hydrated) {
    return <Indicator intent='positive' title='Hydrated'/>;
  }
  return <Indicator intent='warning' title='Rendered on server' />;
}
