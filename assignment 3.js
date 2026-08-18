// 1 
// event loop : is a mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible
//2 
// libuv : is a multi-platform C library that provides support for asynchronous I/O operations in Node.js and her role is to handle the event loop and provide a consistent API for performing I/O operations across different platforms
//3 
// Node.js handles asynchronous operations through a combination of the V8 engine, libuv, and the event loop  
//4
// call stack : is a data structure that keeps track of the function calls in a program and their execution context, allowing the program to return to the correct point after a function call is completed while event queue : is a data structure that holds the messages and events that are waiting to be processed by the event loop, allowing the program to handle asynchronous operations in a non-blocking manner
//5 
// Node.js Thread Pool : is a pool of threads that can be used to perform CPU-intensive tasks in Node.js, allowing the event loop to continue processing other requests while the thread pool handles the heavy lifting. The thread pool is managed by libuv and can be configured to have a certain number of threads based on the application's needs.

// set pool size
//process.env.UV_THREADPOOL_SIZE = 4;
//6
// Node.js Handle blocking and non-blocking operations differently. Blocking operations, such as synchronous file I/O or CPU-intensive tasks, can block the event loop and prevent it from processing other requests. Non-blocking operations, on the other hand, are designed to be asynchronous and allow the event loop to continue processing other requests while waiting for the operation to complete. Node.js uses callbacks, promises, and async/await to handle non-blocking operations and ensure that the event loop remains responsive.
