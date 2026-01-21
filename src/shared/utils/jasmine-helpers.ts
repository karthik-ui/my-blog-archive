// jasmine-helpers.ts

/**
 * Helper function to get the Jasmine global object at runtime.
 * Throws an error if Jasmine is not available.
 */
export function getJasmine(): typeof jasmine {
  if (typeof jasmine === 'undefined') {
    throw new Error('Jasmine is not available. Ensure this test is running with Karma test runner that includes Jasmine.');
  }
  return jasmine;
}

/**
 * Helper function to create a spy.
 */
export function createSpy(name: string, originalFn?: (...args: any[]) => any): jasmine.Spy {
  return getJasmine().createSpy(name, originalFn);
}

/**
 * Helper function to create a spy object.
 */
export function createSpyObj(baseName: string, methodNames: string[]): jasmine.SpyObj<any> {
  return getJasmine().createSpyObj(baseName, methodNames);
}

/**
 * Helper function to get the spyOn global function at runtime.
 * Throws an error if spyOn is not available.
 */
export function getSpyOn(): (object: any, method: string | symbol | number) => jasmine.Spy {
  const spyOnFn = (globalThis as any).spyOn;
  if (!spyOnFn) {
    throw new Error('spyOn is not available. Ensure this test is running with Karma test runner that includes Jasmine.');
  }
  return spyOnFn;
}

/**
 * Helper function to spy on a method of an object.
 */
export function spyOnMethod<T>(object: T, methodName: keyof T): jasmine.Spy {
  return getSpyOn()(object, methodName as string);
}