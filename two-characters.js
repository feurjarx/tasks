process.stdin.resume();
process.stdin.setEncoding('ascii');

let input_stdin = "";
let input_stdin_array = "";
let input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function unique(arr) {
    return arr.filter((it, i) => arr.indexOf(it) === i);
}

function getBaseFromLine(s) {
    return unique(s.split(''));
}

function getRegExpByBase(base) {

    const patternParts = [];
    base.forEach(function (ch) {
        patternParts.push(ch + '{2}');
    });

    return new RegExp(patternParts.join('|'), 'g');
}

function removeCharGlobalFromLine(ch, srcLine) {
    return srcLine.replace(new RegExp(ch, 'g'), '');
}

function getUnrepeatedPairs(arr) {

    const length = arr.length;
    const result = [];
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j <= length; j++) {
            if (arr[i] && arr[j]) {
                result.push([arr[i], arr[j]]);
            }
        }
    }

    return result;
}

function arrayDiff(a, b) {
    return  a.filter(function(x) { return b.indexOf(x) < 0 });
}

function maxLen(n, s){
    // Complete this function
    const lens = [0];

    const mainBase = getBaseFromLine(s);
    const pairs = getUnrepeatedPairs(mainBase);
    pairs.forEach(function (pair) {
        let line = s;

        //const removedChars = arrayDiff(mainBase, pair);
        const removedChars = mainBase.diff(pair);
        removedChars.forEach(function (ch) {
            line = removeCharGlobalFromLine(ch, line);
        });

        const regexp = getRegExpByBase(pair);
        if (!line.match(regexp)) {
            lens.push(line.length);
        }
    });

    return Math.max.apply(null, lens);
}

function main() {
    const n = parseInt(readLine());
    const s = readLine();
    const result = maxLen(n, s);

    process.stdout.write(result + "\n");
}
