import './jasmine-globals';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// In browser environment, window is the global object
// Jasmine is loaded by Karma into window scope
// Ensure jasmine and spyOn are available to all test modules
if (typeof (window as any).jasmine !== 'undefined') {
  // Create global references that can be accessed from test modules
  (window as any).jasmine = (window as any).jasmine;
  (window as any).spyOn = (window as any).spyOn;
  
  // Also try setting on globalThis for Node-like environments
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).jasmine = (window as any).jasmine;
    (globalThis as any).spyOn = (window as any).spyOn || (typeof spyOn !== 'undefined' ? spyOn : undefined);
  }
}

// Log the availability of Jasmine and spyOn
console.log('Jasmine available:', typeof (window as any).jasmine !== 'undefined');
console.log('spyOn available:', typeof (window as any).spyOn !== 'undefined');

// Fallback to ensure Jasmine and spyOn are globally available
if (typeof (window as any).jasmine === 'undefined') {
  (window as any).jasmine = jasmine;
  console.log('Jasmine initialized on window');
}
if (typeof (window as any).spyOn === 'undefined') {
  (window as any).spyOn = spyOn;
  console.log('spyOn initialized on window');
}

if (typeof globalThis !== 'undefined') {
  if (typeof (globalThis as any).jasmine === 'undefined') {
    (globalThis as any).jasmine = jasmine;
    console.log('Jasmine initialized on globalThis');
  }
  if (typeof (globalThis as any).spyOn === 'undefined') {
    (globalThis as any).spyOn = spyOn;
    console.log('spyOn initialized on globalThis');
  }
}

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
