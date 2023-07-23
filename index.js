const {isString, isEmpty, isArray} = require('lodash')
const url = require('url')

"use strict";

/**
 * The `tag` function generates an HTML tag with optional content and attributes.
 * @param tagName - The `tagName` parameter is a string that represents the name of the HTML tag you
 * want to create. For example, if you want to create a `<div>` tag, you would pass in `'div'` as the
 * `tagName` parameter.
 * @param [content] - The `content` parameter is the inner content of the HTML tag. It can be a string
 * or an array of strings. If it is an array, the strings will be joined together with no separator. If
 * the `content` parameter is empty or falsy, the function will return a self-c
 * @param [options] - The `options` parameter is an object that can contain additional attributes for
 * the HTML tag. These attributes will be added to the start tag of the HTML tag.
 * @returns a string that represents an HTML tag. If the content is empty, it returns a self-closing
 * tag. Otherwise, it returns an opening tag with the content inside, followed by a closing tag.
 */
function tag(tagName, content = '', options = {}) {
    if (!isString(tagName)) {
        throw new Error('tagName must be a string');
    }
    if (isEmpty(tagName.trim())) {
        throw new Error('tagname must be a non-empty string');
    }
    tagName = tagName.trim();

    content = isArray(content) ? content.join('') : content;
    if (isEmpty(content)) {
        return `${startTag(tagName, options)} />`;
    }
    return `${startTag(tagName, options)}>${content}</${tagName}>`;
}

/**
 * The function "startTag" generates the opening tag of an HTML element with optional attributes.
 * @param tagName - The `tagName` parameter is a string that represents the name of the HTML tag that
 * you want to create. For example, if you want to create a `<div>` tag, you would pass the string
 * "div" as the `tagName` parameter.
 * @param options - The `options` parameter is either a string, an array, or an object that contains the attributes and their values
 * for the HTML tag. When options is a string, the options is returned. When options is an array, this function returns the array joined with a space. When options is an object, uses the object's key-value pairs as the attributes for the HTML tag.
 * @returns a string that represents the start tag of an HTML element.
 */
function startTag(tagName, options) {
    const attrValues = tagAttributes(options);
    return `<${tagName} ${attrValues}`.trim();
}

/**
 * The function `tagAttributes` takes an object as input and returns a string representation of the
 * object's key-value pairs as HTML tag attributes.
 * @param [options] - The `options` parameter is an object that contains attributes and their values
 * for an HTML tag. It can also be a string or an array.
 * @returns a string representation of the attributes passed in the `options` parameter.
 */
function tagAttributes(options = {}) {
    if (isString(options)) {
        return `${options}`;
    }
    if (isArray(options)) {
        return `${options.join(' ')}`;
    }
    let areKeysValid = Object.keys(options).every(key => {
        return isString(key) && !isEmpty(key.trim())
    })
    if (!areKeysValid) {
        throw new Error('tag options keys must be a non-empty string');
    }
    return Object.keys(options).map(key => {
        const value = tagAttributes(options[key]);
        return `${key}="${value}"`
    }).join(' ');
}

/**
 * The `table` function generates an HTML table with the provided headers and rows.
 * @param [headers] - An array of strings representing the table headers.
 * @param [rows] - An array of arrays, where each inner array represents a row in the table. Each
 * element in the inner array represents a cell in the row.
 * @param [options] - The `options` parameter is an object that can contain additional attributes for
 * the `<table>` element. These attributes can include things like `class`, `id`, `style`, etc.
 * @returns a table element with the specified headers and rows.
 */
function table(headers = [], rows = [], options = {}) {
    let thead = isEmpty(headers)
         ? '' 
         : tag(
          'thead',
            tag(
                'tr',
                headers.map(header => {
                    return tag(
                                'th',
                                header
                            )
                    }
                )
            )
        )
    let tbody = isEmpty(rows)
        ? ''
        : tag(
        'tbody',
        rows.map(row => {
            return tag(
                'tr',
                row.map(cell => {
                    return tag(
                        'td',
                        cell
                    )
                })
            )
            }
        )
    )
    return tag(
        'table',
        [
            thead,
            tbody
        ],
        options
    );
}

/**
 * The function `a` creates an HTML anchor element with the specified content and URL, and additional
 * options if provided.
 * @param content - The content parameter is the text or HTML content that will be displayed within the
 * anchor tag.
 * @param url - The `url` parameter is a string that represents the URL that the anchor tag should
 * point to.
 * @param [options] - The `options` parameter is an object that contains additional attributes for the
 * `<a>` tag. These attributes can include things like `class`, `id`, `target`, etc. By default, the
 * `options` parameter is an empty object, but you can pass in any desired attributes as key-value
 * @returns an HTML anchor tag (`<a>`) with the specified content and options. If the `url` parameter
 * is empty, it will return the anchor tag without the `href` attribute. If the `url` parameter is not
 * empty, it will return the anchor tag with the `href` attribute set to the provided `url`.
 */
function a(content, url, options = {}) {
    if (isEmpty(url)) {
        return tag('a', content, options);
    }
    return tag('a', content, {...options, ...{href: url}});
}

/**
 * The `gridHeaders` function takes an array of headers and a URL string, and returns an array of
 * modified headers with sorting functionality.
 * @param [headers] - An array of strings or objects representing the headers of a grid. Each object should have
 * the following properties:
 * - `text` - The `text` property is a string that represents the header's text.
 * - `data?` - The optional `data` property represents the header's data.
 * - `sort?` - The optional `sort` property is a string that represents the header's sorting option. When there is no sort option for a header object, the header returns the header.text. If header.text is empty, hand.data is used or an empty string.
  * @param [urlString] - The `urlString` parameter is a string that represents a URL. It is used to
 * parse the query parameters from the URL and modify them based on the sorting options provided in the
 * `headers` array.
 * @returns The function `gridHeaders` returns an array of modified headers.
 */
function gridHeaders(headers = [], urlString = '') {
    const swap = {
        asc: 'desc',
        desc: 'asc',
        "0": "1",
        "1": "0",
    }
    return headers.map(header => {
        if (isString(header)) {
            return header;
        }
  
        if (!header.data) {
            return header.text || header.data || ''
        }
        header.text = header.text || header.data;
        if (!header.sort) {
            return header.text;
        }

        let q = url.parse(urlString, true);
        let query = q.query;
        let {sb, sd} = query;
        if (sb === header.data) {
            query.sd = (sd) ? swap[sd] : header.sort;
        } else {
            query.sb = header.data;
            query.sd = header.sort;
        }
        q.search = `?${Object.keys(query).map(key => {
            return `${key}=${query[key]}`
        }).join('&')}`;

        let headerUrl = url.format(q);
        return a(header.text, headerUrl);
    })
}

module.exports = {
    tag,
    table,
    a,
    gridHeaders,
}