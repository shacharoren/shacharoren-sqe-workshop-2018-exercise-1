import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {
    deleteResults, resolveElements,
    results,
    RowProgram
} from '../src/js/tree-to-table';
describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });

    it.skip('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type": "Program","body": [{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a","loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5}}},"init":{"type":"Literal","value":1,"raw":"1","loc":{"start":{"line":1,"column": 8},"end":{"line":1,"column":9}}},"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9}}}],"kind":"let","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}],"sourceType":"script","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}'
        );
    });

});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('function declaration', () => {
        let json = parseCode(
            'function foo(){}'
        );
        let expected = [
            {line: 1, type: 'function declaration', name: 'foo', condition: '', value: ''}
        ];
        // action
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('empty program should give blank table', () => {let str = '{"type": "Program","body": [],"sourceType": "script","loc": {"start": {"line": 0,"column": 0},"end": {"line": 0,"column": 0}}}';
        let json = JSON.parse(str);
        // action:
        RowProgram(json);
        // assert:
        assert.deepEqual(results, [], 'the array is not empty as it should be');
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('variable expression',() => {
        let json = parseCode(
            'let a;\n' +
            'let b;\n' +
            'let c = a + b;'
        );
        let expected = [
            {line: 1, type: 'variable declaration', name: 'a', condition: '', value: ''},
            {line: 2, type: 'variable declaration', name: 'b', condition: '', value: ''},
            {line: 3, type: 'variable declaration', name: 'c', condition: '', value: 'a + b'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing a simple while loop correctly', () => {
        let json = parseCode(
            'while(x<2){\n' +
            'i=1;\n' +
            '}'
        );
        let expected = [
            {line: 1, type: 'while statement', name: '', condition: 'x < 2', value: ''},
            {line: 2, type: 'assignment expression', name: 'i', condition: '', value: '1'},
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing a complex expression correctly', () => {
        let json = parseCode(
            'mid = (low + high)/2;\n'
        );
        let expected = [
            {line: 1, type: 'assignment expression', name: 'mid', condition: '', value: 'low + high / 2'},
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});


describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing if statement correctly', () => {
        let json = parseCode(
            'if(x){}'
        );
        let expected = [
            {line: 1, type: 'if statement', name: '', condition: 'x', value: ''},
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });

});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing if else statement correctly', () => {
        let json = parseCode(
            '  if(x){}\n' +
            '    else{y=5}'
        );
        let expected = [
            {line: 1, type: 'if statement', name: '', condition: 'x', value: ''},
            {line: 2, type: 'assignment expression', name: 'y', condition: '', value: '5'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing return statement correctly', () => {
        let json = parseCode('function binarySearch(X){\n' +
            '    return -1;\n' +
            '}');
        let expected = [
            {line: 1, type: 'function declaration', name: 'binarySearch', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'X', condition: '', value: ''},
            {line: 2, type: 'return statement', name: '', condition: '', value: '-1'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});


describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing simple function statement correctly', () => {
        let json = parseCode('function func(x,y){\n' +
            '}');
        let expected = [
            {line: 1, type: 'function declaration', name: 'func', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'x', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'y', condition: '', value: ''}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing complex function statement correctly', () => {
        let json = parseCode('function complex(x){\n' +
            '    let low, high;\n' +
            '    low = 0;\n' +
            '    high = n - 1;\n' +
            '}');
        let expected = [
            {line: 1, type: 'function declaration', name: 'complex', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'x', condition: '', value: ''},
            {line: 2, type: 'variable declaration', name: 'low', condition: '', value: ''},
            {line: 2, type: 'variable declaration', name: 'high', condition: '', value: ''},
            {line: 3, type: 'assignment expression', name: 'low', condition: '', value: '0'},
            {line: 4, type: 'assignment expression', name: 'high', condition: '', value: 'n - 1'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);});});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing UnaryExpression statement correctly', () => {
        let json = parseCode('let n=-1;');
        let expected = [
            {line: 1, type: 'variable declaration', name: 'n', condition: '', value: '-1'}


        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing member statement correctly', () => {
        let json = parseCode('let p=x[v];');
        let expected = [
            {line: 1, type: 'variable declaration', name: 'p', condition: '', value: 'x[v]'}


        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing block statement correctly', () => {
        let json = parseCode('function func(X, V, n){\n' +
            '  x=1;\n' +
            '}');
        let expected = [
            {line: 1, type: 'function declaration', name: 'func', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'X', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'V', condition: '', value: ''},
            {line: 1, type: 'variable declaration', name: 'n', condition: '', value: ''},
            {line: 2, type: 'assignment expression', name: 'x', condition: '', value: '1'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing else if statement correctly', () => {
        let json = parseCode(
            'if(x){}\n' +
            'else if(y){}\n' +
            'else{z=5}'
        );
        let expected = [
            {line: 1, type: 'if statement', name: '', condition: 'x', value: ''},
            {line: 2, type: 'else if statement', name: '', condition: 'y', value: ''},
            {line: 3, type: 'assignment expression', name: 'z', condition: '', value: '5'}
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});


describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });

    it('is parsing for statement correctly', () => {
        let json = parseCode(
            'for(i=0;i<10;i++){}'
        );
        let expected = [
            {line: 1, type: 'for statement', name: '', condition: 'i = 0 i < 10 i++', value: ''},
        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });
});

describe('The javascript parser', () => {
    afterEach(() => {
        deleteResults();
    });
    it('is parsing --x/++x in while correctly', () => {
        let json = parseCode(
            'while(x>3)\n' +
            '{++x;--x}'
        );
        let expected = [
            {line: 1, type: 'while statement', name: '', condition: 'x > 3', value: ''},
            {line: 2, type: 'update expression', name: '', condition: '', value: '++x'},
            {line: 2, type: 'update expression', name: '', condition: '', value: '--x'},

        ];
        resolveElements(json);
        assert.deepEqual(results, expected);
    });

});
