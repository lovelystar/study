webpackHotUpdate("main",{

/***/ "./src/main/webapp/resources/js/saga/Saga.js":
/*!***************************************************!*\
  !*** ./src/main/webapp/resources/js/saga/Saga.js ***!
  \***************************************************/
/*! exports provided: studyWatch, resourceWatch, logoutWatch, regContentsWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"studyWatch\", function() { return studyWatch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resourceWatch\", function() { return resourceWatch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logoutWatch\", function() { return logoutWatch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"regContentsWatch\", function() { return regContentsWatch; });\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ \"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js\");\n/* harmony import */ var _reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/CreateActionReducer */ \"./src/main/webapp/resources/js/reducers/CreateActionReducer.js\");\n/* harmony import */ var _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/AxiosApi */ \"./src/main/webapp/resources/js/api/AxiosApi.js\");\nvar _marked =\n/*#__PURE__*/\nregeneratorRuntime.mark(studyWatch),\n    _marked2 =\n/*#__PURE__*/\nregeneratorRuntime.mark(resourceWatch),\n    _marked3 =\n/*#__PURE__*/\nregeneratorRuntime.mark(logoutWatch),\n    _marked4 =\n/*#__PURE__*/\nregeneratorRuntime.mark(regContentsWatch),\n    _marked5 =\n/*#__PURE__*/\nregeneratorRuntime.mark(studyAction),\n    _marked6 =\n/*#__PURE__*/\nregeneratorRuntime.mark(resourceAction),\n    _marked7 =\n/*#__PURE__*/\nregeneratorRuntime.mark(logoutAction),\n    _marked8 =\n/*#__PURE__*/\nregeneratorRuntime.mark(regContentsAction); // 어떤 동작은 promise payload를 리턴하고\n// 어떤 동작은 plain object를 리턴하는데\n// 어떤 동작은 dispatch로 다른 동작을 호출하고\n// 이러한 일관성 없는 동작들은 비효율 적이다.\n// 쉽게 말해서 saga란 어떠한 동작의 listener이다.\n// 즉, 항상 듣고있다가 맞으면 실행하기 때문에 이벤트 리스너라고 생각하면 된다.\n// 비동기 같이 단순하지 않은 작업들은 saga에 만들어둔다.\n// 누군가 발생시킨 action이 saga와 연결된 액션타입과 맞으면 실행.\n// 정리하자면 아래와 같다.\n// 액션에는 \"단순 리듀서와만 통신하는 액션\" 과 \"비동기 작업 ( 단순하지 않은 작업 )\" 이 있다.\n// 이 중 비동기 작업( API통신 )은 Saga에 작성한다.\n// Saga에 액션타입명과 작성한 제너레이터 함수를 연결하게 되는데\n// 이러면 액션을 계속 리스닝 하다가 일치하는 액션타입명이 발생할 때 해당 함수를 실행한다.\n// 이 때 fetching 비동기 액션이 있다면, 내부적으로 다시 단순히 Reducer에 받아온 data를 넣어주는\n// 단순히 Reducer와만 통신하는 액션이 함수 안에 있을 것이다.\n\n\n\n\n\n\nfunction studyWatch() {\n  return regeneratorRuntime.wrap(function studyWatch$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          _context.next = 2;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"takeLatest\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"clientServerRequest\"], studyAction);\n\n        case 2:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _marked);\n}\nfunction resourceWatch() {\n  return regeneratorRuntime.wrap(function resourceWatch$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          _context2.next = 2;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"takeLatest\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"requestResource\"], resourceAction);\n\n        case 2:\n        case \"end\":\n          return _context2.stop();\n      }\n    }\n  }, _marked2);\n}\nfunction logoutWatch() {\n  return regeneratorRuntime.wrap(function logoutWatch$(_context3) {\n    while (1) {\n      switch (_context3.prev = _context3.next) {\n        case 0:\n          _context3.next = 2;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"takeEvery\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"logout\"], logoutAction);\n\n        case 2:\n        case \"end\":\n          return _context3.stop();\n      }\n    }\n  }, _marked3);\n}\nfunction regContentsWatch() {\n  return regeneratorRuntime.wrap(function regContentsWatch$(_context4) {\n    while (1) {\n      switch (_context4.prev = _context4.next) {\n        case 0:\n          _context4.next = 2;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"takeLatest\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"regContents\"], regContentsAction);\n\n        case 2:\n        case \"end\":\n          return _context4.stop();\n      }\n    }\n  }, _marked4);\n} // study ( client ) _ 현재 프로젝트 서버 호출\n\nfunction studyAction(requestData, dispatch) {\n  var response, cookieToken;\n  return regeneratorRuntime.wrap(function studyAction$(_context5) {\n    while (1) {\n      switch (_context5.prev = _context5.next) {\n        case 0:\n          _context5.prev = 0;\n          _context5.next = 3;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"call\"])([_api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"], _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"].post], \"/client/cookie/token\", requestData.payload);\n\n        case 3:\n          response = _context5.sent;\n          _context5.next = 6;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"clinetServerReceived\"](response.data));\n\n        case 6:\n          cookieToken = _context5.sent;\n          _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosResource\"].defaults.headers.common[\"Authorization\"] = cookieToken.payload; // PUT = 액션을 호출\n\n          _context5.next = 10;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"requestResource\"](requestData));\n\n        case 10:\n          _context5.next = 16;\n          break;\n\n        case 12:\n          _context5.prev = 12;\n          _context5.t0 = _context5[\"catch\"](0);\n          _context5.next = 16;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"appError\"](_context5.t0));\n\n        case 16:\n        case \"end\":\n          return _context5.stop();\n      }\n    }\n  }, _marked5, null, [[0, 12]]);\n}\n\nfunction resourceAction(requestData) {\n  var authority, data;\n  return regeneratorRuntime.wrap(function resourceAction$(_context6) {\n    while (1) {\n      switch (_context6.prev = _context6.next) {\n        case 0:\n          _context6.prev = 0;\n          authority = requestData.payload.payload;\n          _context6.next = 4;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"call\"])([_api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosResource\"], _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosResource\"].post], \"/authenticated/authority\", authority);\n\n        case 4:\n          data = _context6.sent;\n          _context6.next = 7;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"receivedResourceSucceed\"](data));\n\n        case 7:\n          _context6.next = 13;\n          break;\n\n        case 9:\n          _context6.prev = 9;\n          _context6.t0 = _context6[\"catch\"](0);\n          _context6.next = 13;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"appError\"](_context6.t0));\n\n        case 13:\n        case \"end\":\n          return _context6.stop();\n      }\n    }\n  }, _marked6, null, [[0, 9]]);\n} // 로그아웃\n\n\nfunction logoutAction(objData) {\n  var logoutData;\n  return regeneratorRuntime.wrap(function logoutAction$(_context7) {\n    while (1) {\n      switch (_context7.prev = _context7.next) {\n        case 0:\n          _context7.prev = 0;\n          _context7.next = 3;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"call\"])([_api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"], _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"].post], \"/client/logout\", objData.payload);\n\n        case 3:\n          logoutData = _context7.sent;\n          _context7.next = 6;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"call\"])([_api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosAuth\"], _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosAuth\"].get], \"/logout\");\n\n        case 6:\n          _context7.next = 8;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"logoutSucceed\"]());\n\n        case 8:\n          window.location.reload();\n          _context7.next = 15;\n          break;\n\n        case 11:\n          _context7.prev = 11;\n          _context7.t0 = _context7[\"catch\"](0);\n          _context7.next = 15;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"appError\"](_context7.t0));\n\n        case 15:\n        case \"end\":\n          return _context7.stop();\n      }\n    }\n  }, _marked7, null, [[0, 11]]);\n} // 콘텐츠 업로드\n\n\nfunction regContentsAction(contentsArray) {\n  var testForm, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, testFormData, fdResult;\n\n  return regeneratorRuntime.wrap(function regContentsAction$(_context8) {\n    while (1) {\n      switch (_context8.prev = _context8.next) {\n        case 0:\n          _context8.prev = 0;\n          /*\r\n          const testForm = new FormData();\r\n          const fileParam = contentsArray.payload;\r\n          \r\n          // 동적 FormData일 때\r\n          const formDataArr = new Array;\r\n          \t\tconsole.log(\"fileParam = \" + fileParam);\r\n          console.log(\"fileParam length = \" + fileParam.length);\r\n          */\n\n          testForm = new FormData();\n          contentsArray.payload.map(function (params, i) {\n            console.log(\"i = \" + i);\n            testForm.append(\"randomName[]\", JSON.stringify(params.randomName));\n            testForm.append(\"files[]\", JSON.stringify(params.file));\n          });\n          console.log(\"testForm = \" + testForm);\n          _iteratorNormalCompletion = true;\n          _didIteratorError = false;\n          _iteratorError = undefined;\n          _context8.prev = 7;\n\n          for (_iterator = testForm[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            key = _step.value;\n            console.log(\"key = \" + key);\n          } // const formDataResult = yield call([axiosStudy, axiosStudy.post], \"/regcontents\", testForm);\n\n\n          _context8.next = 15;\n          break;\n\n        case 11:\n          _context8.prev = 11;\n          _context8.t0 = _context8[\"catch\"](7);\n          _didIteratorError = true;\n          _iteratorError = _context8.t0;\n\n        case 15:\n          _context8.prev = 15;\n          _context8.prev = 16;\n\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n\n        case 18:\n          _context8.prev = 18;\n\n          if (!_didIteratorError) {\n            _context8.next = 21;\n            break;\n          }\n\n          throw _iteratorError;\n\n        case 21:\n          return _context8.finish(18);\n\n        case 22:\n          return _context8.finish(15);\n\n        case 23:\n          testFormData = new FormData();\n          testFormData.append(\"fileName\", \"value1\");\n          testFormData.append(\"fileUnit\", \"value2\");\n          testFormData.append(\"randomName\", \"value3\");\n          _context8.next = 29;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"call\"])([_api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"], _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"].post, _api_AxiosApi__WEBPACK_IMPORTED_MODULE_3__[\"axiosStudy\"].headers = {\n            \"Content-Type\": \"multipart/form-data\"\n          }], \"/formdata\", testFormData);\n\n        case 29:\n          fdResult = _context8.sent;\n          _context8.next = 36;\n          break;\n\n        case 32:\n          _context8.prev = 32;\n          _context8.t1 = _context8[\"catch\"](0);\n          _context8.next = 36;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__[\"put\"])(_reducers_CreateActionReducer__WEBPACK_IMPORTED_MODULE_2__[\"appError\"](_context8.t1));\n\n        case 36:\n        case \"end\":\n          return _context8.stop();\n      }\n    }\n  }, _marked8, null, [[0, 32], [7, 11, 15, 23], [16,, 18, 22]]);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvcmVzb3VyY2VzL2pzL3NhZ2EvU2FnYS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluL3dlYmFwcC9yZXNvdXJjZXMvanMvc2FnYS9TYWdhLmpzP2E2NjgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8g7Ja065akIOuPmeyekeydgCBwcm9taXNlIHBheWxvYWTrpbwg66as7YS07ZWY6rOgXHJcbi8vIOyWtOuWpCDrj5nsnpHsnYAgcGxhaW4gb2JqZWN066W8IOumrO2EtO2VmOuKlOuNsFxyXG4vLyDslrTrlqQg64+Z7J6R7J2AIGRpc3BhdGNo66GcIOuLpOuluCDrj5nsnpHsnYQg7Zi47Lac7ZWY6rOgXHJcbi8vIOydtOufrO2VnCDsnbzqtIDshLEg7JeG64qUIOuPmeyekeuTpOydgCDruYTtmqjsnKgg7KCB7J2064ukLlxyXG5cclxuLy8g7Im96rKMIOunkO2VtOyEnCBzYWdh656AIOyWtOuWoO2VnCDrj5nsnpHsnZggbGlzdGVuZXLsnbTri6QuXHJcbi8vIOymiSwg7ZWt7IOBIOuTo+qzoOyeiOuLpOqwgCDrp57snLzrqbQg7Iuk7ZaJ7ZWY6riwIOuVjOusuOyXkCDsnbTrsqTtirgg66as7Iqk64SI65286rOgIOyDneqwge2VmOuptCDrkJzri6QuXHJcblxyXG4vLyDruYTrj5nquLAg6rCZ7J20IOuLqOyInO2VmOyngCDslYrsnYAg7J6R7JeF65Ok7J2AIHNhZ2Hsl5Ag66eM65Ok7Ja065GU64ukLlxyXG4vLyDriITqtbDqsIAg67Cc7IOd7Iuc7YKoIGFjdGlvbuydtCBzYWdh7JmAIOyXsOqysOuQnCDslaHshZjtg4DsnoXqs7wg66ee7Jy866m0IOyLpO2WiS5cclxuXHJcbi8vIOygleumrO2VmOyekOuptCDslYTrnpjsmYAg6rCZ64ukLlxyXG4vLyDslaHshZjsl5DripQgXCLri6jsiJwg66as65OA7ISc7JmA66eMIO2GteyLoO2VmOuKlCDslaHshZhcIiDqs7wgXCLruYTrj5nquLAg7J6R7JeFICgg64uo7Iic7ZWY7KeAIOyViuydgCDsnpHsl4UgKVwiIOydtCDsnojri6QuXHJcbi8vIOydtCDspJEg67mE64+Z6riwIOyekeyXhSggQVBJ7Ya17IugICnsnYAgU2FnYeyXkCDsnpHshLHtlZzri6QuXHJcbi8vIFNhZ2Hsl5Ag7JWh7IWY7YOA7J6F66qF6rO8IOyekeyEse2VnCDsoJzrhIjroIjsnbTthLAg7ZWo7IiY66W8IOyXsOqysO2VmOqyjCDrkJjripTrjbBcclxuLy8g7J2065+s66m0IOyVoeyFmOydhCDqs4Tsho0g66as7Iqk64udIO2VmOuLpOqwgCDsnbzsuZjtlZjripQg7JWh7IWY7YOA7J6F66qF7J20IOuwnOyDne2VoCDrlYwg7ZW064u5IO2VqOyImOulvCDsi6TtlontlZzri6QuXHJcblxyXG4vLyDsnbQg65WMIGZldGNoaW5nIOu5hOuPmeq4sCDslaHshZjsnbQg7J6I64uk66m0LCDrgrTrtoDsoIHsnLzroZwg64uk7IucIOuLqOyInO2eiCBSZWR1Y2Vy7JeQIOuwm+yVhOyYqCBkYXRh66W8IOuEo+yWtOyjvOuKlFxyXG4vLyDri6jsiJztnoggUmVkdWNlcuyZgOunjCDthrXsi6DtlZjripQg7JWh7IWY7J20IO2VqOyImCDslYjsl5Ag7J6I7J2EIOqyg+ydtOuLpC5cclxuXHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgeyBkZWxheSwgY2FsbCwgcHV0LCBhbGwsIHNlbGVjdCwgdGFrZSwgdGFrZUV2ZXJ5LCB0YWtlTGF0ZXN0IH0gZnJvbSBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiO1xyXG5pbXBvcnQgKiBhcyBjcmVhdGVBY3Rpb25SZWR1Y2VyIGZyb20gXCIuLi9yZWR1Y2Vycy9DcmVhdGVBY3Rpb25SZWR1Y2VyXCI7XHJcbmltcG9ydCB7IGF4aW9zU3R1ZHksIGF4aW9zQXV0aCwgYXhpb3NSZXNvdXJjZSB9IGZyb20gXCIuLi9hcGkvQXhpb3NBcGlcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogc3R1ZHlXYXRjaCgpIHtcclxuXHR5aWVsZCB0YWtlTGF0ZXN0KGNyZWF0ZUFjdGlvblJlZHVjZXIuY2xpZW50U2VydmVyUmVxdWVzdCwgc3R1ZHlBY3Rpb24pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHJlc291cmNlV2F0Y2goKSB7XHJcblx0Ly8gdGFrZUxhdGVzdCA9IOyVoeyFmCDtmLjstpwg7Iuc7JeQIOqwmeydgCDslaHshZjsnbQg7Iuk7ZaJIOykkeydtOuptCDqt7gg7JWh7IWY7J2AIO2MjOq4sOuQmOqzoCwg66eI7KeA66eJIO2YuOy2nOunjCDsi6TtlolcclxuXHQvLyBQT1NULCBQVVQsIERFTEVURSDqsJnsnYAg66as7IaM7IqkIOuzgOqyvSDrqZTshozrk5zsl5Ag7J207JqpXHJcblx0eWllbGQgdGFrZUxhdGVzdChjcmVhdGVBY3Rpb25SZWR1Y2VyLnJlcXVlc3RSZXNvdXJjZSwgcmVzb3VyY2VBY3Rpb24pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIGxvZ291dFdhdGNoKCkge1xyXG5cdC8vIHRha2VFdmVyeSA9IOuqqOuToCDslaHshZjsi5zrp4jri6Qg7Iuk7ZaJ65Cc64ukLlxyXG5cdC8vIEdFVCDrqZTshozrk5zsl5Ag7J207JqpXHJcblx0eWllbGQgdGFrZUV2ZXJ5KGNyZWF0ZUFjdGlvblJlZHVjZXIubG9nb3V0LCBsb2dvdXRBY3Rpb24pO1xyXG4vL1x0eWllbGQgdGFrZUxhdGVzdChjcmVhdGVBY3Rpb25SZWR1Y2VyLmxvZ291dFN1Y2NlZWQsIGxvZ291dFN1Y2Nlc3MpO1xyXG5cdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHJlZ0NvbnRlbnRzV2F0Y2goKSB7XHJcblx0eWllbGQgdGFrZUxhdGVzdChjcmVhdGVBY3Rpb25SZWR1Y2VyLnJlZ0NvbnRlbnRzLCByZWdDb250ZW50c0FjdGlvbik7XHJcbn1cclxuXHJcbi8vIHN0dWR5ICggY2xpZW50ICkgXyDtmITsnqwg7ZSE66Gc7KCd7Yq4IOyEnOuyhCDtmLjstpxcclxuZnVuY3Rpb24qIHN0dWR5QWN0aW9uKHJlcXVlc3REYXRhLCBkaXNwYXRjaCkge1xyXG5cclxuXHR0cnl7XHJcblxyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSB5aWVsZCBjYWxsKFtheGlvc1N0dWR5LCBheGlvc1N0dWR5LnBvc3RdLCBcIi9jbGllbnQvY29va2llL3Rva2VuXCIsIHJlcXVlc3REYXRhLnBheWxvYWQpO1xyXG5cdFx0Y29uc3QgY29va2llVG9rZW4gPSB5aWVsZCBwdXQoY3JlYXRlQWN0aW9uUmVkdWNlci5jbGluZXRTZXJ2ZXJSZWNlaXZlZChyZXNwb25zZS5kYXRhKSk7XHJcblx0XHRcclxuXHRcdGF4aW9zUmVzb3VyY2UuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bXCJBdXRob3JpemF0aW9uXCJdID0gY29va2llVG9rZW4ucGF5bG9hZDtcclxuXHRcdFxyXG5cdFx0Ly8gUFVUID0g7JWh7IWY7J2EIO2YuOy2nFxyXG5cdFx0eWllbGQgcHV0KGNyZWF0ZUFjdGlvblJlZHVjZXIucmVxdWVzdFJlc291cmNlKHJlcXVlc3REYXRhKSk7XHJcblx0XHRcclxuXHR9IGNhdGNoKGVycm9yKSB7XHJcblx0XHRcclxuXHRcdHlpZWxkIHB1dChjcmVhdGVBY3Rpb25SZWR1Y2VyLmFwcEVycm9yKGVycm9yKSk7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbmZ1bmN0aW9uKiByZXNvdXJjZUFjdGlvbihyZXF1ZXN0RGF0YSkge1xyXG5cdFxyXG5cdHRyeXtcclxuXHRcdFxyXG5cdFx0Y29uc3QgYXV0aG9yaXR5ID0gcmVxdWVzdERhdGEucGF5bG9hZC5wYXlsb2FkO1xyXG5cdFx0Y29uc3QgZGF0YSA9IHlpZWxkIGNhbGwoW2F4aW9zUmVzb3VyY2UsIGF4aW9zUmVzb3VyY2UucG9zdF0sIFwiL2F1dGhlbnRpY2F0ZWQvYXV0aG9yaXR5XCIsIGF1dGhvcml0eSk7XHJcbi8vXHRcdGNvbnN0IGRhdGEgPSB5aWVsZCBjYWxsKFtheGlvc1Jlc291cmNlLCBheGlvc1Jlc291cmNlLnBvc3RdLCBcIi9hdXRoZW50aWNhdGVkL3VzZXJuYW1lXCIsIGF1dGhvcml0eSk7XHJcblx0XHRcclxuXHRcdHlpZWxkIHB1dChjcmVhdGVBY3Rpb25SZWR1Y2VyLnJlY2VpdmVkUmVzb3VyY2VTdWNjZWVkKGRhdGEpKTtcclxuXHRcdFxyXG5cdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFxyXG5cdFx0eWllbGQgcHV0KGNyZWF0ZUFjdGlvblJlZHVjZXIuYXBwRXJyb3IoZXJyb3IpKTtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLy8g66Gc6re47JWE7JuDXHJcbmZ1bmN0aW9uKiBsb2dvdXRBY3Rpb24ob2JqRGF0YSkge1xyXG5cdFxyXG5cdHRyeXtcclxuXHRcdFxyXG5cdFx0Y29uc3QgbG9nb3V0RGF0YSA9IHlpZWxkIGNhbGwoW2F4aW9zU3R1ZHksIGF4aW9zU3R1ZHkucG9zdF0sIFwiL2NsaWVudC9sb2dvdXRcIiwgb2JqRGF0YS5wYXlsb2FkKTtcclxuXHRcdHlpZWxkIGNhbGwoW2F4aW9zQXV0aCwgYXhpb3NBdXRoLmdldF0sIFwiL2xvZ291dFwiKTtcclxuXHRcdFxyXG5cdFx0eWllbGQgcHV0KGNyZWF0ZUFjdGlvblJlZHVjZXIubG9nb3V0U3VjY2VlZCgpKTtcclxuXHRcdFxyXG5cdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHJcblx0fSBjYXRjaChlcnJvcikge1xyXG5cdFx0XHJcblx0XHR5aWVsZCBwdXQoY3JlYXRlQWN0aW9uUmVkdWNlci5hcHBFcnJvcihlcnJvcikpO1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5cclxuXHJcbi8vIOy9mO2FkOy4oCDsl4XroZzrk5xcclxuZnVuY3Rpb24qIHJlZ0NvbnRlbnRzQWN0aW9uKGNvbnRlbnRzQXJyYXkpIHtcclxuXHRcclxuXHR0cnl7XHJcblx0XHQvKlxyXG5cdFx0Y29uc3QgdGVzdEZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuXHRcdGNvbnN0IGZpbGVQYXJhbSA9IGNvbnRlbnRzQXJyYXkucGF5bG9hZDtcclxuXHRcdFxyXG5cdFx0Ly8g64+Z7KCBIEZvcm1EYXRh7J28IOuVjFxyXG5cdFx0Y29uc3QgZm9ybURhdGFBcnIgPSBuZXcgQXJyYXk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJmaWxlUGFyYW0gPSBcIiArIGZpbGVQYXJhbSk7XHJcblx0XHRjb25zb2xlLmxvZyhcImZpbGVQYXJhbSBsZW5ndGggPSBcIiArIGZpbGVQYXJhbS5sZW5ndGgpO1xyXG5cdFx0Ki9cclxuXHJcblx0XHRjb25zdCB0ZXN0Rm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Y29udGVudHNBcnJheS5wYXlsb2FkLm1hcCgocGFyYW1zLCBpKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhcImkgPSBcIiArIGkpO1xyXG5cdFx0XHR0ZXN0Rm9ybS5hcHBlbmQoXCJyYW5kb21OYW1lW11cIiwgSlNPTi5zdHJpbmdpZnkocGFyYW1zLnJhbmRvbU5hbWUpKTtcclxuXHRcdFx0dGVzdEZvcm0uYXBwZW5kKFwiZmlsZXNbXVwiLCBKU09OLnN0cmluZ2lmeShwYXJhbXMuZmlsZSkpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwidGVzdEZvcm0gPSBcIiArIHRlc3RGb3JtKTtcclxuXHRcdGZvcihsZXQga2V5IG9mIHRlc3RGb3JtKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJrZXkgPSBcIiArIGtleSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY29uc3QgZm9ybURhdGFSZXN1bHQgPSB5aWVsZCBjYWxsKFtheGlvc1N0dWR5LCBheGlvc1N0dWR5LnBvc3RdLCBcIi9yZWdjb250ZW50c1wiLCB0ZXN0Rm9ybSk7XHJcblxyXG5cdFx0bGV0IHRlc3RGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0dGVzdEZvcm1EYXRhLmFwcGVuZChcImZpbGVOYW1lXCIsIFwidmFsdWUxXCIpO1xyXG5cdFx0dGVzdEZvcm1EYXRhLmFwcGVuZChcImZpbGVVbml0XCIsIFwidmFsdWUyXCIpO1xyXG5cdFx0dGVzdEZvcm1EYXRhLmFwcGVuZChcInJhbmRvbU5hbWVcIiwgXCJ2YWx1ZTNcIik7XHJcblxyXG5cdFx0Y29uc3QgZmRSZXN1bHQgPSB5aWVsZCBjYWxsKFtheGlvc1N0dWR5LCBheGlvc1N0dWR5LnBvc3QsIGF4aW9zU3R1ZHkuaGVhZGVycz17XCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJ9XSwgXCIvZm9ybWRhdGFcIiwgdGVzdEZvcm1EYXRhKTtcclxuXHJcblxyXG5cdH0gY2F0Y2goZXJyb3IpIHtcclxuXHRcdFxyXG5cdFx0eWllbGQgcHV0KGNyZWF0ZUFjdGlvblJlZHVjZXIuYXBwRXJyb3IoZXJyb3IpKTtcclxuXHRcdFxyXG5cdH1cclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBeUJBOzs7QUFJQTs7O0FBTUE7OztBQVFBOzs7QUFLQTs7O0FBb0JBOzs7QUFtQkE7OztBQXNCQTtBQTVHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUxBO0FBSUE7QUFKQTtBQUtBO0FBQ0E7QUFOQTtBQUtBO0FBRUE7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQVhBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFjQTtBQUNBO0FBZkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQW1CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFLQTtBQUxBO0FBUUE7QUFDQTtBQVRBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBTEE7QUFJQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBQUE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQVRBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBYUE7QUFDQTtBQWRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFCQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQXZCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBdUJBO0FBQUE7QUFDQTtBQXpCQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQThCQTtBQUNBO0FBQ0E7QUFDQTtBQWpDQTtBQW1DQTtBQUFBO0FBQUE7QUFDQTtBQXBDQTtBQW1DQTtBQW5DQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQXdDQTtBQUNBO0FBekNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/resources/js/saga/Saga.js\n");

/***/ })

})