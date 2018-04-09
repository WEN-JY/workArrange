

"use strict";
exports.__esModule = true;

exports.__deepClone =(obj) => {
    var newobj = obj instanceof Array ? [] : {};
    for (var index in obj) {
        if (obj.hasOwnProperty(index)) {
            newobj[index] = Number(obj[index]);
        }
    }
    return newobj;
};

