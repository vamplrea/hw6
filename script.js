    // Name: David Huynh
    // Email: david_huynh@student.uml.edu
    // Major: C.S (Senior year) in course 91.61 GUI Programming I
    // Date Created: 08/05/2020
    // Short Description: Assigment 6 -  Creating an Interactive Dynamic Table by using Jquery validation plugin
    // Copyright (c) 2020 by David Huynh. All rights reserved

  // document.getElementById('rowStart').value = -50;
  // document.getElementById('rowEnd').value = 50;
  // document.getElementById('colStart').value = -50;
  // document.getElementById('colEnd').value = 50;


function render() {
    let rowStart = Number(document.getElementById('rowStart').value);
    //let rowStart = $('#rowStart').val(); -- Crashing the browser
    let rowEnd = Number(document.getElementById('rowEnd').value);
    //let rowEnd = $('#rowEnd').val();
    let colStart = Number(document.getElementById('colStart').value);
    //let colStart = $('#colStart').val();
    let colEnd = Number(document.getElementById('colEnd').value);
    //let colEnd = $('#colEnd').val();

    //get table #
    let rowHeader = rowStart;
    let colHeader = colStart;

    let table = '<table>';
    for (let k = colStart; k <= colEnd + 1; k++) {
        table += '<tr>'; //create one row for table
        for (let j = rowStart; j <= rowEnd + 1; j++) {
            if (k == colStart && j == rowStart) {
                //1 corner ks empty
                table += '<td>' + '' + '</td>'; //create a cell for table
            } else if (k == colStart) {
                //row header value
                table += "<td class ='header'>" + rowHeader + '</td>';
                rowHeader++;
            } else if (j == rowStart) {
                // column header value
                table += '<td >' + colHeader + '</td>';
                colHeader++;
            } else {
                // The rest of the table ktems
                if (k % 2 === 0 && j % 2 === 0 || (k % 2 !== 0 && j % 2 !== 0)) {
                    table += "<td class = 'both'>" + ((k - 1) * (j - 1)) + '</td>';
                } else {
                    table += "<td class = 'either'>" + ((k - 1) * (j - 1)) + '</td>';
                }
            }
        }
        table += '</tr>';// close tab 
    }
    table += '</table>'; // close 

    document.getElementById('render').innerHTML = table; //render table
    //return false;
}

$(function() {
    //validation method for ending number > starting number
    $.validator.addMethod("EndingGreaterThanStarting", function(value, element, param) {
        let $maximize = $(param);
        if (this.settings.onfocusout) {
            //after out of focus -> run this validation
            $maximize.off(".validate-EndingGreaterThanStarting").on("blur.validate-EndingGreaterThanStarting", function() {
                $(element).valid();
                //if return valid -> validation of color 
            });
        }
        //if ending number number > Starting number => true, else print the message
        return isNaN(parseInt($maximize.val())) || parseInt(value) >= parseInt($maximize.val());
    }, "Ending # must bigger than starting #");

    //validation method for starting number < ending number
    $.validator.addMethod("StartingLessThanEnding", function(value, element, param) {
        let $minimize = $(param);
        if (this.settings.onfocusout) {
            $minimize.off(".validate-StartingLessThanEnding").on("blur.validate-StartingLessThanEnding", function() {
                $(element).valid();
            });
        }
        //if start number  < end number = > true, else print the message
        return isNaN(parseInt($minimize.val())) || parseInt(value) <= parseInt($minimize.val());
    }, "Starting # must smaller than ending #");

      //Create a validation method for checking integer number
    $.validator.addMethod("isInt", function(value, element) {
        //if is int => true, else print the message
        return ((Number(value)) % 1 === 0);
    }, "Only Accept Integer");

    // validation method for checking integer number
  $.validator.addMethod("largeNumber", function(value, element) {
      //if is int -> true, else print the message
      return isNaN(parseInt(value)) || (Math.abs(parseInt(value)) <= 1000);
  }, "Only Accept Integer");

    //validation method for checking the range in 100
    $.validator.addMethod("checkRange", function(value, element, param) {
        let $maximize = $(param);
        if (this.settings.onfocusout) {
            $maximize.off(".validate-checkRange").on("blur.validate-checkRange", function() {
                $(element).valid();
                //valid color if return valid
            });
        }
        return isNaN(parseInt(value))|| isNaN(parseInt($maximize.val())) || (Math.abs(parseInt($maximize.val()) - (parseInt(value))) <= 100);
    });

    // query attribute "input_form"
    $("form[name='input_form']").validate({
        // validation rules
        rules: {
            rowStart: {
                required: true, //if input is blank, required input 
                number: true, //if Not integer, has to be a number
                isInt: true, // has to be an integer
                largeNumber: true, //not too large
                StartingLessThanEnding: '#rowEnd', // has to be smaller than end number
                checkRange: '#rowEnd', // has to be in a range
            },
            colStart: {
                required: true,
                number: true,
                isInt: true,
                largeNumber: true,
                StartingLessThanEnding: '#colEnd',
                checkRange: '#colEnd',
            },
            rowEnd: {
                required: true,
                number: true,
                isInt: true,
                largeNumber: true,
                EndingGreaterThanStarting: '#rowStart',
                checkRange: '#rowStart',
            },
            colEnd: {
                required: true,
                number: true,
                isInt: true,
                largeNumber: true,
                EndingGreaterThanStarting: '#colStart',
                checkRange: '#colStart',
            }
        },

        // get error messages
        messages: {
            rowStart: {
                required: "Only Accept Integer", //if input is blank
                number: "Only Accept Integer", //if Not integer
                checkRange: " Range Start & End should in 100", //if out of checkRange
                largeNumber: "The # is larger than 1000", //if The # is larger than 1000
            },
            rowEnd: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                checkRange: " Range Start & End should in 100",
                largeNumber: "The # is larger than 1000",
            },
            colStart: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                checkRange: " Range Start & End should in 100",
                largeNumber: "The # is larger than 1000",
            },
            colEnd: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                checkRange: " Range Start & End should in 100",
                largeNumber: "The # is larger than 1000",
            },
        },
        // Passed -> render the table
        submitHandler: function(form) {
            render();
        }
    });
});
