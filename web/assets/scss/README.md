# SCSS Architecture Overview

## File Structure

The `scss/` directory contains three folders: Base, UI and Vendor.

- **Base** contains the "building block" abstractions, namely the grid framework, mixins and helpers. These are core to spaceBase and should not be edited.
- **UI** contains all project-specific styles shared across the application. These files are meant to be completely tailored to your project. To start, it includes typography, form elements, generic print styles, buttons and other common UI components. Add more partials and  organize them however the project demands.
- **Vendor** contains Normalize and CSS reset. You can add other vendor files here.


## Compilation

All partials are imported into the `_manifest.scss`. This is also where you can choose to import either Normalize (default) or CSS Reset. When you add new partials to your project, add them to this import list. `_manifest.scss` is then imported into the two main stylesheets, `application.scss` and `application-ie.scss`. Set up your Sass compilation to generate these in the `stylesheets/` directory. Because of the amount of comments, please use minified CSS in production.

### Styleguide

There is a third stylesheet, `styleguide.css`, used only in `styleguide.html`. This file is the start for your project style guide, including grid examples, color swatches, typography, UI and form elements. [What is a style guide?](http://alistapart.com/article/creating-style-guides)


## Global Variables

Customizable variables are stored in the `_vars.scss` partial. This includes things like font styles, colors, breakpoints and base sizing measurements. Use these variables throughout the rest of the project, and add more as you see fit. `_vars.scss` also contains switches to include or exclude features as you need them.

### Vertical Rhythm and the `$base-sizing-unit`

As a means for consistency and good vertical rhythm, many measurements are based off the `$base-spacing-unit`, which is equal to the base `$line-height-ratio`. This way if the `$base-font-size` or `$base-line-height` is adjusted down the road, white space proportions are preserved. For example, unless you opt for using CSS Reset, most block-level elements (headings, lists, paragraphs, etc.) will have a bottom margin equal to `$base-spacing-unit`.
