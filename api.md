# `html-tag-builder` API

## Functions

<dl>
<dt><a href="#tag">tag(tagName, [content], [options])</a> ⇒</dt>
<dd><p>The <code>tag</code> function generates an HTML tag with optional content and attributes.</p>
</dd>
<dt><a href="#startTag">startTag(tagName, options)</a> ⇒</dt>
<dd><p>The function &quot;startTag&quot; generates the opening tag of an HTML element with optional attributes.</p>
</dd>
<dt><a href="#tagAttributes">tagAttributes([options])</a> ⇒</dt>
<dd><p>The function <code>tagAttributes</code> takes an object as input and returns a string representation of the
object&#39;s key-value pairs as HTML tag attributes.</p>
</dd>
<dt><a href="#table">table([headers], [rows], [options])</a> ⇒</dt>
<dd><p>The <code>table</code> function generates an HTML table with the provided headers and rows.</p>
</dd>
<dt><a href="#a">a(content, url, [options])</a> ⇒</dt>
<dd><p>The function <code>a</code> creates an HTML anchor element with the specified content and URL, and additional
options if provided.</p>
</dd>
<dt><a href="#gridHeaders">gridHeaders([headers], [urlString])</a> ⇒</dt>
<dd><p>The <code>gridHeaders</code> function takes an array of headers and a URL string, and returns an array of
modified headers with sorting functionality.</p>
</dd>
</dl>

<a name="tag"></a>

## tag(tagName, [content], [options]) ⇒
The `tag` function generates an HTML tag with optional content and attributes.

**Kind**: global function  
**Returns**: a string that represents an HTML tag. If the content is empty, it returns a self-closing
tag. Otherwise, it returns an opening tag with the content inside, followed by a closing tag.  

| Param | Description |
| --- | --- |
| tagName | The `tagName` parameter is a string that represents the name of the HTML tag you want to create. For example, if you want to create a `<div>` tag, you would pass in `'div'` as the `tagName` parameter. |
| [content] | The `content` parameter is the inner content of the HTML tag. It can be a string or an array of strings. If it is an array, the strings will be joined together with no separator. If the `content` parameter is empty or falsy, the function will return a self-c |
| [options] | The `options` parameter is an object that can contain additional attributes for the HTML tag. These attributes will be added to the start tag of the HTML tag. |

<a name="startTag"></a>

## startTag(tagName, options) ⇒
The function "startTag" generates the opening tag of an HTML element with optional attributes.

**Kind**: global function  
**Returns**: a string that represents the start tag of an HTML element.  

| Param | Description |
| --- | --- |
| tagName | The `tagName` parameter is a string that represents the name of the HTML tag that you want to create. For example, if you want to create a `<div>` tag, you would pass the string "div" as the `tagName` parameter. |
| options | The `options` parameter is either a string, an array, or an object that contains the attributes and their values for the HTML tag. When options is a string, the options is returned. When options is an array, this function returns the array joined with a space. When options is an object, uses the object's key-value pairs as the attributes for the HTML tag. |

<a name="tagAttributes"></a>

## tagAttributes([options]) ⇒
The function `tagAttributes` takes an object as input and returns a string representation of the
object's key-value pairs as HTML tag attributes.

**Kind**: global function  
**Returns**: a string representation of the attributes passed in the `options` parameter.  

| Param | Description |
| --- | --- |
| [options] | The `options` parameter is an object that contains attributes and their values for an HTML tag. It can also be a string or an array. |

<a name="table"></a>

## table([headers], [rows], [options]) ⇒
The `table` function generates an HTML table with the provided headers and rows.

**Kind**: global function  
**Returns**: a table element with the specified headers and rows.  

| Param | Description |
| --- | --- |
| [headers] | An array of strings representing the table headers. |
| [rows] | An array of arrays, where each inner array represents a row in the table. Each element in the inner array represents a cell in the row. |
| [options] | The `options` parameter is an object that can contain additional attributes for the `<table>` element. These attributes can include things like `class`, `id`, `style`, etc. |

<a name="a"></a>

## a(content, url, [options]) ⇒
The function `a` creates an HTML anchor element with the specified content and URL, and additional
options if provided.

**Kind**: global function  
**Returns**: an HTML anchor tag (`<a>`) with the specified content and options. If the `url` parameter
is empty, it will return the anchor tag without the `href` attribute. If the `url` parameter is not
empty, it will return the anchor tag with the `href` attribute set to the provided `url`.  

| Param | Description |
| --- | --- |
| content | The content parameter is the text or HTML content that will be displayed within the anchor tag. |
| url | The `url` parameter is a string that represents the URL that the anchor tag should point to. |
| [options] | The `options` parameter is an object that contains additional attributes for the `<a>` tag. These attributes can include things like `class`, `id`, `target`, etc. By default, the `options` parameter is an empty object, but you can pass in any desired attributes as key-value |

<a name="gridHeaders"></a>

## gridHeaders([headers], [urlString]) ⇒
The `gridHeaders` function takes an array of headers and a URL string, and returns an array of
modified headers with sorting functionality.

**Kind**: global function  
**Returns**: The function `gridHeaders` returns an array of modified headers.  

| Param | Description |
| --- | --- |
| [headers] | An array of strings or objects representing the headers of a grid. Each object should have the following properties: - `text` - The `text` property is a string that represents the header's text. - `data?` - The optional `data` property represents the header's data. - `sort?` - The optional `sort` property is a string that represents the header's sorting option. When there is no sort option for a header object, the header returns the header.text. If header.text is empty, hand.data is used or an empty string. |
| [urlString] | The `urlString` parameter is a string that represents a URL. It is used to parse the query parameters from the URL and modify them based on the sorting options provided in the `headers` array. |
