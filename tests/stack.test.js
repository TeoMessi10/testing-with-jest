const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});


test('pop removes and returns top element and leavs top element on top ', () => {
    stack.push(5);
    stack.push(15);
    stack.push(25);
    expect(stack.pop()).toBe(25); // returnerar top elementet
    expect(stack.pop()).toBe(15); // kollar så att nästa element är överst
    expect(stack.pop()).toBe(5); // kollar att sista pop är kvar
}); 
