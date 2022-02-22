import { useReducer } from 'react/cjs/react.production.min';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'SET_ENTERED_VALUE') {
    return {
      ...state,
      value: action.value,
    };
  }
  if (action.type === 'SET_IS_TOUCHED') {
    return {
      ...state,
      isTouched: true,
    };
  }
  if (action.type === 'RESET') {
    return {
      ...action.value,
    };
  }

  return state;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //   const [enteredValue, setEnteredValue] = useState('');
  //   const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({
      type: 'SET_ENTERED_VALUE',
      value: event.target.value,
    });
    // setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    dispatch({
      type: 'SET_IS_TOUCHED',
    });
  };

  const reset = () => {
    dispatch({
      type: 'RESET',
      value: initialInputState,
    });
    // setEnteredValue('');
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
