# 請務必閱讀這裡的內容

## 需求推倒
採用一般傳統計算機功能來做功能開發，主要針對簡單的加減乘除功能做基本運算。
有處理連續運算功能，即 1 + 1 + 3 - 4 這類的連續運算。
1. 簡單單元運算
2. 連續接續運算

## 檔案架構關系
1. 拆分為大類組件，按需求所以統一放在 components/Calculator.tsx 裏面，<br/>不考慮再做拆分主要是需求比較簡單。
2. 狀態考慮使用原生的 useReducer 來處理，因為複雜度不是太高，<br/>所以沒有打算採用 context 的形式做傳遞，而是透過處理簡單的 props drilling，<br/>這部分我是比較開放的，如果是工作需要要採用第三方套件來處理我也是可以配合的，<br/>但我在技術選型的時候，會去參考實際需求的複雜度來做衡量。
3. initialState 和 reducer 我通常會放在 store 類別的資料夾下分類管理，這裡我是放在 reducers 的資料夾下，這是我通常會處理的方法，詳細可以參考[我的Medium](https://medium.com/@LeeLuciano/react-%E6%B4%97%E8%8F%9C-%E8%B3%87%E6%96%99%E5%A4%BE%E7%B5%90%E6%A7%8B-244b3fa39801)。
4. 這裡的UI因為沒有特別要求，所以我採用tailwincss的方式處理，想了解我對CSS的理解可以參考[我的Medium文章](https://medium.com/@LeeLuciano/react-%E6%B4%97%E8%8F%9C-ui-library%E7%9A%84%E9%81%B8%E6%93%87-f3a6b2648998)。

## 請務必瞭解
1. 這裡必須提醒 javascript 在處理數字運算時，採用的是 i32 的 int 格式，<br/>代表有計算的上限和下限，這個東西是計算機基本概論會提及的問題，<br/>這個問題不是只會發生在 js，而是所有語言的共同問題，[請參閱](https://en.wikipedia.org/wiki/IEEE_754-1985)。
2. 這裡不想採用 input tag 是希望限制用戶的輸入行為，來降低未預期狀況的錯誤發生，一樣不是必要，<br/>如果想知道更多我熟悉 react form hook 操作的程度，可以參考[我的Medium文章](https://medium.com/@LeeLuciano/react-hook-form-mui-yup-edbb5ca922f5)或是[我的github教學](https://github.com/Luciano0322/react_course_vite/tree/master/react-hook-form)。
3. 關於浮點數運算如果需要在工作場域使用的話我們通常會用指定的第三方庫來處理，ex: decimal.js, 這邊我是採用10進位的整數相加處理。

## 測試項目
1. 基本的加減乘除
2. 浮點數基本運算
3. 0 和 . 的處理是否符合一般計算機的處理。
4. 連續運算的正確性