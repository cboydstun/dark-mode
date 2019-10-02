import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};

export default () => {
  // create a variable in local storage
  // key is dark, value is false
  const [enabled, setEnabled] = useLocalStorage('dark', false);

  useEffect(() => {
    const className = 'dark-mode';
    // check to see if the value from useLocalStorage is true or false.
    if (enabled) {
      // If it's true, add the class dark-mode to the body element.
      document.body.classList.add(className);
    } else {
      // If it's false, remove the class from the body element.
      document.body.classList.remove(className);
    }
    // function will re-run every time the enabled variable changes
  }, [enabled]);

  //  Let's just forward the value and the setter that were returned out of the useLocalStorage call. Return those two values in an array as well.
  return [enabled, setEnabled];
};