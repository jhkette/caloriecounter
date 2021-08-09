# Functional programming course App 2

Functional programming uses pure functions, higher order functions and closures

* Pure functions
    * The function always returns the same result if the same arguments are passed in. It does not depend on any state, or data, change during a program’s execution. It must only depend on its input arguments.
    * The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.
        * Side effects include:
            * Making a HTTP request
            * Mutating data
            * Printing to a screen or console
            * DOM Query/Manipulation
            * Math.random()
            * Getting the current time

## Important side notes

What is a Closure?
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.