/**
 * Created by gaoqikai on 4/24/16.
 */
Array.prototype.removeByValue = function(index,val) {
    for(var i=0; i<this.length; i++) {
        if(this[i][index] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

var arr = [{first:'zhang',last:'san'},{first:'li',last:'si'}];
arr.removeByValue('first','li');
console.log(arr)