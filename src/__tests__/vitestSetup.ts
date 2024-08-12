beforeEach(() => {
  global.URL.createObjectURL = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});
