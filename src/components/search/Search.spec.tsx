import { act, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { App } from "../../App"
import { renderWithRouter } from "../../App.spec"
import * as SearchHook from "../../hooks/useSearchQuery"
import { useSearchQuery } from "../../hooks/useSearchQuery"

describe('Search', () => {
  beforeEach(() => {
    vi.spyOn(SearchHook, 'useSearchQuery')
  })
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks()
  })

  test('Should save to local storage if button is clicked', async () => {
    renderWithRouter(<App />, ['/1']);

    let input = await screen.findByTestId<HTMLInputElement>('search-input')
    const button = await screen.findByTestId('search-button')
    
    userEvent.type(input, 'example search query')
    act(() => {
      fireEvent.click(button)
    })
    
    expect(useSearchQuery).toBeCalled()
  })
})
