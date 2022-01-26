const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
   const checkString = function (expr) {
        let round
        if (expr.length % 10 === 0) {
            return expr
        } else {
            round = Math.ceil(expr.length / 10) * 10;
            return expr.padStart(round, '0')
        }
    }

    function getArrayTen(expr) {

        let newStr = checkString(expr)

        let arr = []
        for (let i = 0; i < newStr.length; i = i + 10) {
            arr.push(newStr.slice(i, i + 10))
        }

        let arr3 = arr.map(el => el.split('00'))
        let arr4 = []
        for (let i = 0; i < arr3.length; i++) {
            arr4[i] = arr3[i].filter(el => el !== '')
        }
        let arr5 = []
        for (let i = 0; i < arr4.length; i++) {
            for (let k = 0; k < arr4[i].length; k++) {
                arr5.push(arr4[i][k].match(/.{1,2}/g))
            }
        }

        let srtFinish = '';
        const objLetter = {
            '11': '-',
            '10': '.',
            '**': ' '
        }
        for (let i = 0; i < arr5.length; i++) {
            srtFinish += ' '
            for (let k = 0; k < arr5[i].length; k++) {
                srtFinish += objLetter[arr5[i][k]]
            }
        }
        return srtFinish
    }
    let morseCode = getArrayTen(expr)
    const decodeLetter = letter => {
        return MORSE_TABLE[letter];
    }

    const decodeWord = word => {
        return word.split(' ').map(decodeLetter).join('');
    }

    return morseCode.trim().split('      ').map(decodeWord).join(' ');
}

module.exports = {
    decode
}
