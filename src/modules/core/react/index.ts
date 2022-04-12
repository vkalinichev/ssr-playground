import { isSsr } from '@core/utils';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function useEffectSsrData(): void {}

export const useEffect = isSsr() ? useEffectSsrData : React.useEffect;
