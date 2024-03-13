import { FC, useCallback, useReducer } from "react";
import calculatorReducer, { CalculatorActionTypes, NumStatus, OperationStatus, ResultRelates, calculatorInit } from "../reducers/calculatorReducer";

// 這裡我本來的思路是想用一般的props drilling直接做完，
// 但還是想說改用reducer的方式會比較好維護，所以資料結構有所更動。
// 然後命名方式的話有思考關聯性，當然要全部寫在一起我覺得應該也沒太大的問題。

export const NumsBtn: FC<{ 
  num: NumStatus, 
  modify: (num: NumStatus) => void,
}> = ({ num, modify }) => {
  return <button className="bg-white rounded-lg hover:shadow w-full p-4" onClick={() => modify(num)}>{num}</button>;
}

export const OperationBtn: FC<{ 
  operStr: OperationStatus, 
  modify: (operation: OperationStatus) => void,
}> = ({ operStr, modify }) => {
  return <button className="bg-yellow-200 rounded-lg hover:shadow w-full p-4" onClick={() => modify(operStr)}>{operStr}</button>;
}

export const ControlBtn: FC<{ 
  ctrlStr: ResultRelates,
  modify: (results: ResultRelates) => void, 
}> = ({ ctrlStr, modify }) => {
  return <button className="bg-red-300 rounded-lg hover:shadow w-full p-4 h-full" onClick={() => modify(ctrlStr)}>{ctrlStr}</button>;
}

const Calculator:FC = () => {
  const [calInfos, dispatch] = useReducer(calculatorReducer, calculatorInit);
   // 處理所有數字操作
   const setInput = useCallback((input: NumStatus) => {
    dispatch({ type: CalculatorActionTypes.InputChange, payload: input });
  }, []);

  // 處理運算操作
  const setOperation = useCallback((operation: OperationStatus) => {
    dispatch({ type: CalculatorActionTypes.OperationPress, payload: operation });
  }, []);

  // 處理控制與結果相關操作
  const handleControlAction = useCallback((actionType: ResultRelates) => {
    switch(actionType){
      case ResultRelates.delete: return dispatch({type: CalculatorActionTypes.Delete});
      case ResultRelates.equal: return dispatch({type: CalculatorActionTypes.Calculate});
      case ResultRelates.reset: return dispatch({type: CalculatorActionTypes.Reset});
      default: return;
    }
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 rounded-xl bg-pink-200 p-4 place-items-center">
      <div className="col-span-4 p-4 rounded-lg bg-white w-full text-right">{calInfos.input || '0'}</div>
      <ControlBtn ctrlStr={ResultRelates.reset} modify={handleControlAction}/>
      <ControlBtn ctrlStr={ResultRelates.delete} modify={handleControlAction}/>
      <OperationBtn operStr={OperationStatus.divide} modify={setOperation}/>
      <OperationBtn operStr={OperationStatus.multiply} modify={setOperation}/>
      <NumsBtn num={NumStatus.seven} modify={setInput}/>
      <NumsBtn num={NumStatus.eight} modify={setInput}/>
      <NumsBtn num={NumStatus.nine} modify={setInput}/>
      <OperationBtn operStr={OperationStatus.minus} modify={setOperation}/>
      <NumsBtn num={NumStatus.four} modify={setInput}/>
      <NumsBtn num={NumStatus.five} modify={setInput}/>
      <NumsBtn num={NumStatus.six} modify={setInput}/>
      <OperationBtn operStr={OperationStatus.plus} modify={setOperation}/>
      <NumsBtn num={NumStatus.one} modify={setInput}/>
      <NumsBtn num={NumStatus.two} modify={setInput}/>
      <NumsBtn num={NumStatus.three} modify={setInput}/>
      <div className="row-span-2 w-full h-full">
        <ControlBtn ctrlStr={ResultRelates.equal} modify={handleControlAction}/>
      </div>
      <div className="col-span-2 w-full">
        <NumsBtn num={NumStatus.zero} modify={setInput}/>
      </div>
      <NumsBtn num={NumStatus.dot} modify={setInput}/>
    </div>
  );
}

export default Calculator;