function fib(max){
    let a=0,b=1;
    var arr=[0,1];
    let i=2
    while (arr.length<max){
    //    arr[i++]=a+b
    //     let temp;
    //     temp=a;
    //     a=b;
    //     b=temp+b;
    [a,b]=[b,a+b];
    arr.push(b);
    }
    return arr;
}
console.log(fib(5));