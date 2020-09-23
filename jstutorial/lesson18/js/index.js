{
    let x = new Number(559595959);        
    console.log(typeof(x.valueOf()));
    console.log(x.toLocaleString());

    var abs = Math.abs(-36);
    console.log(abs);

    var goUp = Math.ceil(.00000001);
    console.log(goUp);

    var goDown = Math.floor(.99999);
    console.log(goDown);

    var powerUp = Math.pow(3, 2);
    console.log(powerUp);

    var roundUp = Math.round(4.9);
    console.log(roundUp);

    var roundDown = Math.round(5.1);
    console.log(roundDown);

    var isPositive = Math.sign(-Infinity);
    var isNegative = Math.sign(0);
    var isZero = Math.sign(Infinity);
    console.log(isPositive);
    console.log(isNegative);
    console.log(isZero);

    var getInt = Math.trunc(4.99999);
    console.log(getInt);
}