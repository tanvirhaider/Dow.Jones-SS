

// -------- ******* UTILITY ******* --------- 

function createClass(name,rules)
{
    var style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule)  {(style.styleSheet || style.sheet).addRule(name, rules);}
    else {style.sheet.insertRule(name+"{"+rules+"}",0);}
}


function arrayOfset(array) {
    var tempArray = [];
    for (var i = 0; i < array.length - 1; i++) {
        tempArray.push(array[i + 1]);
    }
    tempArray.push(array[0]);
    return tempArray;
  }