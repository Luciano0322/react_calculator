import { render, screen, fireEvent } from "@testing-library/react";
import { NumStatus, OperationStatus, ResultRelates } from "../reducers/calculatorReducer";
import Calculator, { ControlBtn, NumsBtn, OperationBtn } from "./Calculator";

describe('NumsBtn', () => {
  test('按鈕1被觸發且modify確定有和num傳入值相等', () => {
    const modifyMock = jest.fn();
    render(<NumsBtn num={NumStatus.one} modify={modifyMock} />);   
    fireEvent.click(screen.getByText(NumStatus.one));
    expect(modifyMock).toHaveBeenCalledWith(NumStatus.one);
  });
});

describe('OperationBtn', () => {
  test('按鈕+被觸發且modify確定有和operStr傳入值相等', () => {
    const modifyMock = jest.fn();
    render(<OperationBtn operStr={OperationStatus.plus} modify={modifyMock} />);
    fireEvent.click(screen.getByText(OperationStatus.plus));
    expect(modifyMock).toHaveBeenCalledWith(OperationStatus.plus);
  });
});

describe('ControlBtn', () => {
  test('按鈕reset被觸發且modify確定有和ctrlStr傳入值相等', () => {
    const modifyMock = jest.fn();
    render(<ControlBtn ctrlStr={ResultRelates.reset} modify={modifyMock} />);
    fireEvent.click(screen.getByText(ResultRelates.reset));
    expect(modifyMock).toHaveBeenCalledWith(ResultRelates.reset);
  });
});

describe('Calculator', () => {
  test('測試 Calculator 加法運算', () => {
    render(<Calculator />);
    // 確認數字按鈕渲染
    fireEvent.click(screen.getByText(NumStatus.one));
    fireEvent.click(screen.getByText(NumStatus.zero)); 
    // 假設情境 10 + 5 = 15
    // 確認運算行為
    fireEvent.click(screen.getByText(OperationStatus.plus));
    // 點擊第二項數字
    fireEvent.click(screen.getByText(NumStatus.five)); 
    // 點擊運算處理
    fireEvent.click(screen.getByText(ResultRelates.equal)); 

    // 檢查是否顯示正確為15
    expect(screen.getByText('15'))
  });

  test('測試 Calculator 重置處理', () => {
    render(<Calculator />);
    // 試減法邏輯 5 - 3 = 2
    fireEvent.click(screen.getByText(NumStatus.five));
    fireEvent.click(screen.getByText(OperationStatus.minus));
    fireEvent.click(screen.getByText(NumStatus.three));
    fireEvent.click(screen.getByText(ResultRelates.equal)); 

    // 嘗試點擊reset看是否有重置
    fireEvent.click(screen.getByText(ResultRelates.reset));

    // 確認顯示欄位是否重置
    expect(screen.queryByText('2')).not.toBe('2'); // 希望顯示不再為2
  });

  test('測試 Calculator 修改處理', () => {
    render(<Calculator />);
    // 試乘法邏輯 5.2 * 3.3 = 17.16
    fireEvent.click(screen.getByText(NumStatus.five));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(OperationStatus.multiply));
    fireEvent.click(screen.getByText(NumStatus.three));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.three));
    fireEvent.click(screen.getByText(ResultRelates.equal)); 

    // 嘗試點擊delete看是否有刪除一個位數
    fireEvent.click(screen.getByText(ResultRelates.delete));

    // 確認顯示欄位是否為期待的結果
    expect(screen.getByText('17.1')); // 希望顯示為17.1
  });

  test('測試 Calculator 除法程序', () => {
    render(<Calculator />);
    // 試除法邏輯 12 / 2.5 = 4.8
    fireEvent.click(screen.getByText(NumStatus.one));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(OperationStatus.divide));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.five));
    fireEvent.click(screen.getByText(ResultRelates.equal)); 
    // 確認顯示欄位是否為期待的結果
    expect(screen.getByText('4.8')); 
  });

  test('測試 0 的按鈕處理', () => {
    render(<Calculator />);
    // 處理字串00在前面不該出現的情況
    fireEvent.click(screen.getByRole("button", { name: NumStatus.zero }));
    fireEvent.click(screen.getByRole("button", { name: NumStatus.zero }));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.five));
    // 確認顯示欄位是否為期待的結果
    expect(screen.getByText('2.5')); 
  });

  test('測試 . 的按鈕處理', () => {
    render(<Calculator />);
    // 不應該出現兩個點
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.five));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.eight));
    fireEvent.click(screen.getByText(NumStatus.dot));
    fireEvent.click(screen.getByText(NumStatus.one));
    
    // 確認顯示欄位是否為期待的結果
    expect(screen.getByText('2.581'));
  });

  test('測試連續運算', () => {
    render(<Calculator />);
    // 與一般老式計算機同原理，假設5 + 2 - 3 * 9 / 2 = 18
    // 即不會去管先乘除後加減原理
    fireEvent.click(screen.getByText(NumStatus.five));
    fireEvent.click(screen.getByText(OperationStatus.plus));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(OperationStatus.minus));
    fireEvent.click(screen.getByText(NumStatus.three));
    fireEvent.click(screen.getByText(OperationStatus.multiply));
    fireEvent.click(screen.getByText(NumStatus.nine));
    fireEvent.click(screen.getByText(OperationStatus.divide));
    fireEvent.click(screen.getByText(NumStatus.two));
    fireEvent.click(screen.getByText(ResultRelates.equal)); 
    
    // 確認顯示欄位是否為期待的結果
    expect(screen.getByText('18'));
  });

});