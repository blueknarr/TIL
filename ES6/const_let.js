/* ES5 */
var name = 'me';
var title = 'software developer';
var workHour = '9 am to 6 pm'

/* ES6 */
const name = 'me';
let title = 'software developer';
let workHour = '1 pm to 6 pm';

function count(targetString){
    const characters = ['a','e','i','o','u'];
    const number = targetString.split('').reduce(function(acc,char){
        if(characters.includes(char)){
            acc++;
        }
        return acc;
    },0);
    return number;
}