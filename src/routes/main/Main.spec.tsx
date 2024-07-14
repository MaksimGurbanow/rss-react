import { screen, waitFor } from "@testing-library/dom"
import { renderWithRouter } from "../../App.spec"
import { App } from "../../App"

describe('Check the main page content', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.clearAllMocks()
    renderWithRouter(<App />, ['/1'])
  })
  test('Should have a search component', async () => {
    await waitFor(() => {
      const searchContainer = screen.findByTestId('search-container')
      expect(searchContainer).toBeDefined()
    }, { timeout: 5000 })

  })
  test('Should have a List component', async () => {
    await waitFor(() => {
      const listContainer = screen.findByTestId('list-container')
      expect(listContainer).toBeDefined()
    }, { timeout: 5000 })
  })
  test('Should have a Pagination component', async () => {
    await waitFor(() => {
      const paginationContainer = screen.findByTestId('pagination-container')
      expect(paginationContainer).toBeDefined()
    }, { timeout: 5000 })

  })
})
