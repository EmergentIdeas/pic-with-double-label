let widgetName = 'pic-with-double-label'
CKEDITOR.dialog.add(widgetName, function (editor) {
	
	function createField(id, label, {type = "text", width, items} = {}) {
		let control = {
			id: id
			, type: type
			, label: label
			, setup: function (widget) {
				this.setValue(widget.data[id]);
			}
			, commit: function (widget) {
				widget.setData(id, this.getValue());
			}
		}
		if(width) {
			control.width = width
		}
		if(items) {
			control.items = items
		}

		return control
	}
	let treeBrowserAvailable = false
	if (window['@webhandle/tree-file-browser']
		&& window['@webhandle/tree-file-browser'].FileSelectDialog
		&& window['@webhandle/tree-file-browser'].loadStyles
		&& window.webhandle
		&& window.webhandle.sinks
		&& window.webhandle.sinks.public
	) {
		treeBrowserAvailable = true
	}
	let browseButton = {
		type: 'button',
		id: 'browse',
		label: editor.lang.common.browseServer,
		hidden: false,
		setup: function (widget) {
		},
		commit: function (widget) {
		}
	}

	browseButton.onClick = async function (one, two, three, four) {
		document.querySelector('.cke_dialog_background_cover').style['z-index'] = 9997
		document.querySelector('.cke_dialog_container').style['z-index'] = 9998
		window['@webhandle/tree-file-browser'].loadStyles()
		prefix = 'img'
		let FileSelectDialog = window['@webhandle/tree-file-browser'].FileSelectDialog
		let diag = new FileSelectDialog({
			sink: webhandle.sinks.public
			, startingDirectory: prefix
			, imagesOnly: true
		})
		let result = await diag.open()

		if (result && result.url) {
			let path = result.url
			one.data.dialog.getModel().setData('picsource', path);
			one.data.dialog.getContentElement('info', 'picsource').setValue(path)
		}
	}

	let desc = {
		title: 'Edit Widget',
		minWidth: 700,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				label: 'Basics',
				elements: [
					createField('picsource', "Picture source")
					, browseButton
					, createField('alttext', 'Descriptive Text (used for search engines and screen readers for the blind)')
					, {
						id: 'usecaption',
						type: 'checkbox',
						label: 'Show an area where you can caption the picture',
						setup: function (widget) {
							this.setValue(widget.data.usecaption == 'true' || widget.data.usecaption == true ? true : false);
						},
						commit: function (widget) {
							widget.setData('usecaption', this.getValue());
						}
					}
				]
			}
			, {
				id: 'link',
				label: 'Link',
				elements: [
					createField('link', 'Link (set this value to make this picture link to another page)')
					, createField('linktarget', 'Open in new window', {type: 'checkbox'})
				]
			}
			, {
				id: 'layouttab',
				label: 'Position and Size',
				elements: [
					{
						type: 'html'
						, html: `<p>If the widget is NOT wide enough to span the whole screen (for whatever reason), this setting changes its justification.`
					}
					, 
					createField('justifyimage', "Justify image", {type: 'select', width: '200px', 
						items: [
							['auto', ''],
							['left', 'left'],
							['center', 'center'],
							['right', 'right']
						]
					})
					, {
						type: 'html'
						, html: `<p>Max Height and Max Width help you control how big the widget will appear on the screen. 
						These options won't force the widget to show up larger <br>
						than what its content would demand. This is probably what you want.</p>`
					}
					, {
						type: 'hbox'
						, children: [
							createField('maxwidth', 'Max width (e.g. 200px, 30%)', {width: '100px'})
							, createField('maxheight', 'Max height', {width: '100px'})
						]
					}
					, {
						type: 'html'
						, html: `<br><p>Width and Height attempt to force the widget to a certain size, even if that would look bad.</p>`
					}
					, {
						type: 'hbox'
						, children: [
							createField('targetwidth', 'Width (e.g. 200px, 30%)', {width: '100px'})
							, createField('targetheight', 'Height', {width: '100px'})
						]
					}
					, {
						type: 'html'
						, html: '<br><p><strong>The controls below force the widget to take a fixed aspect ratio.</strong></p>'
					}
					, {
						type: 'html'
						, html: "<p>If the aspect ratio is set, you'll be causing the widget to get taller and shorter proportional to the width of the screen.</p>"
					}
					, {
						type: 'hbox'
						, children: [
							createField('aspectratio', 'Aspect ratio (width / height)', {width: '50px'})
							, createField('scaling', 'Image scaling', {type: 'select',
								items: [
									['Auto', ''],
									['Cover', 'flex-picture-scaling-cover'],
									['Contain', 'flex-picture-scaling-contain']
								]
							})
							, createField('align', 'Image position', {type: 'select', 
								items: [
									['left top', 'left top'],
									['left center', 'left center'],
									['left bottom', 'left bottom'],
									['right top', 'right top'],
									['right center', 'right center'],
									['right bottom', 'right bottom'],
									['center top', 'center top'],
									['center center', 'center center'],
									['center bottom', 'center bottom']
								]
							})
						]
					}
				]
			}
			, {
				id: "widgetspacing",
				label: 'Spacing',
				elements: [
					{
						type: 'html'
						, html: `<p>Set the margin (distance of the image from the page sides and things above/below) and padding (space inside the widget). <br> 
						This should be in pixels like '50px' or sometimes, rarely, in percentages like '10%'. </p>`
					}
					, {
						type: 'hbox',
						widths: ['33%', '33%', '33%'],
						children: [
							{
								type: 'vbox'
								, children: []
							}
							, {
								type: 'vbox'
								, children: [
									createField('margintop', 'Top Margin', {width: 'auto'})
									, createField('paddingtop', 'Top Padding', {width: 'auto'})
								]
							}
							, {
								type: 'vbox'
								, children: [


								]
							}
						]
					}
					, {
						type: 'hbox',
						widths: ['33%', '33%', '33%'],
						children: [
							{
								type: 'hbox'
								, children: [
									createField('marginleft', 'Left Margin', {width: '50px'})
									, createField('paddingleft', 'Left Padding', {width: '50px'})
								]
							}
							, {
								type: 'html'
								, html: '<p style="text-align: center">the picture</p>'
							}
							, {
								type: 'hbox'
								, children: [
									createField('paddingright', 'Right Padding', {width: '50px'})
									, createField('marginright', 'Right Margin', {width: '50px'})
								]
							}
						]

					}
					, {
						type: 'hbox',
						widths: ['33%', '33%', '33%'],
						children: [
							{
								type: 'vbox'
								, children: []
							}
							, {
								type: 'vbox'
								, align: 'center'
								, children: [
									createField('paddingbottom', 'Bottom Padding', {width: 'auto'})
									, createField('marginbottom', 'Bottom Margin', {width: 'auto'})
								]
							}
							, {
								type: 'vbox'
								, children: []
							}
						]
					}
				]
			}
			, {
				id: "css-fields",
				label: 'CSS',
				elements: [
					{
						type: 'html'
						, html: '<p>These are advanced settings for fine grained control of the widget.</p>'
					}
					, createField('layout', 'Display', {type: 'select', 
						items: [
							['Inline Block', 'show-inline-block'],
							['Block', 'show-block'],
							['Float on right', 'float-on-right'],
							['Float on left', 'float-on-left']
						]
					})
					// , createField('verticalalign', 'Vertical alignment', {type: 'select',
					// 	items: [
					// 		['auto', ''],
					// 		['baseline', 'baseline'],
					// 		['sub', 'sub'],
					// 		['super', 'super'],
					// 		['text-top', 'text-top'],
					// 		['text-bottom', 'text-bottom'],
					// 		['middle', 'middle'],
					// 		['top', 'top'],
					// 		['bottom', 'bottom']
					// 	]
					// })
					, createField('bordercss', 'Border css')
					, createField('additionalclasses', 'Additional classes')
					, createField('additionalstyles', 'Additional styles')
					, createField('elementid', 'Element ID')
				]
			}
		]

	};

	return desc
});