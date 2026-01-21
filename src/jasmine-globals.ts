// Jasmine globals declaration and exposure for test environment
// Karma loads jasmine into the test environment, but we need to ensure
// it's accessible to our modules

// import 'jasmine'; // Removed: jasmine is provided by Karma globally, not as a module

// Type declaration for the spyOn function
declare global {
  function spyOn(object: any, method: string | symbol | number): jasmine.Spy;
}

// In browser/Karma test environment, jasmine is loaded globally
// TypeScript @types/jasmine provides the jasmine namespace declaration

// Ensure globals are available (Karma provides these automatically)
// This is just for type checking - the runtime values come from Karma

export {};


