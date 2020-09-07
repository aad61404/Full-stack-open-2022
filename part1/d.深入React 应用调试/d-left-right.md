https://fullstackopen.com/zh/part1/%E6%B7%B1%E5%85%A5_react_%E5%BA%94%E7%94%A8%E8%B0%83%E8%AF%95

basic 版本介紹 useState(0) 使用方式程式碼 較短
但節省了很多 概念

v1 表現較為清楚
v2 則是v2 複雜版
最終看到 if () else

-----------------------------------------
下列為筆記

一些讀者可能想知道為什麼我們不直接更新狀態，像這樣：
```
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
```

這個應用似乎可以工作。但是，這違反了React中狀態不可直接修改的原則，因為它會導致意想不到的替代。必須始終通過將狀態設置為新對象來更改狀態。如果之前的狀態沒有變化，屬性只需需要簡單地複制，就是通過將這些屬性複製到新的對像中，變成其設置為新狀態。


當出現左按鈕時，我們將字母L添加到allClicks片斷中：
```
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}
```
存儲在allClicks中的狀態塊現在被設置為一個數組，該數組包含前一個狀態數組的所有項以及字母L。向數組中添加新元素是通過concat方法完成的，該方法不改變現有數組，而是返回批次新副本，可以添加元素到該副本中。

正如前面提到的，在JavaScript的中也可以使用推方法將元素添加到數組中如果我們通過將元素推到allClicks數組，然後更新狀態這種方法來添加元素，應用看起來仍然可以工作：
```
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```
但是，不要這樣做。 如前所述，React 组件(如 allClicks )的狀態不能直接更改。 即使改变狀態在某些情况下可以工作，也可能導致很難調適的问题。

