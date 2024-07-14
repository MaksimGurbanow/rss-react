import '@testing-library/dom'
import { render, RenderResult, screen } from '@testing-library/react'
import { App } from './App'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Product } from './types/types'

export const renderWithRouter = (
  ui: React.ReactNode,
  route: string[]
): RenderResult & { history: MemoryHistory } => {
  const history = createMemoryHistory({ initialEntries: route });

  const rendered = render(
    <MemoryRouter initialEntries={route} initialIndex={0}>
      {ui}
    </MemoryRouter>
  );

  return {
    ...rendered,
    history
  };
};

describe('Should open expected component upon changing the url path', () => {
  test('Should render Main component for / route', async () => {
    renderWithRouter(<App />, ['/1'])
    const mainPage = await screen.findByTestId('main-page')
    expect(mainPage).toBeDefined()
  })

  test('Should render Details component for /:page/details:productId? route', async () => {
    renderWithRouter(<App />, ['/1/details/1'])
    const detailsPage = await screen.findByTestId('details-page')
    expect(detailsPage).toBeDefined()
  })

  test('Should render NotFound page for non existing royte', async () => {
    renderWithRouter(<App />, ['/non-existing-page'])
    const notFoundPage = await screen.findByTestId('not-found-page')
    expect(notFoundPage).toBeDefined()
  })
})
