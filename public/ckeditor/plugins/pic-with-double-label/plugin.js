(function () {
	let places = ['top', 'right', 'bottom', 'left']
	let aspects = ['padding', 'margin']
	let widgetName = 'pic-with-double-label'


	let escapeAttributeValue = function (s, preserveCR) {
		preserveCR = preserveCR ? '&#13;' : '\n';
		return ('' + s) /* Forces the conversion to string. */
			.replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
			.replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			/*
			You may add other replacements here for HTML only 
			(but it's not necessary).
			Or for XML, only if the named entities are defined in its DTD.
			*/
			.replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
			.replace(/[\r\n]/g, preserveCR)
	}
	let unescapeAttributeValue = function (s, preserveCR) {
		preserveCR = preserveCR ? '&#13;' : '\n';
		return ('' + s) /* Forces the conversion to string. */
			.split('&apos;').join("'")
			.split('&quot;').join('"')
			.split('&lt;').join('<')
			.split('&gt;').join('>')
			.split('&#13;').join('\n')
			.split('&amp;').join('&')
	}

	let setIfExists = function (widget, attr) {
		var w = widget.element.$.attributes.getNamedItem('data-' + attr)
		if (w) {
			widget.setData(attr, w.value)
		}
	}
	let setIfExistsCheckbox = function (widget, attr) {
		var w = widget.element.$.attributes.getNamedItem('data-' + attr)
		if (w) {
			widget.setData(attr, w.value == 'false' ? false : true)
		}
	}


	CKEDITOR.plugins.add(widgetName, {
		requires: 'widget',

		icons: widgetName,

		init: function (editor) {
			CKEDITOR.dialog.add(widgetName, this.path + `dialogs/${widgetName}.js`);
			let template = `<div class="${widgetName}" style="margin: 0; position: relative;">
						<div class="pic">
						</div>
						
						<div class="msg">
						<h2>&nbsp;</h2>
						<div class="desc">&nbsp;</div>
						
						</div>

					</div>`
			
			if(!window['@webhandle/ckeditor-widget-panel']) {
				window['@webhandle/ckeditor-widget-panel'] = {
					widgets: []
				}
			}
			if(!window['@webhandle/ckeditor-widget-panel'].widgets) {
				window['@webhandle/ckeditor-widget-panel'].widgets = {}
			}
			if(!window['@webhandle/ckeditor-widget-panel'].widgets[widgetName]) {
				window['@webhandle/ckeditor-widget-panel'].widgets[widgetName] = {
					name: widgetName
					, label: "Picture with Two Captions"
					, template: template
					, icon: this.path + `icons/pic-with-double-label-big.png`
					, description: 'Adds a widget that has a picture and two caption locations'
					, action: function(editor) {
						editor.insertHtml(this.template)
						setTimeout(function() {
							let keys = Object.keys(editor.widgets.instances)
							let widget = editor.widgets.instances[keys[keys.length - 1]]

							widget.focus()
							widget.edit()
						})
					}
				}
			}

			editor.widgets.add(widgetName, {

				template: template
				, editables: {
					caption1: {
						selector: 'h2'
					}
					, caption2: {
						selector: '.desc'
					}
				}

				, dialog: widgetName,
				dataAttributes: ['alttext', 'link', 'linktarget', 'picsource', 'align', 'layout', 'bordercss',
					// 'verticalalign', 
					'usecaption', 'additionalclasses', 'additionalstyles', 'targetwidth', 'targetheight', 'aspectratio', 'scaling', 'margintop', 'marginright',
					'marginbottom', 'marginleft', 'paddingtop', 'paddingright', 'paddingbottom', 'paddingleft',
					'maxwidth', 'maxheight', 'justifyimage',
					'elementid'	
				],

				upcast: function (element) {
					return element.name == 'div' && element.hasClass(widgetName);
				},

				init: function () {
					for (var i in this.dataAttributes) {
						setIfExists(this, this.dataAttributes[i])
					}
					setIfExistsCheckbox(this, 'usecaption')
					setIfExistsCheckbox(this, 'linktarget')
				},
				data: function () {
					try {

						let data = this.data
						let widgetRootEl = this.element.$
						let picture = widgetRootEl.querySelector('picture')
						let img = widgetRootEl.querySelector('img')
						let caption = widgetRootEl.querySelector('figcaption')

						// let's clear out the old info
						widgetRootEl.className = widgetName
						widgetRootEl.style = `${data.additionalstyles || ''}`
						widgetRootEl.style.position = 'relative'
						widgetRootEl.removeAttribute('onclick')
						
						if(data.elementid) {
							widgetRootEl.id = data.elementid
						}
						else {
							widgetRootEl.id = ''
						}

						if (data.maxwidth) {
							widgetRootEl.style.maxWidth = data.maxwidth
						}
						else {
							widgetRootEl.style.maxWidth = '100%'
						}
						if (data.maxheight) {
							widgetRootEl.style.maxHeight = data.maxheight
						}
						else {
							widgetRootEl.style.maxHeight = 'none'
						}


						let linkPart = ''
						let linkEx = ''
						// if we're linking, set up the on click	
						if (data.link) {
							linkEx = `if(!this.closest('.editing-page')) { `
							if (data.linktarget == true || data.linktarget == 'true') {
								linkEx += `window.open('${data.link}') `
							}
							else {
								linkEx += `window.location = '${data.link}' `
							}
							linkEx += '}'

							linkPart = ` onclick="${linkEx}" `

							widgetRootEl.style.cursor = 'pointer'
						}
						if (linkEx) {
							widgetRootEl.setAttribute('onclick', linkEx)
						}


						let pic = this.element.find('.pic').getItem(0).$
						if (this.data.picsource) {
							let options = {

							}
							if (data.targetwidth && data.targetwidth.trim().endsWith('px')) {
								options.displayWidth = data.targetwidth
							}
							pic.innerHTML = makeMarkup(this.data.picsource, options)
						}
						else {
							pic.innerHTML = ''
						}




						if (data.targetwidth) {
							widgetRootEl.style.width = data.targetwidth
						}
						if (data.targetheight) {
							widgetRootEl.style.height = data.targetheight
						}

						if (data.layout == 'show-inline-block') {
							widgetRootEl.style.display = 'inline-block'
						}
						if (data.layout == 'show-block') {
							widgetRootEl.style.display = 'block'
						}
						if (data.layout == 'float-on-right') {
							widgetRootEl.style.float = 'right'
						}
						if (data.layout == 'float-on-left') {
							widgetRootEl.style.float = 'left'
						}

						if (data.bordercss) {
							widgetRootEl.style.border = data.bordercss
						}
						else {
							widgetRootEl.style.border = ''
						}


						widgetRootEl.className = (widgetRootEl.className + ' ' + data.additionalclasses).trim()

						// set padding and margin
						for (let aspect of aspects) {
							for (let place of places) {
								let value = data[aspect + place]
								if (value) {
									widgetRootEl.style[`${aspect}-${place}`] = value
								}
							}
						}


						if (data.aspectratio) {
							widgetRootEl.style.aspectRatio = data.aspectratio
						}
						else {
							widgetRootEl.style.aspectRatio = ''
						}

						if (data.justifyimage && (!data.layout || (data.layout && data.layout.indexOf('float') < 0))) {
							if (data.justifyimage.includes('left')) {
								// img.style.marginLeft = '0'
								// img.style.marginRight = 'auto'
								widgetRootEl.style.marginLeft = '0'
								widgetRootEl.style.marginRight = 'auto'
							}
							else if (data.justifyimage.includes('right')) {
								// img.style.marginLeft = 'auto'
								// img.style.marginRight = '0'
								widgetRootEl.style.marginLeft = 'auto'
								widgetRootEl.style.marginRight = '0'
							}
							else if (data.justifyimage.includes('center')) {
								// img.style.marginLeft = 'auto'
								// img.style.marginRight = 'auto'
								widgetRootEl.style.marginLeft = 'auto'
								widgetRootEl.style.marginRight = 'auto'
							}
						}

						if (data.scaling) {
							let value = ''
							if (data.scaling == 'flex-picture-scaling-cover') {
								value = 'cover'
							}
							if (data.scaling == 'flex-picture-scaling-contain') {
								value = 'contain'
							}
							// img.style.objectFit = value
						}
						if (data.align) {
							// img.style.objectPosition = data.align
						}

						for (var i in this.dataAttributes) {
							this.element.setAttribute('data-' + this.dataAttributes[i], this.data[this.dataAttributes[i]])
						}
					}
					catch (e) {
						console.log(e)
					}
				}
			})
		}
	});


	function makeMarkup(url, options) {
		let o = parseWebp2xUrl(url)
		o.params = o.params || {}
		o.params.imgStyle = o.params.imgStyle || ''
		o.params.imgStyle += ' display: block; max-width: 100%; max-height: 100%; height: auto; '
		let html = generatePictureMarkup(o.url, Object.assign(o.params, options))
		return html
	}

	function parseWebp2xUrl(url) {

		let i = url.lastIndexOf('#')
		if (i < 0) {
			return {
				url: url
			}
		}

		let result = {
			url: url.substring(0, i)
			, params: {}
		}

		let parts = url.substring(i + 1).split('&')
		for (let part of parts) {
			let sides = part.split('=')
			if (sides[1]) {
				sides[1] = decodeURIComponent(sides[1])
			}
			result.params[sides[0]] = sides[1]
		}

		return result
	}

	/**
	 * Generate markup for a picture with webp double density components and a fallback to another format
	 * @param {string} url The URL of the primary fallback image
	 * @param {object} options
	 * @param {object} options.width The natural width of the single size image
	 * @param {object} options.height The natural height of the single size image
	 * @param {object} [options.format] Set with webp2x which will generate an picture with webp alternatives. Anything else will cause a simpler picture with single image element
	 * @param {object} [options.alt] The alt text (descriptive text) for the image, If blank it will be set from the image name
	 * @param {object} [options.displayWidth] The width at which the picture will actually be displayed if known and different from the natural width
	 * @param {object} [options.displayHeight] The height at which the picture will actually be displayed if known and different from the natural height
	 * @param {object} [options.pictureStyle] Style attribute text for the picture element
	 * @param {object} [options.imgStyle] Style attribute text for the image element
	 * @param {object} [options.pictureClass] The class attribute value. If blank it will be set from the base name
	 * @param {object} [options.cdnPrefix] A prefix for the url
	 * @returns 
	 */
	function generatePictureMarkup(url, { width, height, format, alt,
		displayWidth, displayHeight, pictureStyle, imgStyle, pictureClass, cdnPrefix = '' } = {}) {

		let pictureStyleAttr = ''
		if (pictureStyle) {
			pictureStyleAttr = ` style="${pictureStyle}" `
		}

		let imgStyleAttr = ''
		if (imgStyle) {
			imgStyleAttr = ` style="${imgStyle}" `
		}

		let { basename, ext, baseUrl } = urlBasename(url)
		if (!pictureClass) {
			pictureClass = escapeAttributeValue(basename) + '-picture'
		}

		if (!alt) {
			alt = basename
		}
		alt = escapeAttributeValue(alt, true)

		if (!displayWidth && width) {
			displayWidth = width + 'px'
		}
		if (!displayHeight && height) {
			displayHeight = height + 'px'
		}


		let picture

		if (format === 'webp2x') {
			let full = parseInt(width)
			let double = 2 * full
			let half = Math.ceil(full / 2)
			let quarter = Math.ceil(full / 4)


			let fallback = 'image/jpeg'
			if (ext.toLowerCase() == 'png') {
				fallback = 'image/png'
			}
			picture =
				`<picture class="${pictureClass}" ${pictureStyleAttr}>
	<source 
		srcset="${cdnPrefix}${baseUrl}-2x.webp ${double}w, ${cdnPrefix}${baseUrl}.webp ${full}w, ${cdnPrefix}${baseUrl}-half.webp ${half}w, ${cdnPrefix}${baseUrl}-quarter.webp ${quarter}w"  
		sizes="min(100vw, ${displayWidth})"
		type="image/webp">
	<source 
		srcset="${cdnPrefix}${baseUrl}-2x.${ext} ${double}w, ${cdnPrefix}${baseUrl}.${ext} ${full}w, ${cdnPrefix}${baseUrl}-half.${ext} ${half}w, ${cdnPrefix}${baseUrl}-quarter.${ext} ${quarter}w"  
		sizes="min(100vw, ${displayWidth})"
		type="${fallback}">
	
	<img src="${cdnPrefix}${baseUrl}.${ext}" alt="${alt}" width="${displayWidth}" height="${displayHeight}" ${imgStyleAttr} >
</picture>
`
		}
		else {
			let widthAttr = ''
			if (displayWidth) {
				widthAttr = `width="${displayWidth}"`
			}

			let heightAttr = ''
			if (displayHeight) {
				heightAttr = `height="${displayHeight}"`
			}
			picture = `<picture class="${pictureClass}" ${pictureStyleAttr}>
	<img src="${cdnPrefix}${baseUrl}.${ext}" alt="${alt}" ${widthAttr} ${heightAttr} ${imgStyleAttr} >
</picture>
`
		}
		return picture

	}

	function urlBasename(url) {
		while (url.endsWith('/')) {
			url = url.substring(0, url.length - 1)
		}

		let parts = url.split('/')
		let last = parts.pop()

		let i = last.lastIndexOf('.')
		let ext
		if (i > -1) {
			ext = last.substring(i + 1)
		}

		let result = {
			basename: fileBasename(last)
			, ext: ext
		}

		parts.push(result.basename)
		result.baseUrl = parts.join('/')

		return result
	}

	function fileBasename(name) {
		return name.substring(0, name.lastIndexOf('.'))
	}

})()
