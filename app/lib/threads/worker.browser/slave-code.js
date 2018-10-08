/* eslint-env worker */
/* global importScripts */
/* eslint-disable no-console */
self.module = {
  exports() {
    if (console) {
      console.error('No thread logic initialized.');
    }
  }
};

function handlerDone() {
  const args = Array.prototype.slice.call(arguments, 0);
  this.postMessage({ response: args });
}

function handlerProgress(progress) {
  this.postMessage({ progress });
}

function handlerError(error) {
  // Need to clone error manually to avoid DataCloneError, since errors cannot be send
  const cloned = {
    message: error.message,
    name: error.name,
    stack: error.stack
  };
  this.postMessage({ error: cloned });
}

function handlerDoneTransfer() {
  const args = Array.prototype.slice.call(arguments);
  const lastArg = args.pop();

  if (!(lastArg instanceof Array) && this.console) {
    console.error(
      'Expected 2nd parameter of <doneCallback>.transfer() to be an array. Got:',
      lastArg
    );
  }

  this.postMessage({ response: args }, lastArg);
}

function isPromise(thing) {
  return thing && typeof thing.then === 'function';
}

self.onmessage = function(event) {
  const scripts = event.data.scripts;
  if (scripts && scripts.length > 0 && typeof importScripts !== 'function') {
    throw new Error('importScripts() not supported.');
  }

  if (event.data.initByScripts) {
    importScripts(...scripts);
  }

  if (event.data.initByMethod) {
    // Clear `this.module.exports` first, to avoid trouble with importScripts' CommonJS detection
    delete this.module.exports;

    if (scripts && scripts.length > 0) {
      importScripts(...scripts);
    }

    const method = event.data.method;
    this.module.exports = Function(...method.args.concat(method.body));
  }

  if (event.data.doRun) {
    const handler = this.module.exports;
    if (typeof handler !== 'function') {
      throw new Error('Cannot run thread logic. No handler has been exported.');
    }

    const preparedHandlerDone = handlerDone.bind(this);
    preparedHandlerDone.transfer = handlerDoneTransfer.bind(this);

    const returned = handler.call(
      this,
      event.data.param,
      preparedHandlerDone,
      handlerProgress.bind(this)
    );

    if (isPromise(returned)) {
      returned.then(preparedHandlerDone, handlerError.bind(this));
    }
  }
}.bind(self);
