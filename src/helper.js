export const isDOMElement = target => target instanceof Element;

export const isString = target => typeof target === 'string';

export const getParentElement = target => {
  return isDOMElement(target)
    ? target
    : isString(target)
    ? document.querySelector(target)
    : undefined;
};
