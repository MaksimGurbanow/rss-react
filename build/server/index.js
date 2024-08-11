var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts, json, useNavigate, useLocation, Link, defer, useNavigation, Await } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createContext, useState, useEffect, useCallback, useContext, useMemo, Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { BrightnessHighFill, MoonStarsFill } from "react-bootstrap-icons";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {
  }
});
const useThemeContext = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      localStorage.setItem("theme", prev === "light" ? "dark" : "light");
      return prev === "light" ? "dark" : "light";
    });
  }, []);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `theme-wrapper ${theme === "light" ? "light-theme" : "dark-theme"}`,
      "data-testid": "theme-wrapper",
      children
    }
  ) });
};
const initialState = [];
const savedProductsSlice = createSlice({
  name: "savedProducts",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const newState = [...state];
      for (const newProduct of action.payload) {
        if (!state.some((product) => product.id === newProduct.id)) {
          newState.push(newProduct);
        }
      }
      return newState;
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    unsellectAll: () => []
  }
});
const { addProducts, removeProduct, unsellectAll } = savedProductsSlice.actions;
const store = configureStore({
  reducer: {
    savedProducts: savedProductsSlice.reducer
  }
});
const StoreProvider = ({ children }) => {
  return /* @__PURE__ */ jsx(Provider, { store, children });
};
class ErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    __publicField(this, "state", { error: "" });
  }
  static getDerivedStateFromError(error) {
    return { error: error.message };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error: error.message });
    console.error(error, errorInfo);
  }
  render() {
    if (this.props.fallback && this.state.error !== "")
      return /* @__PURE__ */ jsx("div", { "data-testid": "error-boundary-fallback", children: this.props.fallback() });
    if (this.state.error)
      return /* @__PURE__ */ jsx("h1", { "data-testid": "error-boundary-message", children: this.state.error });
    return this.props.children;
  }
}
async function loader$2() {
  return json({
    ENV: {
      REMIX_API_BASE_URL: process.env.REMIX_API_BASE_URL,
      REMIX_API_PAGE_URL: process.env.REMIX_API_PAGE_URL,
      REMIX_API_PRODUCTS_URL: process.env.REMIX_API_PRODUCTS_URL
    }
  });
}
function App$1() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/search-logo.jpg" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("title", { children: "Dummy store" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(StoreProvider, { children: /* @__PURE__ */ jsxs("div", { id: "remix", children: [
        /* @__PURE__ */ jsx(Outlet, {}),
        /* @__PURE__ */ jsx(ScrollRestoration, {})
      ] }) }) }) }),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`
          }
        }
      ),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const Description = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "description-block", "data-testid": "description-block", children: [
    /* @__PURE__ */ jsx("h5", { children: "Description" }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
};
const Properties = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "properties-container", children: [
    /* @__PURE__ */ jsx("h5", { children: "Properties" }),
    Object.entries(props).map(
      ([name, value]) => value && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "item-property",
          "data-testid": "item-property",
          children: [
            /* @__PURE__ */ jsx("div", { className: "item-property-name", children: name }),
            /* @__PURE__ */ jsx("div", { className: "item-property-content", children: value.toString() })
          ]
        },
        `value-${value}-key-${name}`
      )
    )
  ] });
};
const capitalize = (str) => {
  return str ? str.charAt(0).toUpperCase().concat(str.slice(1)) : "";
};
const ItemDetails = ({
  description,
  price,
  rating,
  brand,
  title,
  images
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "item-details", "data-testid": "item-details", children: [
    /* @__PURE__ */ jsx("h3", { className: "item-details-name", "data-testid": "item-details-name", children: capitalize(title) }),
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: "Sprite",
        src: images[0],
        className: "item-details-image",
        "data-testid": "item-details-image"
      }
    ),
    /* @__PURE__ */ jsx(Description, { children: description }),
    /* @__PURE__ */ jsx(Properties, { price, brand, rating })
  ] });
};
const Button = ({
  type,
  className,
  children,
  style,
  disabled = false,
  testid,
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: type || "button",
      className: `button ${disabled ? "disabled" : ""} ${className}`,
      style,
      disabled,
      onClick,
      "data-testid": testid,
      children
    }
  );
};
const SvgXLg = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor", className: "bi bi-x-lg", viewBox: "0 0 16 16", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" }));
const SvgCaretLeftFill = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor", className: "bi bi-caret-left-fill", viewBox: "0 0 16 16", ...props }, /* @__PURE__ */ React.createElement("path", { d: "m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" }));
const getProductById = async (id) => {
  const item = (await fetch(`${process.env.REMIX_API_PRODUCTS_URL}${id}`)).json();
  return item;
};
const formatAddress = ({
  query,
  pathname,
  newPage,
  search,
  newId,
  includeDetails,
  disableDetails
}) => {
  const [main, page, details = "", id = ""] = pathname.split("/").slice(1);
  const productId = newId || id ? "/" + (newId || id) : "";
  return `/${main}/${newPage || page}${(includeDetails || details) && "/details"}${disableDetails ? "" : productId}${search || `?searchQuery=${query}` || ""}`;
};
const loader$1 = async ({ params }) => {
  const { id } = params;
  const product = id ? await getProductById(id) : null;
  return {
    id,
    product
  };
};
const Details = () => {
  const { product, id } = useLoaderData();
  const [currentOrStoredId, setCurrentOrStoredId] = useState();
  const [opened, setOpened] = useState(!!id);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  useEffect(() => {
    setCurrentOrStoredId(id || localStorage.getItem("id") || "");
  }, []);
  useEffect(() => {
    setOpened(!!id);
    if (id) localStorage.setItem("id", id || "");
    return () => {
      if (id) localStorage.setItem("id", id || "");
    };
  }, [id]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `details-page ${opened ? "" : "details-page__disabled"}`,
      "data-testid": "details-page",
      children: [
        /* @__PURE__ */ jsxs("div", { className: `details-page-container ${opened ? "opened" : "closed"}`, children: [
          product && /* @__PURE__ */ jsx(ItemDetails, { ...product }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                setOpened((prev) => !prev);
                navigate(
                  formatAddress({ search, pathname, disableDetails: true }),
                  { replace: true }
                );
              },
              disabled: !opened,
              testid: "details-close-button",
              children: /* @__PURE__ */ jsx(SvgXLg, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            testid: "open-details-button",
            onClick: () => {
              navigate(
                formatAddress({ search, pathname, newId: currentOrStoredId || id }),
                {
                  replace: true
                }
              );
              setOpened((prev) => !prev);
            },
            className: `open-details-button ${opened ? "open-details-button__disabled" : ""}`,
            children: /* @__PURE__ */ jsx(SvgCaretLeftFill, {})
          }
        )
      ]
    }
  );
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Details,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const Input = ({ placeholder, value, onChange, testid }) => {
  const handleChange = (v) => {
    onChange(v);
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      "data-testid": testid,
      placeholder,
      className: "search-input",
      value,
      onChange: (e) => handleChange(e.target.value)
    }
  );
};
const Toggle = ({
  initial,
  end,
  callback,
  defaultToggled = false,
  testid
}) => {
  const [toggled, setToggled] = useState(defaultToggled);
  useEffect(() => {
    setToggled(defaultToggled);
  }, [defaultToggled]);
  const handleCallback = () => {
    setToggled((prev) => !prev);
    if (callback) callback();
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "toggle-button",
      type: "button",
      onClick: handleCallback,
      "data-testid": testid,
      children: /* @__PURE__ */ jsx("div", { className: `toggle-circle ${toggled && "toggled"}`, children: toggled ? end.icon : initial.icon })
    }
  );
};
const Search = ({ searchValue, onSearch }) => {
  const [query, setQuery] = useState(searchValue || "");
  const { theme, toggleTheme } = useThemeContext();
  const valueChanged = useMemo(
    () => query !== searchValue,
    [query, searchValue]
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setQuery(searchValue || "");
  }, [searchValue]);
  return /* @__PURE__ */ jsxs("div", { className: "search-field", "data-testid": "search-container", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Type here to search what you need",
        value: query,
        onChange: (v) => setQuery(v),
        testid: "search-input"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        testid: "search-button",
        disabled: !valueChanged,
        onClick: () => {
          if (valueChanged && onSearch) {
            onSearch(query);
            navigate(formatAddress({ query, pathname, newPage: 1 }));
          }
        },
        children: "Search"
      }
    ),
    /* @__PURE__ */ jsx(
      Toggle,
      {
        initial: { icon: /* @__PURE__ */ jsx(BrightnessHighFill, {}) },
        end: { icon: /* @__PURE__ */ jsx(MoonStarsFill, {}) },
        callback: toggleTheme,
        defaultToggled: theme === "dark",
        testid: "toggle-theme"
      }
    )
  ] });
};
const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem("searchQuery", searchQuery);
    }
  }, [searchQuery]);
  const update = (value) => {
    setSearchQuery(value);
    localStorage.setItem("searchQuery", value);
  };
  return { searchQuery, update };
};
const getProducts = async ({
  query,
  page,
  limit = 10
}) => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `${process.env.REMIX_API_PAGE_URL}/search?q=${query.trim() || ""}&skip=${skip}&limit=${limit}&select=title&select=id&select=images`
  );
  return await response.json().then((res) => ({ ...res, page }));
};
const SaveButton = ({ id }) => {
  const savedProducts = useSelector((state) => state.savedProducts);
  const isSaved = !!savedProducts.find((product) => product.id === id);
  const handleClick = (e) => {
    e.stopPropagation();
    if (isSaved) {
      store.dispatch(removeProduct(id));
    } else {
      fetch(window.ENV.REMIX_API_PRODUCTS_URL + id).then((res) => res.json()).then((product) => store.dispatch(addProducts([product])));
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleClick,
      "data-testid": `save-button-${id}`,
      className: "save-button",
      children: isSaved ? "Delete" : "Save"
    }
  );
};
const Item = ({ title, images, id }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "item",
      "data-testid": "item-container",
      onClick: () => {
        navigate(
          formatAddress({ search, pathname, includeDetails: true, newId: id })
        );
      },
      children: [
        /* @__PURE__ */ jsx("h3", { className: "item-name", "data-testid": "item-name", children: capitalize(title) }),
        /* @__PURE__ */ jsx(
          "img",
          {
            loading: "lazy",
            role: "presentation",
            decoding: "async",
            alt: "Sprite",
            src: images[0],
            className: "item-image",
            "data-testid": "item-image"
          }
        ),
        /* @__PURE__ */ jsx(SaveButton, { id })
      ]
    }
  );
};
const NoItemsMessage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "no-items-message", "data-testid": "no-items-container", children: [
    /* @__PURE__ */ jsx("h3", { children: "Oops... No product found" }),
    /* @__PURE__ */ jsx("h5", { children: "It seems that there is no such a product with given title" })
  ] });
};
const List = ({ items }) => {
  return /* @__PURE__ */ jsx("div", { className: "items-list", "data-testid": "list-container", children: items.length ? items.map((item) => /* @__PURE__ */ jsx(
    Item,
    {
      title: item.title,
      images: item.images,
      id: item.id
    },
    item.id
  )) : /* @__PURE__ */ jsx(NoItemsMessage, {}) });
};
const Pagination = ({ total }) => {
  const { searchQuery = "", page, limit = 10 } = useLoaderData();
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "pagination-pages__button previous",
        disabled: page <= 1,
        testid: "pagination-previous",
        children: page > 1 ? /* @__PURE__ */ jsx(
          Link,
          {
            to: formatAddress({
              query: searchQuery,
              pathname,
              newPage: page - 1
            }),
            className: "pagination-link",
            children: "Previous"
          }
        ) : "Previous"
      }
    ),
    page * limit < total ? /* @__PURE__ */ jsx(
      Link,
      {
        to: formatAddress({
          query: searchQuery,
          pathname,
          newPage: page + 1
        }),
        className: "pagination-link",
        children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "pagination-pages__button next",
            disabled: page * limit >= total,
            testid: "pagination-next",
            children: "Next"
          }
        )
      }
    ) : /* @__PURE__ */ jsx(
      Button,
      {
        className: "pagination-pages__button next",
        disabled: page * limit >= total,
        testid: "pagination-next",
        children: "Next"
      }
    )
  ] });
};
const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "loader-container", "data-testid": "loader-container", children: /* @__PURE__ */ jsx("div", { className: "loader-block" }) });
};
const pluralize = (word, quantity = 1) => {
  if (quantity < 0) throw new Error("Quantity must be greater than 0");
  if (quantity === 1) return word;
  return word + "s";
};
const convertToCSV = (items) => {
  const productKeys = [
    "brand",
    "description",
    "price",
    "title",
    "rating",
    "minimumOrderQuantity"
  ];
  const refinedItems = items.map((item) => {
    return productKeys.map((key) => item[key]);
  });
  let csvContent = productKeys.join(",") + "\n";
  refinedItems.forEach((row) => {
    csvContent += row.map((item) => `"${item}"`).join(",") + "\n";
  });
  return csvContent;
};
const SavedItems = () => {
  const savedProducts = useSelector((state) => state.savedProducts);
  const blob = () => new Blob([convertToCSV(savedProducts)], {
    type: "text/csv;charset=utf-8,"
  });
  const handleUnselectAll = async () => {
    store.dispatch(unsellectAll());
  };
  if (!savedProducts.length) return;
  return /* @__PURE__ */ jsxs("div", { className: "saved-products-block", "data-testid": "saved-products", children: [
    /* @__PURE__ */ jsx("h2", { className: "saved-products-header", children: "Saved items" }),
    /* @__PURE__ */ jsxs("h3", { className: "saved-products-subheader", children: [
      savedProducts.length,
      " ",
      pluralize("item", savedProducts.length),
      " ",
      "selected."
    ] }),
    /* @__PURE__ */ jsx(List, { items: savedProducts }),
    /* @__PURE__ */ jsxs("div", { className: "saved-products-controllers", children: [
      /* @__PURE__ */ jsx(Button, { onClick: handleUnselectAll, children: "Unselect all" }),
      /* @__PURE__ */ jsx(Button, { className: "saved-products-download", children: /* @__PURE__ */ jsx(
        "a",
        {
          className: "saved-products-download-link",
          href: URL.createObjectURL(blob()),
          download: `${savedProducts.length}_products.csv`,
          children: "Download"
        }
      ) })
    ] })
  ] });
};
const loader = async ({ params, request }) => {
  const page = Number(params.page);
  const searchQuery = new URL(request.url).searchParams.get("searchQuery") || "";
  const res = getProducts({
    query: searchQuery,
    page
  });
  return defer({ res, page });
};
const Main = () => {
  const { searchQuery, update } = useSearchQuery();
  const { res, page } = useLoaderData();
  const navigation = useNavigation();
  return /* @__PURE__ */ jsxs("div", { "data-testid": "main-page", children: [
    navigation.state === "loading" ? /* @__PURE__ */ jsx(Loader, {}) : "",
    /* @__PURE__ */ jsx(Search, { searchValue: searchQuery, onSearch: update }),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: /* @__PURE__ */ jsx(Await, { resolve: res, children: (res2) => /* @__PURE__ */ jsx(List, { items: res2.products }) }) }),
    /* @__PURE__ */ jsx(Await, { resolve: res, children: (res2) => /* @__PURE__ */ jsx(Pagination, { total: res2.total || 0, page }) }),
    /* @__PURE__ */ jsx(SavedItems, {})
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Main,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const App = () => {
  return /* @__PURE__ */ jsxs("h3", { children: [
    "Hello, you can move ",
    /* @__PURE__ */ jsx(Link, { to: "/main/1", children: "Here" })
  ] });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D9naFnf1.js", "imports": ["/assets/components-DYEYZaig.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-bc7kLGUq.js", "imports": ["/assets/components-DYEYZaig.js", "/assets/store-B4gwXQ22.js"], "css": ["/assets/root-Cgr3NBcf.css"] }, "routes/main.$page.details.($id)": { "id": "routes/main.$page.details.($id)", "parentId": "routes/main.$page", "path": "details/:id?", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-Bxx27Fb5.js", "imports": ["/assets/components-DYEYZaig.js", "/assets/formatAddress-DbCsjo9G.js"], "css": ["/assets/formatAddress-DOrhNjBd.css", "/assets/route-Bur2TSr2.css"] }, "routes/main.$page": { "id": "routes/main.$page", "parentId": "root", "path": "main/:page", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CqDdoGYe.js", "imports": ["/assets/components-DYEYZaig.js", "/assets/formatAddress-DbCsjo9G.js", "/assets/store-B4gwXQ22.js"], "css": ["/assets/formatAddress-DOrhNjBd.css", "/assets/route-BL8ROly_.css"] }, "routes/route": { "id": "routes/route", "parentId": "root", "path": "route", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BmRLtGXf.js", "imports": ["/assets/components-DYEYZaig.js"], "css": [] } }, "url": "/assets/manifest-317db063.js", "version": "317db063" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/main.$page.details.($id)": {
    id: "routes/main.$page.details.($id)",
    parentId: "routes/main.$page",
    path: "details/:id?",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/main.$page": {
    id: "routes/main.$page",
    parentId: "root",
    path: "main/:page",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/route": {
    id: "routes/route",
    parentId: "root",
    path: "route",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
