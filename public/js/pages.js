/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client-js/pages.js":
/*!****************************!*\
  !*** ./client-js/pages.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("window.require = __webpack_require__(\"./client-js sync recursive\")\n// window.jQuery = window.$ = require('jquery')\n// const recaptchaSetup = require('webhandle-emailer/client-js/make-form-recaptcha')\n\n\nvar tri = __webpack_require__(/*! tripartite */ \"./node_modules/tripartite/tripartite.js\")\nvar tripartite = tri\n\nif (window.recaptchaId && document.querySelectorAll('form.google-recaptcha-form').length > 0) {\n\trecaptchaSetup(window.recaptchaId)\n}\n\n/*\nconst SwipeListener = require('swipe-listener')\nconst Shiner = require('shiner/shiner-no-jquery')($)\nwindow.Shiner = Shiner\nlet createShows = require('shiner/create-shows')\n*/\n\n/*\n\tcreateShows(Shiner, SwipeListener ).forEach(shine => shine.shineOn())\n*/\n/*\n\trequire('./enable-remote-logging')\n*/\n\nlet tribar = document.querySelector('header .tribar')\nif(tribar) {\n\ttribar.addEventListener('click', function (evt) {\n\t\tevt.preventDefault()\n\t\tdocument.querySelector('header nav').classList.toggle('open')\n\t\tdocument.querySelector('body').classList.toggle('locked');\n\t})\n}\n\n\n\n//# sourceURL=webpack://ck-widget-starter/./client-js/pages.js?");

/***/ }),

/***/ "./client-js sync recursive":
/*!*************************!*\
  !*** ./client-js/ sync ***!
  \*************************/
/***/ ((module) => {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"./client-js sync recursive\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://ck-widget-starter/./client-js/_sync?");

/***/ }),

/***/ "./node_modules/tripartite/active-element.js":
/*!***************************************************!*\
  !*** ./node_modules/tripartite/active-element.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\nconst defaultTemplateName = 'defaultTemplate'\n\nclass ActiveElement {\n\tconstructor(conditionalExpression, dataExpression, handlingExpression, tripartite) {\n\t\tthis.conditionalExpression = conditionalExpression\n\t\tthis.dataExpression = dataExpression\n\t\tthis.handlingExpression = handlingExpression || defaultTemplateName\n\t\tthis.tripartite = tripartite\n\t}\n}\n\nmodule.exports = ActiveElement\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/active-element.js?");

/***/ }),

/***/ "./node_modules/tripartite/calculate-relative-path.js":
/*!************************************************************!*\
  !*** ./node_modules/tripartite/calculate-relative-path.js ***!
  \************************************************************/
/***/ ((module) => {

eval("var calculateRelativePath = function(parentPath, currentPath) {\n\tif(!parentPath) {\n\t\treturn currentPath\n\t}\n\tif(!currentPath) {\n\t\treturn currentPath\n\t}\n\t\n\tif(currentPath.indexOf('../') != 0 && currentPath.indexOf('./') != 0) {\n\t\treturn currentPath\n\t}\n\t\n\tvar pparts = parentPath.split('/')\n\tvar cparts = currentPath.split('/')\n\t\n\t// trim any starting blank sections\n\twhile(pparts.length && !pparts[0]) {\n\t\tpparts.shift()\n\t}\n\twhile(cparts.length && !cparts[0]) {\n\t\tcparts.shift()\n\t}\n\t\n\tif(currentPath.indexOf('../') == 0 ) {\n\t\twhile(cparts.length && cparts[0] == '..') {\n\t\t\tpparts.pop()\n\t\t\tcparts.shift()\n\t\t}\n\t\tpparts.pop()\n\t\t\n\t\twhile(cparts.length) {\n\t\t\tpparts.push(cparts.shift())\n\t\t}\n\t\treturn pparts.join('/')\n\t}\n\tif(currentPath.indexOf('./') == 0 ) {\n\t\tcparts.shift()\n\t\tpparts.pop()\n\t\twhile(cparts.length) {\n\t\t\tpparts.push(cparts.shift())\n\t\t}\n\t\treturn pparts.join('/')\n\t}\n\t\n\treturn currentPath\n}\n\nmodule.exports = calculateRelativePath\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/calculate-relative-path.js?");

/***/ }),

/***/ "./node_modules/tripartite/evaluate-in-context.js":
/*!********************************************************!*\
  !*** ./node_modules/tripartite/evaluate-in-context.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst resolveDataPath = __webpack_require__(/*! ./resolve-data-path */ \"./node_modules/tripartite/resolve-data-path.js\")\nfunction evaluateInContext(context, expression, dataFunctions, globalData) {\n\tif (!expression) {\n\t\treturn null\n\t}\n\tif (typeof expression === 'string') {\n\t\texpression = expression.trim()\n\t}\n\n\tif (expression === '$this' || expression === 'this') {\n\t\treturn context\n\t}\n\tif (typeof context === 'object' && expression in context) {\n\t\treturn context[expression]\n\t}\n\tif (expression === '\"\"' || expression === \"''\") {\n\t\treturn ''\n\t}\n\tlet resolved = resolveDataPath(context, expression)\n\tif (resolved === null || resolved === undefined) {\n\t\tresolved = resolveDataPath({\n\t\t\t'$globals': globalData\n\t\t}, expression)\n\t}\n\tif (resolved === null || resolved === undefined) {\n\t\tresolved = _evaluateInContext.call(context, context, expression, dataFunctions, globalData)\n\t}\n\treturn resolved\n}\n\nlet evalFunction = new Function('additionalContexts',\n\t`with ({\n\t\t'$globals': additionalContexts.globalData\n\t}) {\n\t\twith (additionalContexts.dataFunctions) {\n\t\t\twith (additionalContexts.context) {\n\t\t\t\ttry {\n\t\t\t\t\treturn eval(additionalContexts.expression);\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn null;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}`\n)\n\nfunction _evaluateInContext(context, expression, dataFunctions, globalData) {\n\tdataFunctions = dataFunctions || {}\n\tglobalData = globalData || {}\n\n\n\tlet result = evalFunction.call(this, {\n\t\tglobalData: globalData\n\t\t, dataFunctions: dataFunctions\n\t\t, context: context\n\t\t, expression: expression\n\t})\n\treturn result\n}\n\nmodule.exports = evaluateInContext\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/evaluate-in-context.js?");

/***/ }),

/***/ "./node_modules/tripartite/execution-context.js":
/*!******************************************************!*\
  !*** ./node_modules/tripartite/execution-context.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nlet ActiveElement = __webpack_require__(/*! ./active-element */ \"./node_modules/tripartite/active-element.js\")\nvar calculateRelativePath = __webpack_require__(/*! ./calculate-relative-path */ \"./node_modules/tripartite/calculate-relative-path.js\")\nlet evaluateInContext = __webpack_require__(/*! ./evaluate-in-context */ \"./node_modules/tripartite/evaluate-in-context.js\")\n\nclass ExecutionContext {\n\t/**\n\t * \n\t * @param {Tripartite} tripartite \n\t * @param {function} template \n\t * @param {stream} [destination]\n\t */\n\tconstructor(tripartite, template, data = {}, destination = '', dataFunctions = {}) {\n\t\tthis.tripartite = tripartite\n\t\tthis.template = template\n\t\tthis.destination = destination\n\t\tthis.initialData = data\n\t\tthis.currentData = []\n\t\tthis.dataFunctions = dataFunctions\n\t\tthis.continueOnTripartiteError = true\n\t\t\n\t\t// Sometimes large pages have so many elements that we exceed\n\t\t// the maximum call depth. This happens when we have a lot of elements all being\n\t\t// rendered by the same templates. That is, there's no async callback when a template\n\t\t// is loaded, only instant callbacks.\n\t\t// The downside to doing very frequent async calls is that it takes a lot longer to\n\t\t// to get called from a setTimeout than it does to call directly. We want ot keep\n\t\t// the time between needing to do that reasonably long. Unfortunately, there's no\n\t\t// easy/fast way to detect the call stack depth, so we rely on this proxy.\n\t\tthis.callCount = 0\n\t\tthis.callDepthLimit = 1000\n\t}\n\n\t/**\n\t * \n\t * @param {function} [callback] called when done\n\t * @returns Returns the string of stream as the result of the operation\n\t */\n\trun(callback) {\n\t\tlet ourCallback\n\t\tif (callback) {\n\t\t\tourCallback = () => {\n\t\t\t\tcallback(null, this.destination)\n\t\t\t}\n\t\t}\n\n\t\tthis._run(this.template, this.initialData, ourCallback)\n\n\t\treturn this.destination\n\t}\n\n\t_resolveHandlingExpression(template, handlingExpression, data) {\n\t\tif (!handlingExpression) {\n\t\t\thandlingExpression = defaultTemplateName\n\t\t}\n\t\tif (handlingExpression.charAt(0) == '$') {\n\t\t\t// Indicates the handling espression is not a literal template name but is a string which should\n\t\t\t// be evaluated to determine the template name\n\t\t\thandlingExpression = evaluateInContext(data, handlingExpression.substring(1), this.dataFunctions, this.initialData)\n\t\t}\n\t\t// resolve relative template paths\n\t\tif (handlingExpression.indexOf('./') == 0 || handlingExpression.indexOf('../') == 0) {\n\t\t\thandlingExpression = calculateRelativePath(template.templateMeta.name, handlingExpression)\n\t\t}\n\n\t\treturn handlingExpression\n\t}\n\n\t_run(template, data, callback) {\n\t\tlet parts = [...template.parts].reverse()\n\t\tconst processParts = () => {\n\t\t\t\n\t\t\t// check to see how far down in the call stack we are. If too far down,\n\t\t\t// come back in the next tick.\n\t\t\tthis.callCount++\n\t\t\tif(this.callCount++ > this.callDepthLimit) {\n\t\t\t\tsetTimeout(()=> {\n\t\t\t\t\tthis.callCount = 0\n\t\t\t\t\tprocessParts()\n\t\t\t\t})\n\t\t\t\treturn\n\t\t\t}\n\n\t\t\tif (parts.length > 0) {\n\t\t\t\tlet part = parts.pop()\n\t\t\t\tif (typeof part === 'string') {\n\t\t\t\t\tthis.output(part)\n\t\t\t\t\tprocessParts()\n\t\t\t\t}\n\t\t\t\telse if (part instanceof ActiveElement) {\n\t\t\t\t\tlet conditional = part.conditionalExpression || part.dataExpression\n\t\t\t\t\tlet conditionalResult = false\n\t\t\t\t\tlet resultData\n\t\t\t\t\tif (conditional == null || conditional == undefined || conditional === '') {\n\t\t\t\t\t\t// Because if they didn't specify a condition or data, they probably \n\t\t\t\t\t\t// just want the template to be run as is\n\t\t\t\t\t\tconditionalResult = true\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tif(part.conditionalExpression) {\n\t\t\t\t\t\t\tlet result = evaluateInContext(data, part.conditionalExpression, this.dataFunctions, this.initialData)\n\t\t\t\t\t\t\tif (result) {\n\t\t\t\t\t\t\t\tconditionalResult = true\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t// This means we're evaluating the data expression to see if we should run the template\n\t\t\t\t\t\t\tresultData = evaluateInContext(data, part.dataExpression, this.dataFunctions, this.initialData)\n\t\t\t\t\t\t\tif(resultData === null || resultData === undefined) {\n\t\t\t\t\t\t\t\tconditionalResult = false\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (typeof resultData === 'number') {\n\t\t\t\t\t\t\t\t// if the result is a number, any number, we want to output it\n\t\t\t\t\t\t\t\t// unless the number is from the conditional expression, in which\n\t\t\t\t\t\t\t\t// case we want to evaluate it as truthy\n\t\t\t\t\t\t\t\tconditionalResult = true\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if(Array.isArray(resultData) && resultData.length > 0) {\n\t\t\t\t\t\t\t\tconditionalResult = true\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if(resultData) {\n\t\t\t\t\t\t\t\tconditionalResult = true\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (conditionalResult) {\n\t\t\t\t\t\tif (part.dataExpression && resultData === undefined) {\n\t\t\t\t\t\t\tresultData = evaluateInContext(data, part.dataExpression, this.dataFunctions, this.initialData)\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif((resultData === null || resultData === undefined) && !part.dataExpression) {\n\t\t\t\t\t\t\tresultData = data\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tlet handlingExpression = this._resolveHandlingExpression(template, part.handlingExpression, data)\n\t\t\t\t\t\tlet handlingTemplate\n\t\t\t\t\t\tlet children = (Array.isArray(resultData) ? [...resultData] : [resultData]).reverse()\n\t\t\t\t\t\tconst applyTemplate = () => {\n\t\t\t\t\t\t\tif (children.length > 0) {\n\t\t\t\t\t\t\t\tlet child = children.pop()\n\t\t\t\t\t\t\t\tthis._run(handlingTemplate, child, () => {\n\t\t\t\t\t\t\t\t\tapplyTemplate()\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif(handlingExpression in this.tripartite.templates) {\n\t\t\t\t\t\t\thandlingTemplate = this.tripartite.getTemplate(handlingExpression)\n\t\t\t\t\t\t\tif (handlingTemplate) {\n\t\t\t\t\t\t\t\tapplyTemplate()\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t// the template has been loaded before but is empty\n\t\t\t\t\t\t\t\tif (this.continueOnTripartiteError) {\n\t\t\t\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tthis.tripartite.loadTemplate(handlingExpression, (template) => {\n\t\t\t\t\t\t\t\tif (!template) {\n\t\t\t\t\t\t\t\t\tlet msg = 'Could not load template: ' + handlingExpression\n\t\t\t\t\t\t\t\t\tconsole.error(msg)\n\t\t\t\t\t\t\t\t\tif (this.continueOnTripartiteError) {\n\t\t\t\t\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\t\tlet err = new Error(msg)\n\t\t\t\t\t\t\t\t\t\tif (callback) {\n\t\t\t\t\t\t\t\t\t\t\tcallback(err)\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\t\t\tthrow err\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\thandlingTemplate = template\n\t\t\t\t\t\t\t\t\tapplyTemplate()\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse if (typeof part === 'function') {\n\t\t\t\t\tif(part.write) {\n\t\t\t\t\t\tpart.write(data, this.destination, () => {\n\t\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t\t})\n\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tthis.output(part(data))\n\t\t\t\t\t\tprocessParts()\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t}\n\t\t\telse {\n\t\t\t\tif (callback) {\n\t\t\t\t\tcallback()\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tprocessParts()\n\t}\n\n\t/**\n\t * \n\t * @param {string} value \n\t */\n\toutput(value) {\n\t\tif(value === null || value === undefined) {\n\t\t\treturn\n\t\t}\n\t\tif (typeof this.destination === 'string') {\n\t\t\tthis.destination += value\n\t\t}\n\t\telse if (this.destination.write) {\n\t\t\tthis.destination.write(value)\n\t\t}\n\t}\n}\n\n\nmodule.exports = ExecutionContext\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/execution-context.js?");

/***/ }),

/***/ "./node_modules/tripartite/resolve-data-path.js":
/*!******************************************************!*\
  !*** ./node_modules/tripartite/resolve-data-path.js ***!
  \******************************************************/
/***/ ((module) => {

eval("/*\nfunction resolveDataPath(data, path) {\n\tif(data === null || data === undefined) {\n\t\treturn data\n\t}\n\tlet parts\n\tif(typeof path === 'string') {\n\t\tparts = path.trim().split('.')\n\t}\n\telse if(Array.isArray(path)) {\n\t\tparts = path\n\t}\n\t\n\tlet name = parts.shift()\n\tif(name.indexOf(' ') > -1) {\n\t\t// there's a space, which means it's really unlikely it's a property\n\t\treturn null\n\t}\n\tlet child\n\tif(name === 'this' || name === '$this') {\n\t\tchild = data\n\t}\n\telse if(typeof data === 'object') {\n\t\tif(name in data) {\n\t\t\tchild = data[name]\n\t\t}\n\t}\n\tif(parts.length > 0) {\n\t\treturn resolveDataPath(child, parts)\n\t}\n\telse {\n\t\treturn child\n\t}\n} */\nfunction resolveDataPath(data, path) {\n\ttry {\n\t\tif (data === null || data === undefined) {\n\t\t\treturn data\n\t\t}\n\t\tlet parts\n\t\tif (typeof path === 'string') {\n\t\t\tparts = path.trim().split('.')\n\t\t}\n\t\telse if (Array.isArray(path)) {\n\t\t\tparts = path\n\t\t}\n\n\t\twhile (parts.length > 0) {\n\t\t\tlet name = parts.shift()\n\t\t\tif (name.indexOf(' ') > -1) {\n\t\t\t\t// there's a space, which means it's really unlikely it's a property\n\t\t\t\treturn null\n\t\t\t}\n\t\t\tlet child\n\t\t\tif (name === 'this' || name === '$this') {\n\t\t\t\tchild = data\n\t\t\t}\n\t\t\telse if (typeof data === 'object') {\n\t\t\t\tif (name in data) {\n\t\t\t\t\tchild = data[name]\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (parts.length == 0) {\n\t\t\t\treturn child\n\t\t\t}\n\t\t\tif (child === null || child === undefined) {\n\t\t\t\treturn null\n\t\t\t}\n\t\t\tdata = child\n\t\t}\n\t}\n\tcatch (e) {\n\t\treturn null\n\t}\n}\n\nmodule.exports = resolveDataPath\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/resolve-data-path.js?");

/***/ }),

/***/ "./node_modules/tripartite/tripartite.js":
/*!***********************************************!*\
  !*** ./node_modules/tripartite/tripartite.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n\nif (typeof String.prototype.trim !== 'function') {\n\tString.prototype.trim = function () {\n\t\treturn this.replace(/^\\s+|\\s+$/g, '');\n\t}\n}\n\n\nfunction isStream(stream) {\n\treturn stream !== null\n\t\t&& typeof stream === 'object'\n\t\t&& typeof stream.pipe === 'function';\n}\n\n\nfunction isTemplate(obj) {\n\tif (!obj) {\n\t\treturn false\n\t}\n\tif (typeof obj !== 'function') {\n\t\treturn false\n\t}\n\tif (!obj.write) {\n\t\treturn false\n\t}\n\tif (!obj.parts) {\n\t\treturn false\n\t}\n\tif (!obj.templateMeta) {\n\t\treturn false\n\t}\n\n\treturn true\n}\n\nlet ExecutionContext = __webpack_require__(/*! ./execution-context */ \"./node_modules/tripartite/execution-context.js\")\nlet ActiveElement = __webpack_require__(/*! ./active-element */ \"./node_modules/tripartite/active-element.js\")\n\n\nclass Tripartite {\n\tconstructor(options = {}) {\n\t\tthis.templates = {\n\t\t\tdefaultTemplate: this._makeTemplate(function (thedata) {\n\t\t\t\treturn '' + thedata;\n\t\t\t})\n\t\t}\n\t\tlet { constants = {\n\t\t\ttemplateBoundary: '__',\n\t\t\ttemplateNameBoundary: '##'\n\t\t} } = options\n\t\tthis.constants = constants\n\n\t\t// This object (if set) will receive the template functions parsed from a script\n\t\t// I want to be able to call my templates as global functions, so I've set it\n\t\t// to be the window object\n\t\tthis.secondaryTemplateFunctionObject = options.secondaryTemplateFunctionObject\n\n\t\tthis.loaders = options.loaders || []\n\n\t\tthis.dataFunctions = options.dataFunction || {}\n\t}\n\n\t_makeTemplate(transformationFunction) {\n\t\tif (isTemplate(transformationFunction)) {\n\t\t\treturn transformationFunction\n\t\t}\n\t\tlet tri = this\n\t\tlet f = function (thedata) {\n\t\t\tlet stream = null\n\t\t\tlet options = null\n\t\t\tlet callback = null\n\t\t\tfor (let i = 1; i < arguments.length; i++) {\n\t\t\t\tlet arg = arguments[i]\n\t\t\t\tif (isStream(arg)) {\n\t\t\t\t\tstream = arg\n\t\t\t\t}\n\t\t\t\telse if(typeof arg === 'function') {\n\t\t\t\t\tcallback = arg\n\t\t\t\t}\n\t\t\t\telse if(typeof arg === 'object') {\n\t\t\t\t\toptions = arg\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn f.write(thedata, stream, callback, options)\n\t\t}\n\t\tf.write = function (thedata, stream, callback, options = {}) {\n\t\t\tif(transformationFunction && transformationFunction.write) {\n\t\t\t\t// if it's not a template, but has a write method, invoke the right method directly\n\t\t\t\treturn transformationFunction.write.apply(transformationFunction, arguments)\n\t\t\t}\n\t\t\telse {\n\t\t\t\tlet dest = stream || ''\n\n\t\t\t\tlet context = new ExecutionContext(tri, f, thedata, dest, tri.dataFunctions)\n\t\t\t\tif (options && 'continueOnTripartiteError' in options) {\n\t\t\t\t\tcontext.continueOnTripartiteError = options.continueOnTripartiteError\n\t\t\t\t}\n\n\t\t\t\treturn context.run(callback)\n\t\t\t}\n\t\t}\n\t\tf.parts = []\n\t\tif (transformationFunction && typeof transformationFunction === 'function') {\n\t\t\tf.parts.push(transformationFunction)\n\t\t}\n\t\tf.templateMeta = {}\n\t\treturn f\n\t}\n\n\taddTemplate(name, template) {\n\t\tif (typeof template === 'string') {\n\t\t\ttemplate = this.parseTemplate(template);\n\t\t}\n\t\telse if (typeof template === 'function') {\n\t\t\ttemplate = this._makeTemplate(template)\n\t\t}\n\n\t\tthis.templates[name] = template;\n\t\ttemplate.templateMeta = template.templateMeta || {}\n\t\ttemplate.templateMeta.name = name\n\t\treturn template;\n\t}\n\n\tcreateBlank() {\n\t\treturn new Tripartite()\n\t}\n\n\tgetTemplate(name) {\n\t\treturn this.templates[name]\n\t}\n\n\tloadTemplate(name, callback) {\n\t\tif (name in this.templates) {\n\t\t\tcallback(this.templates[name])\n\t\t}\n\t\telse {\n\t\t\tlet tri = this\n\t\t\tlet count = this.loaders.length\n\t\t\tlet done = false\n\n\t\t\tif (count == 0) {\n\t\t\t\ttri.templates[name] = null\n\t\t\t\tcallback(tri.getTemplate(name))\n\t\t\t}\n\t\t\telse {\n\t\t\t\tthis.loaders.forEach(loader => {\n\t\t\t\t\tif (done) {\n\t\t\t\t\t\treturn\n\t\t\t\t\t}\n\t\t\t\t\tloader(name, template => {\n\t\t\t\t\t\tif (done) {\n\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcount--\n\t\t\t\t\t\tif (template) {\n\t\t\t\t\t\t\tdone = true\n\t\t\t\t\t\t\ttri.addTemplate(name, template)\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (count == 0) {\n\t\t\t\t\t\t\tdone = true\n\t\t\t\t\t\t\ttri.templates[name] = null\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (done) {\n\t\t\t\t\t\t\tcallback(tri.getTemplate(name))\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\t}\n\tparseTemplateScript(tx) {\n\t\tvar tks = this.tokenizeTemplateScript(tx);\n\t\t/* current template name */\n\t\tvar ctn = null;\n\t\tfor (var i = 0; i < tks.length; i++) {\n\t\t\tvar token = tks[i];\n\t\t\tif (token.active) {\n\t\t\t\tctn = token.content;\n\t\t\t}\n\t\t\telse {\n\t\t\t\tif (ctn) {\n\t\t\t\t\tvar template = this.addTemplate(ctn, this.stripTemplateWhitespace(token.content));\n\t\t\t\t\tif (this.secondaryTemplateFunctionObject) {\n\t\t\t\t\t\tthis.secondaryTemplateFunctionObject[ctn] = template;\n\t\t\t\t\t}\n\t\t\t\t\tctn = null;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tstripTemplateWhitespace(txt) {\n\t\tvar i = txt.indexOf('\\n');\n\t\tif (i > -1 && txt.substring(0, i).trim() == '') {\n\t\t\ttxt = txt.substring(i + 1);\n\t\t}\n\t\ti = txt.lastIndexOf('\\n');\n\t\tif (i > -1 && txt.substring(i).trim() == '') {\n\t\t\ttxt = txt.substring(0, i);\n\t\t}\n\t\treturn txt;\n\t}\n\n\t/* simple template */\n\t_createActiveElement(/* conditional expression */ cd, data, /* handling expression */ hd, tripartite, templateMeta) {\n\t\tlet el = new ActiveElement(cd, data, hd, tripartite);\n\t\tel.templateMeta = templateMeta\n\t\treturn el\n\t}\n\tpt(tx) {\n\t\treturn this.parseTemplate(tx)\n\t}\n\t/* parse template */\n\tparseTemplate(tx) {\n\t\tvar tks = this.tokenizeTemplate(tx);\n\t\tlet t = this._makeTemplate()\n\t\tvar templateMeta = t.templateMeta\n\n\t\tfor (let tk of tks) {\n\t\t\tif (tk.active) {\n\t\t\t\tt.parts.push(this.tokenizeActivePart(tk.content, templateMeta));\n\t\t\t}\n\t\t\telse if (tk.content) {\n\t\t\t\tt.parts.push(tk.content);\n\t\t\t}\n\t\t}\n\n\t\treturn t\n\t}\n\n\ttokenizeActivePart(tx, templateMeta) {\n\t\tvar con = null;\n\t\tvar dat = null;\n\t\tvar han = null;\n\n\t\t/* condition index */\n\t\tvar ci = tx.indexOf('??');\n\t\tif (ci > -1) {\n\t\t\tcon = tx.substring(0, ci);\n\t\t\tci += 2;\n\t\t}\n\t\telse {\n\t\t\tci = 0;\n\t\t}\n\n\t\t/* handler index */\n\t\tvar hi = tx.indexOf('::');\n\t\tif (hi > -1) {\n\t\t\tdat = tx.substring(ci, hi);\n\t\t\than = tx.substring(hi + 2);\n\t\t}\n\t\telse {\n\t\t\tdat = tx.substring(ci);\n\t\t}\n\t\treturn this._createActiveElement(con, dat, han, this, templateMeta);\n\t}\n\n\ttokenizeTemplate(tx) {\n\t\treturn this.tokenizeActiveAndInactiveBlocks(tx, this.constants.templateBoundary);\n\t}\n\n\n\t/** tokenize template script */\n\ttokenizeTemplateScript(tx) {\n\t\treturn this.tokenizeActiveAndInactiveBlocks(tx, this.constants.templateNameBoundary);\n\t}\n\n\t/* tokenize active and inactive blocks */\n\ttokenizeActiveAndInactiveBlocks(text, /*Active Region Boundary */ boundary) {\n\t\t/* whole length */\n\t\tlet length = text.length\n\n\t\t/* current position */\n\t\tlet position = 0\n\n\t\t/* are we in an active region */\n\t\tlet act = false\n\n\t\tlet tokens = []\n\n\t\twhile (position < length) {\n\t\t\tlet i = text.indexOf(boundary, position);\n\t\t\tif (i == -1) {\n\t\t\t\ti = length;\n\t\t\t}\n\t\t\tvar tk = { active: act, content: text.substring(position, i) };\n\t\t\ttokens.push(tk);\n\t\t\tposition = i + boundary.length;\n\t\t\tact = !act;\n\t\t}\n\n\t\treturn tokens;\n\t}\n\n}\nvar tripartiteInstance = new Tripartite()\n\nif (typeof window != 'undefined') {\n\ttripartiteInstance.secondaryTemplateFunctionObject = window\n}\n\n\nif (true) {\n\tmodule.exports = tripartiteInstance\n}\nelse {}\n\nif (typeof __webpack_require__.g != 'undefined') {\n\tif (!__webpack_require__.g.Tripartite) {\n\t\t__webpack_require__.g.Tripartite = Tripartite\n\t}\n\tif (!__webpack_require__.g.tripartite) {\n\t\t__webpack_require__.g.tripartite = tripartiteInstance\n\t}\n}\n\n\n\n//# sourceURL=webpack://ck-widget-starter/./node_modules/tripartite/tripartite.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client-js/pages.js");
/******/ 	
/******/ })()
;