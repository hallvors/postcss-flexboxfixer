# PostCSS Flexboxfixer [![Build Status][ci-img]][ci]

[PostCSS] plugin to rewrite code with existing vendor prefixes for flexbox (especially -webkit- prefixed) and syntax based on older versions of the CSS specification, and add equivalent un-prefixed CSS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/hallvors/postcss-flexboxfixer.svg
[ci]:      https://travis-ci.org/hallvors/postcss-flexboxfixer

For example, here's some CSS full of vendor-specific code and syntax based on older versions of the CSS specifications:

```css
.foo {
  display: -webkit-box;
  -webkit-box-pack: justify;
}
```

The flexboxfixer plugin will add the equivalent standard declarations (while leaving the old CSS for backwards compatibility with older WebKit-based browsers):

```css
.foo {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
```

## Usage

```js
postcss([ require('postcss-flexboxfixer') ])
```

To use in Node.js scripts:
```
npm install postcss-flexboxfixer
```

See [PostCSS] docs for examples for your environment.
