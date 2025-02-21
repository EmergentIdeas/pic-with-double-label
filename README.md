# pic-with-double-label

Adds a wiget to the ck editor which shows multiple widgets that a user can
choose to add to the editor.

## Install

```bash
npm install @dankolz/pic-with-double-label
```

## Use

### CK Editor Config

Add `pic-with-double-label` to the ck editor config file like

```js
	config.extraPlugins = (config.extraPlugins ? config.extraPlugins + ',' : '') + 'pic-with-double-label'
```

### Webhandle Server Side

This is safe to run multiple times

```js
import('@dankolz/pic-with-double-label').then(mod => {
	mod.default()
})
```


### Adding a widget to the panel

The widget is automatically added to the panel.
