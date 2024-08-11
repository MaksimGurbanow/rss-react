beforeEach(() => {
  vi.mock('next/router', () => require('next-router-mock'));
  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });
  vi.mock('next/headers', () => ({
    cookies: () => ({
      get: vi.fn((name) => {
        if (name === 'searchQuery') {
          return { value: '' };
        }
        return undefined;
      }),
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});
