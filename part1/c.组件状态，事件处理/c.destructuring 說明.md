Refactoring the components
【重構組件】

顯示計數器值的組件如下：

```
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
```

該組件只使用其道具的計數器區段。

這意味著我們可以使用解構簡化組件，如下所示：
```
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}
```

定義組件的方法只包含return語句，因此

我們可以使用更精確的箭頭函數來定義方法：

```
const Display = ({ counter }) => <div>{counter}</div>
```

我們也可以簡化Button組件。

```
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
```

我們可以使用解構，只從道具獲取所需的細分，並使用更簡化的箭頭函數：

```
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
```