import { App } from '@app';
import { ssrCache, ssrPromises } from '@core/api';
import React, { ReactElement } from 'react';
import ReactDom from 'react-dom/server';

type Context = { data: unknown[] };

function cleanArray(array: unknown[]) {
  array.splice(0, array.length);
}

async function deepRender(node: ReactElement, context: Context): Promise<string> {
  const html = ReactDom.renderToStaticMarkup(node);
  if (ssrPromises.length) {
    await Promise.all(ssrPromises);
    cleanArray(ssrPromises);
    return deepRender(node, context);
  }

  context.data = Array.from(ssrCache);

  return html;
}

export function render(url: string, context: Context): Promise<string> {
  ssrCache.clear();
  return deepRender(<App />, context);
}
