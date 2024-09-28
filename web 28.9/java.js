function sumToN() {
    const n = parseInt(document.getElementById('number').value);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    document.getElementById('result').innerHTML = `Tổng từ 1 đến ${n} là: ${sum}`;
}

function sumEvenToN() {
    const n = parseInt(document.getElementById('number').value);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            sum += i;
        }
    }
    document.getElementById('result').innerHTML = `Tổng các số chẵn từ 1 đến ${n} là: ${sum}`;
}

function sumOddToN() {
    const n = parseInt(document.getElementById('number').value);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (i % 2 !== 0) {
            sum += i;
        }
    }
    document.getElementById('result').innerHTML = `Tổng các số lẻ từ 1 đến ${n} là: ${sum}`;
}

function checkPrime() {
    const n = parseInt(document.getElementById('number').value);
    if (n < 2) {
        document.getElementById('result').innerHTML = `${n} không phải là số nguyên tố.`;
        return;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            document.getElementById('result').innerHTML = `${n} không phải là số nguyên tố.`;
            return;
        }
    }
    document.getElementById('result').innerHTML = `${n} là số nguyên tố.`;
}

function findGCD() {
    const a = parseInt(document.getElementById('numberA').value);
    const b = parseInt(document.getElementById('numberB').value);

    function gcd(x, y) {
        while (y !== 0) {
            let temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    }

    const gcdResult = gcd(a, b);
    document.getElementById('result').innerHTML = `UCLN của ${a} và ${b} là: ${gcdResult}`;
}
