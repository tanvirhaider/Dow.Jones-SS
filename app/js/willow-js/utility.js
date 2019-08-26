

// -------- ******* UTILITY ******* --------- 

function createClass (name, rules) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule) { (style.styleSheet || style.sheet).addRule(name, rules); }
    else { style.sheet.insertRule(name + "{" + rules + "}", 0); }
}


function arrayOfset (array) {
    var tempArray = [];
    for (var i = 0; i < array.length - 1; i++) {
        tempArray.push(array[i + 1]);
    }
    tempArray.push(array[0]);
    return tempArray;
}




function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
