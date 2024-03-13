// 數字類型
export enum NumStatus {
  zero = "0",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
  dot = ".",
}
// 運算類型
export enum OperationStatus {
  none = "",
  plus = "+",
  minus = "-",
  multiply = "*",
  divide = "/",
}
// 與結果相關類型
export enum ResultRelates {
  reset = "C",
  delete = "DEL",
  equal = "="
}

export enum CalculatorActionTypes {
  InputChange = "InputChange",
  OperationPress = "OperationPress",
  Calculate = "Calculate",
  Reset = "Reset",
  Delete = "Delete"
}

interface InputChangeAction {
  type: CalculatorActionTypes.InputChange;
  payload: NumStatus;
}

interface OperationAction {
  type: CalculatorActionTypes.OperationPress;
  payload: OperationStatus;
}

interface ResultAction {
  type: CalculatorActionTypes.Calculate | CalculatorActionTypes.Reset | CalculatorActionTypes.Delete;
}

export type CalculatorAction = InputChangeAction | OperationAction | ResultAction;

export interface CalculatorStatus {
  input: string;
  result: number;
  operation: OperationStatus;
}

export const calculatorInit = {
  input: "",
  result: 0,
  operation: OperationStatus.none
}

// 保有修改彈性以符合更極端的需求修改，要思考js本身數值是採 i32 的基礎上做運算，
// 如果要擴充上限可能會需要擴充計算層面的邏輯

const calcInt = (state: CalculatorStatus): number => {
  console.log('checked calc result', state);
  switch(state.operation) {
    case OperationStatus.plus: return state.result + Number(state.input);
    case OperationStatus.minus: return state.result - Number(state.input);
    case OperationStatus.multiply: return state.result * Number(state.input);
    case OperationStatus.divide: return state.input !== "0" ? state.result / Number(state.input) : 0; // 防止除0的問題
    default: return state.result; 
  }
}

const calculatorReducer = (state: CalculatorStatus, action: CalculatorAction) => {
  switch (action.type) {
    case CalculatorActionTypes.InputChange: {
      const input = state.input === "0" && action.payload !== NumStatus.dot ? action.payload : state.input + action.payload;
      return { ...state, input: input.includes(".") && action.payload === NumStatus.dot ? state.input : input };
    }
    case CalculatorActionTypes.OperationPress: {
      // 這裡模擬真實計算機的操作行為而做的判斷
      const newResult = (state.operation !== OperationStatus.none && state.input && state.result !== 0) ? calcInt(state) : Number(state.input);
      return { input: "", result: newResult, operation: action.payload as OperationStatus };
    }
    case CalculatorActionTypes.Reset:
      return calculatorInit;
    case CalculatorActionTypes.Delete:
      return { ...state, input: state.input.substring(0, state.input.length - 1) };
    case CalculatorActionTypes.Calculate: {
      const result = calcInt(state);
      return { input: result.toString(), result, operation: OperationStatus.none };
    }
    default:
      return state;
  }
}

export default calculatorReducer;