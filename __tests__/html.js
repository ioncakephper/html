const { tag, table, a, gridHeaders } = require('../index.js');

describe('tag', () => {

    test.todo('Keep testing!')

    test('Empty content, no options', () => {
        expect(tag('h1')).toEqual('<h1 />');
    })

    test('String content, no options', () => {
        expect(tag('h1', 'hello')).toEqual('<h1>hello</h1>');
    })

    test('Array content, no options', () => {
        expect(tag('h1', ['hello', 'world'], {})).toEqual('<h1>helloworld</h1>');
    })

    test('Array content, options: the attribute is a string', () => {
        expect(tag('h1', ['hello', 'world'], { class: 'test' })).toEqual('<h1 class="test">helloworld</h1>');
    })

    test('Array content, options: the attribute is an array', () => {
        expect(tag('h1', ['hello', 'world'], { class: ['test', 'test2'] })).toEqual('<h1 class="test test2">helloworld</h1>');
    })
})

describe('a tag', () => {

    test('No content, no url, no options', () => {
        expect(a()).toEqual('<a />');
    })

    test('String content, no url, no options', () => {
        expect(a('hello')).toEqual('<a>hello</a>');
    })

    test('String content, url string, no options', () => {
        expect(a('hello', 'http://google.com')).toEqual('<a href="http://google.com">hello</a>');
    })

    test('', () => {
        expect(a('hello', 'http://google.com', { class: ['test', 'test2'], id: 'hello' })).toEqual('<a class="test test2" id="hello" href="http://google.com">hello</a>');
    })
})

describe('table', () => {

    test('Headers, a single row, no options', () => {
        expect(table(['hello', 'world'], [['hello', 'world']])).toEqual('<table><thead><tr><th>hello</th><th>world</th></tr></thead><tbody><tr><td>hello</td><td>world</td></tr></tbody></table>');
    })

    test.todo('No headers, no rows, no options');
    test('No headers, no rows, no options', () => {

        expect(table()).toEqual('<table />');
    })
})


    
