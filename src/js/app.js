import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {resolveElements, results} from './tree-to-table';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));

        resolveElements(parsedCode);
        printTableToScreen(results);
    });
});

function printTableToScreen(matrix) {

    for (let row of matrix) {

        $('#ParsedView').append(
            `
        <tr align="center">
            <td>${row.line}</td>
            <td>${row.type}</td>
            <td>${row.name}</td>
            <td>${row.condition}</td>
            <td>${row.value}</td>
        </tr>
        `
        );
    }
}

//
//
// for(let parsedRow of parsedCode.body){
// let resolvedCode = resolveElements(parsedRow);
// for(let line of resolvedCode){
//     $('#ParsedView').append(
//         '<tr align="center">'+
//         '<td>' + line.line + '</td>'+
//         '<td>' + line.type + '</td>'+
//         '<td>' + line.name + '</td>'+
//         '<td>' + line.condition + '</td>'+
//         '<td>' + line.value + '</td>'+
//         '</tr>');
// }
// }