"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/profiler",{

/***/ "./pages/profiler.tsx":
/*!****************************!*\
  !*** ./pages/profiler.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../../../../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reapit_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reapit/elements */ \"../../../../node_modules/@reapit/elements/dist/esm/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"../../../../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst Profiler = ()=>{\n    _s();\n    const [events, setEvents] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const fetchEvents = async ()=>{\n            setLoading(true);\n            const response = await fetch(\"http://localhost:3000/api/profiler\");\n            setLoading(false);\n            const result = await response.json();\n            setEvents(result);\n        };\n        fetchEvents();\n    }, []);\n    return loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.Loader, {}, void 0, false, {\n        fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n        lineNumber: 22,\n        columnNumber: 20\n    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.Accordion, {\n            items: events.map((event)=>({\n                    content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.Label, {\n                                children: \"Body\"\n                            }, void 0, false, {\n                                fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                lineNumber: 26,\n                                columnNumber: 11\n                            }, void 0),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n                                children: JSON.stringify(event.event.body)\n                            }, void 0, false, {\n                                fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                lineNumber: 27,\n                                columnNumber: 11\n                            }, void 0)\n                        ]\n                    }, void 0, true),\n                    title: event.event.path,\n                    titleItems: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.Badge, {\n                            children: event.event.httpMethod\n                        }, void 0, false, {\n                            fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                            lineNumber: 31,\n                            columnNumber: 11\n                        }, void 0)\n                    ]\n                }))\n        }, void 0, false, {\n            fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n            lineNumber: 24,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(Profiler, \"jrnPprsO/iPW8AMJGCWQRhvHSAs=\");\n_c = Profiler;\n/* harmony default export */ __webpack_exports__[\"default\"] = (()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.NavStateProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.MainContainer, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.NavResponsive, {\n                    options: []\n                }, void 0, false, {\n                    fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 3\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.FlexContainer, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.SecondaryNavContainer, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.SecondaryNav, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.SecondaryNavItem, {\n                                        active: true,\n                                        onClick: function Qa() {},\n                                        children: \"Profiler\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                        lineNumber: 45,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.SecondaryNavItem, {\n                                        onClick: function Qa() {},\n                                        children: \"Routes\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                        lineNumber: 51,\n                                        columnNumber: 13\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                lineNumber: 44,\n                                columnNumber: 11\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 7\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.PageContainer, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_reapit_elements__WEBPACK_IMPORTED_MODULE_1__.PageHeader, {\n                                    pageTitle: {\n                                        children: \"Profiler\",\n                                        hasBoldText: true\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                    lineNumber: 59,\n                                    columnNumber: 11\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Profiler, {}, void 0, false, {\n                                    fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                                    lineNumber: 63,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 9\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n                    lineNumber: 42,\n                    columnNumber: 5\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n            lineNumber: 40,\n            columnNumber: 3\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/aaryannasimonelli/code/lambda-framework/packages/lambda-dev/src/app/pages/profiler.tsx\",\n        lineNumber: 39,\n        columnNumber: 1\n    }, undefined));\nvar _c;\n$RefreshReg$(_c, \"Profiler\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9maWxlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBME47QUFDcEs7QUFFdEQsTUFBTWdCLFdBQW9COztJQUN4QixNQUFNLENBQUNDLFFBQVFDLFVBQVUsR0FBR0gsK0NBQVFBLENBQVEsRUFBRTtJQUM5QyxNQUFNLENBQUNJLFNBQVNDLFdBQVcsR0FBR0wsK0NBQVFBLENBQVU7SUFFaERELGdEQUFTQSxDQUFDO1FBQ1IsTUFBTU8sY0FBYztZQUNsQkQsV0FBVztZQUNYLE1BQU1FLFdBQVcsTUFBTUMsTUFBTTtZQUU3QkgsV0FBVztZQUNYLE1BQU1JLFNBQVMsTUFBTUYsU0FBU0csSUFBSTtZQUVsQ1AsVUFBVU07UUFDWjtRQUVBSDtJQUNGLEdBQUcsRUFBRTtJQUVMLE9BQU9GLHdCQUFVLDhEQUFDZixvREFBTUE7Ozs7a0NBQ3RCO2tCQUNFLDRFQUFDSix1REFBU0E7WUFBQzBCLE9BQU9ULE9BQU9VLEdBQUcsQ0FBQ0MsQ0FBQUEsUUFBVTtvQkFDckNDLHVCQUFTOzswQ0FDUCw4REFBQzFCLG1EQUFLQTswQ0FBQzs7Ozs7OzBDQUNQLDhEQUFDMkI7MENBQUtDLEtBQUtDLFNBQVMsQ0FBQ0osTUFBTUEsS0FBSyxDQUFDSyxJQUFJOzs7Ozs7OztvQkFFdkNDLE9BQU9OLE1BQU1BLEtBQUssQ0FBQ08sSUFBSTtvQkFDdkJDLFlBQVk7c0NBQ1YsOERBQUNuQyxtREFBS0E7c0NBQUUyQixNQUFNQSxLQUFLLENBQUNTLFVBQVU7Ozs7OztxQkFDL0I7Z0JBQ0g7Ozs7Ozs7QUFHTjtHQWhDTXJCO0tBQUFBO0FBa0NOLCtEQUFlLGtCQUNmLDhEQUFDVCw4REFBZ0JBO2tCQUNmLDRFQUFDRiwyREFBYUE7OzhCQUNkLDhEQUFDQywyREFBYUE7b0JBQUNnQyxTQUFTLEVBQUU7Ozs7Ozs4QkFDeEIsOERBQUNwQywyREFBYUE7O3NDQUNaLDhEQUFDUyxtRUFBcUJBO3NDQUNsQiw0RUFBQ0QsMERBQVlBOztrREFDWCw4REFBQ0UsOERBQWdCQTt3Q0FDZjJCLE1BQU07d0NBQ05DLFNBQVMsU0FBU0MsTUFBSztrREFDeEI7Ozs7OztrREFHRCw4REFBQzdCLDhEQUFnQkE7d0NBQ2Y0QixTQUFTLFNBQVNDLE1BQUs7a0RBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7OztzQ0FLTCw4REFBQ2pDLDJEQUFhQTs7OENBQ1osOERBQUNDLHdEQUFVQTtvQ0FBQ2lDLFdBQVc7d0NBQ25CQyxVQUFVO3dDQUNWQyxhQUFhO29DQUNmOzs7Ozs7OENBQ0UsOERBQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQU1mLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZmlsZXIudHN4PzZjYmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3JkaW9uLCBCYWRnZSwgRmxleENvbnRhaW5lciwgTGFiZWwsIExvYWRlciwgTWFpbkNvbnRhaW5lciwgTmF2UmVzcG9uc2l2ZSwgTmF2U3RhdGVQcm92aWRlciwgUGFnZUNvbnRhaW5lciwgUGFnZUhlYWRlciwgU2Vjb25kYXJ5TmF2LCBTZWNvbmRhcnlOYXZDb250YWluZXIsIFNlY29uZGFyeU5hdkl0ZW0sIFRpdGxlIH0gZnJvbSAnQHJlYXBpdC9lbGVtZW50cydcbmltcG9ydCBSZWFjdCwgeyBGQywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBQcm9maWxlcjogRkM8YW55PiA9ICgpID0+IHtcbiAgY29uc3QgW2V2ZW50cywgc2V0RXZlbnRzXSA9IHVzZVN0YXRlPGFueVtdPihbXSlcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEV2ZW50cyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSlcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvcHJvZmlsZXInKVxuXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKVxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG5cbiAgICAgIHNldEV2ZW50cyhyZXN1bHQpXG4gICAgfVxuXG4gICAgZmV0Y2hFdmVudHMoKVxuICB9LCBbXSlcblxuICByZXR1cm4gbG9hZGluZyA/IDxMb2FkZXIgLz4gOiAoXG4gICAgPD5cbiAgICAgIDxBY2NvcmRpb24gaXRlbXM9e2V2ZW50cy5tYXAoZXZlbnQgPT4gKHtcbiAgICAgICAgY29udGVudDogPD5cbiAgICAgICAgICA8TGFiZWw+Qm9keTwvTGFiZWw+XG4gICAgICAgICAgPHByZT57SlNPTi5zdHJpbmdpZnkoZXZlbnQuZXZlbnQuYm9keSl9PC9wcmU+XG4gICAgICAgIDwvPixcbiAgICAgICAgdGl0bGU6IGV2ZW50LmV2ZW50LnBhdGgsXG4gICAgICAgIHRpdGxlSXRlbXM6IFtcbiAgICAgICAgICA8QmFkZ2U+e2V2ZW50LmV2ZW50Lmh0dHBNZXRob2R9PC9CYWRnZT4sXG4gICAgICAgIF0sXG4gICAgICB9KSl9IC8+XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuPE5hdlN0YXRlUHJvdmlkZXI+XG4gIDxNYWluQ29udGFpbmVyPlxuICA8TmF2UmVzcG9uc2l2ZSBvcHRpb25zPXtbXX0gLz5cbiAgICA8RmxleENvbnRhaW5lcj5cbiAgICAgIDxTZWNvbmRhcnlOYXZDb250YWluZXI+XG4gICAgICAgICAgPFNlY29uZGFyeU5hdj5cbiAgICAgICAgICAgIDxTZWNvbmRhcnlOYXZJdGVtXG4gICAgICAgICAgICAgIGFjdGl2ZVxuICAgICAgICAgICAgICBvbkNsaWNrPXtmdW5jdGlvbiBRYSgpe319XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFByb2ZpbGVyXG4gICAgICAgICAgICA8L1NlY29uZGFyeU5hdkl0ZW0+XG4gICAgICAgICAgICA8U2Vjb25kYXJ5TmF2SXRlbVxuICAgICAgICAgICAgICBvbkNsaWNrPXtmdW5jdGlvbiBRYSgpe319XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFJvdXRlc1xuICAgICAgICAgICAgPC9TZWNvbmRhcnlOYXZJdGVtPlxuICAgICAgICAgIDwvU2Vjb25kYXJ5TmF2PlxuICAgICAgICA8L1NlY29uZGFyeU5hdkNvbnRhaW5lcj5cbiAgICAgICAgPFBhZ2VDb250YWluZXI+XG4gICAgICAgICAgPFBhZ2VIZWFkZXIgcGFnZVRpdGxlPXt7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiAnUHJvZmlsZXInLFxuICAgICAgICAgICAgICBoYXNCb2xkVGV4dDogdHJ1ZVxuICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgPFByb2ZpbGVyIC8+XG5cbiAgICAgICAgPC9QYWdlQ29udGFpbmVyPlxuICAgIDwvRmxleENvbnRhaW5lcj5cbiAgPC9NYWluQ29udGFpbmVyPlxuPC9OYXZTdGF0ZVByb3ZpZGVyPlxuKVxuIl0sIm5hbWVzIjpbIkFjY29yZGlvbiIsIkJhZGdlIiwiRmxleENvbnRhaW5lciIsIkxhYmVsIiwiTG9hZGVyIiwiTWFpbkNvbnRhaW5lciIsIk5hdlJlc3BvbnNpdmUiLCJOYXZTdGF0ZVByb3ZpZGVyIiwiUGFnZUNvbnRhaW5lciIsIlBhZ2VIZWFkZXIiLCJTZWNvbmRhcnlOYXYiLCJTZWNvbmRhcnlOYXZDb250YWluZXIiLCJTZWNvbmRhcnlOYXZJdGVtIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlByb2ZpbGVyIiwiZXZlbnRzIiwic2V0RXZlbnRzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaEV2ZW50cyIsInJlc3BvbnNlIiwiZmV0Y2giLCJyZXN1bHQiLCJqc29uIiwiaXRlbXMiLCJtYXAiLCJldmVudCIsImNvbnRlbnQiLCJwcmUiLCJKU09OIiwic3RyaW5naWZ5IiwiYm9keSIsInRpdGxlIiwicGF0aCIsInRpdGxlSXRlbXMiLCJodHRwTWV0aG9kIiwib3B0aW9ucyIsImFjdGl2ZSIsIm9uQ2xpY2siLCJRYSIsInBhZ2VUaXRsZSIsImNoaWxkcmVuIiwiaGFzQm9sZFRleHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/profiler.tsx\n"));

/***/ })

});