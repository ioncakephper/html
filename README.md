# html

Build HTML tags programmatically in JavaScript scripts.

## Installation

```bash
npm install html --save
```

## Usage

```js
const {tag} = require('html');

// Empty tag
let p = tag('p'); // An empty p tag
console.log(p);
// <p />

// Tag with content
let p1 = tag('p', 'Lorem ipsum');
console.log(p1)
// <p>Lorem ipsum</p>

// Tag with content and attributes
let p3 = tag('p', 'Lorem ipsum', {class: 'standard'})
console.log(p3);
// <p class="standard">Lorem ipsum</p>

// Tag with empty content and attributes
let a = tag('a', '', {class: 'standard'})
console.log(a);
// <a class="standard" />

// Content as an array
let p4 = tag('p', ['show ', 'me'])
console.log(p4);
// <p>show me</p>

// Create UL from array of strings
let items = ["First item", "Second item"];
let ul = tag(
    'ul',
    items.map(item => tag('li', item))
)
console.log(ul);
// <ul><li>First item</li><li>Second item</li></ul>
```

## Table function

The `html` module provides the `table` function to build the HTML code for a table with headers, rows, and options

```js
const {tag, table} = require('html');

let heeders = ['ID', 'Name'];
let rows [
    ['1', 'Dale Cooper'],
    ['2', 'Mary Poppins']
]

let t = table(headers, rows);
console.log(t);
// <table><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>Dale Cooper</td></tr><tr><td>2</td><td>Mary Poppins</td></tr></tbody></table>
```

## a function

The `a` function creates the html code for the `<a>` tag, providing arguments for content and url.

```js
const {a} = require('html');

let linkTo = a('Company', 'http://company/com');
console.log(linkTo);
// <a href="http://company.com">Company</a>
```
