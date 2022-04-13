import { App } from '@app';
import React, { ReactElement } from 'react';
import ReactDom from 'react-dom/server';
import { dehydrate, QueryClient } from 'react-query';

type Context = { data: unknown };

async function deepRender(node: ReactElement): Promise<string> {
  const html = ReactDom.renderToStaticMarkup(node);
  // if (ssrPromises.length) {
  //   await Promise.all(ssrPromises);
  //   cleanArray(ssrPromises);
  //   return deepRender(node, context);
  // }

  return html;
}

export function render(url: string, context: Context): Promise<string> {
  const queryClient = new QueryClient();

  context.data = dehydrate(queryClient);

  return deepRender(<App />);
}
