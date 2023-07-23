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

describe('gridHeaders', () => {
    

    test('Headers as string, no urlString', () => {
        let tableHeaders = gridHeaders(['hello', 'world']);
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
    })

    test('Headers as object with text property only, no urlString', () => {
        let tableHeaders = gridHeaders([{text:'hello'}, 'world']);
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('hello')
    })

    test('Headers as object with text and sort property, no urlString', () => {
        let tableHeaders = gridHeaders([{text:'hello', sort: 'asc'}, 'world']);
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('hello')
    })

    test('Headers as object with data, text, and sort property, no urlString', () => {
        let tableHeaders = gridHeaders([{text:'hello', data: 'id', sort: 'asc'}, 'world']);
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('<a href=\"?sb=id&sd=asc\">hello</a>')
    })

    
    test('Headers as object with data and sort property, no urlString', () => {
        let tableHeaders = gridHeaders([{data: 'id', sort: 'asc'}, 'world']);
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('<a href=\"?sb=id&sd=asc\">id</a>')
    })

    test('Headers as object with data, text and sort property, urlString with sb', () => {
        let tableHeaders = gridHeaders([{text:'hello', data: 'id', sort: 'asc'}, 'world'], 'localhost:3000?sb=id');
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('<a href=\"localhost:3000?sb=id&sd=asc\">hello</a>')
    })

    test('Headers as object with data, text and sort property, urlString with sb and sd', () => {
        let tableHeaders = gridHeaders([{text:'hello', data: 'id', sort: 'asc'}, 'world'], 'localhost:3000?sb=id&sd=asc');
        expect(tableHeaders.length).toEqual(2)
        let h = tableHeaders.pop();
        expect(h).toEqual('world')
        h = tableHeaders.pop();
        expect(h).toEqual('<a href=\"localhost:3000?sb=id&sd=desc\">hello</a>')
    })
})

test('', () => {
    let headers = [{
        text: 'ID',
        data: 'id',
        sort: 'asc',
    }];

    let rows = [["1"]];

    let h = table(gridHeaders(headers),rows);
    expect(h).toEqual('<table><thead><tr><th><a href=\"?sb=id&sd=asc\">ID</a></th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>')
})