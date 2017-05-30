# Mark Clifton portfolio website

Source code for [mark-clifton.com](http://mark-clifton.com/)

## Tools

- [Middleman](https://middlemanapp.com/)
- [Sass](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Brackets](http://brackets.io/)
- [Adobe Photoshop](http://www.adobe.com/products/photoshop.html)
- [Adobe Illustrator](http://www.adobe.com/products/illustrator.html)
- [Miro Video Converter](http://www.mirovideoconverter.com/)
- [kraken.io](https://kraken.io/)

### npm dependencies

- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-inline-source](https://www.npmjs.com/package/gulp-inline-source)
- [gulp-attr-remover](https://www.npmjs.com/package/gulp-attr-remover)

## Features

- Middleman static site framework.
- Layout customization using Middleman frontmatter variables.
- Separate Gulp tasks called both during and after build, using Middleman’s `external_pipeline` feature and `after_build` callback.
- CSS manipulation of inline SVG.
- Asynchronous loading of Typekit fonts reduces page render time (at the expense of a brief FOUC on some browsers).
- OpenType alternate character styles create typographical variety from a small number of web fonts.
- Aggressive image optimization, lazy loading, and inlining of dependencies yield Google PageSpeed scores in the 90s for all pages, even portfolio pages with several MB of image assets.

Note: Not all pages pass [W3C HTML validation](https://validator.w3.org/) due to the markup required by the [Lazy Load](https://github.com/verlok/lazyload) script. However, there are fallbacks to maintain image accessibility despite the lack of validation.
