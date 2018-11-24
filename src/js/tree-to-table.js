export let results = [];
export const deleteResults = () => results = [];
export function RowFunctionDefenition(json) {
    results.push({
        line: json.loc.start.line,
        type: 'function declaration',
        name: json.id.name,
        condition: '',
        value: ''
    });
    for (let parameter of json.params) {
        results.push({
            line: json.loc.start.line,
            type: 'variable declaration',
            name: parameter.name,
            condition: '',
            value: ''
        });
    }
    resolveElements(json.body);

}
export function RowProgram(json) {
    for (let item of json.body) {
        resolveElements(item);
    }
}
export function RowParserExpression(json) {
    if (json.type == 'BinaryExpression') {
        return RowParserExpression(json.left) + ' ' + json.operator + ' ' + RowParserExpression(json.right);
    }
    if (json.type == 'Identifier') {
        return json.name;
    }
    if (json.type == 'Literal') {
        return json.value;
    }
    return RowParserExpression2(json);

}

export function RowParserExpression2(json){
    if(json.type =='UnaryExpression'){return json.operator+''+RowParserExpression(json.argument);}
    if(json.type =='MemberExpression'){return RowParserExpression(json.object)+'['+RowParserExpression(json.property)+']';}
    if(json.type =='AssignmentExpression'){return RowParserExpression(json.left)+' '+json.operator+' '+RowParserExpression(json.right);}
    return RowParserExpression3(json);
}
export function RowParserExpression3(json){
    if(json.type =='UpdateExpression'){let x = json.prefix ? json.operator+''+json.argument.name : json.argument.name+''+json.operator;return x;}
}

export function RowExpressionStatement(json) {
    if(json.expression.type == 'AssignmentExpression') {
        results.push({
            line: json.loc.start.line,
            type: 'assignment expression',
            name: json.expression.left.name,
            condition: '',
            value: RowParserExpression(json.expression.right)
        });
    }
    else if (json.expression.type == 'UpdateExpression'){
        results.push({
            line: json.loc.start.line,
            type: 'update expression',
            name: '',
            condition: '',
            value: RowParserExpression(json.expression)
        });
    }
}

export function RowBlockStatement(json) {
    for (let item of json.body) {
        resolveElements(item);
    }
}

export function RowVariableDeclaration(json) {
    for (let dec of json.declarations) {
        resolveElements(dec);
    }

}

export function RowVariableDeclarator(json) {
    results.push({
        line: json.loc.start.line,
        type: 'variable declaration',
        name: json.id.name,
        condition: '',
        value: json.init == null ? '' : RowParserExpression(json.init)
    });
}

export function RowWhileStatement(json) {
    results.push({
        line: json.loc.start.line,
        type: 'while statement',
        name: '',
        condition: RowParserExpression(json.test),
        value: ''
    });
    resolveElements(json.body);
}

function RowIfStatement(json, first_time){
    results.push({
        line: json.loc.start.line,
        type: first_time === true ? 'else if statement' : 'if statement',
        name: '',
        condition: RowParserExpression(json.test),
        value: ''
    });
    resolveElements(json.consequent);
    if(json.alternate != null){
        if(json.alternate.test != null){
            RowIfStatement(json.alternate, true);
            return;
        }
        resolveElements(json.alternate);
    }
}

export function RowReturnStatement(json){
    results.push({
        line: json.loc.start.line,
        type: 'return statement',
        name: '',
        condition: '',
        value: RowParserExpression(json.argument)
    });
}

export function RowForStatement(json){
    results.push({
        line: json.loc.start.line,
        type: 'for statement',
        name: '',
        condition: RowParserExpression(json.init)+' '+RowParserExpression(json.test)+' '+RowParserExpression(json.update),
        value: ''
    });
    resolveElements(json.body);
}

export function resolveElements(json) {
    switch (json.type) {
    case 'Program':
        RowProgram(json);
        break;
    case 'FunctionDeclaration':
        RowFunctionDefenition(json);
        break;
    default:
        resolveElementsNext(json);

    }
}

export function resolveElementsNext(json) {
    switch (json.type) {
    case 'BlockStatement':
        RowBlockStatement(json);
        break;
    default:
        resolveElementsNextNext(json);
    }
}

export function resolveElementsNextNext(json) {
    switch (json.type) {
    case 'VariableDeclaration':
        RowVariableDeclaration(json);
        break;
    case 'VariableDeclarator':
        RowVariableDeclarator(json);
        break;
    default:
        resolveElementsNextNextNext(json);
    }
}

export function resolveElementsNextNextNext(json) {
    switch (json.type) {
    case 'ExpressionStatement':
        RowExpressionStatement(json);
        break;
    case 'WhileStatement':
        RowWhileStatement(json);
        break;
    default:
        resolveElementsNextNextNextNext(json);
    }
}

export function resolveElementsNextNextNextNext(json) {
    switch (json.type) {
    case 'IfStatement':
        RowIfStatement(json,false);
        break;
    case 'ReturnStatement':
        RowReturnStatement(json);
        break;
    default:
        resolveElementsNextNextNextNextNext(json);
    }
}

export function resolveElementsNextNextNextNextNext(json) {
    switch (json.type) {
    case 'ForStatement':
        RowForStatement(json);
        break;

    }
}
