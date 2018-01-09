1.0.0
配置

# 重大更新，react15更新到16 [官方链接](https://github.com/facebook/react/releases)
> 更新的内容：


- **render 返回数据支持扩展**

  > 现支持 ` string array numble bool null dom`
- **错误处理**
  >新增生命周期函数 componentDidCatch(error, info)

- **ReactDOM.createPortal**
  - Portal 本身不是新的概念，在以往使用 React 实现模态框等组件时我们也会用到，现在 React 官方提供了 API 使得能够更方便地实现这样的功能。
  - 在一般的 React 结构中，组件的嵌套关系和渲染出来的 DOM 的嵌套关系是一致的（子组件渲染出的 DOM 一定是在父组件渲染出的 DOM 的内部的）。
  - 但某些情况下，这样的限制会导致问题，例如实现一个模态框（Modal），虽然模态框所在的组件在它的父组件内部，但是通常需要被渲染在 body 元素下。 新的 API 使用方式如下：

  ```jsx
    render() {
      // React 会在你提供的 domNode 下渲染，而不是在当前组件所在的 DOM
      return ReactDOM.createPortal(
        this.props.children,
        domNode,
      );
    }
  ```

- 重构内部算法


- 更小的体积
  - react 是 5.3 kb (2.2 kb gzipped)，之前是 20.7 kb (6.9 kb gzipped).
  - react-dom 是 103.7 kb (32.6 kb gzipped)，之前是 141 kb (42.9 kb gzipped).
  - react + react-dom 是 109 kb (34.8 kb gzipped)，之前是 161.7 kb (49.8 kb gzipped).

    |             | react(old)       | react-dom(old)     | react + react-dom(old)    |
    |--           | -----       | :-------:     | -----------------:|
    |not gzipped  | 5.3 kb(20.7 kb)      | 103.7 kb(141 kb )      |  109 kb     (161.7 kb)          |
    | gzipped     | 2.2 kb    (6.9 kb )  | 32.6 kb   (42.9 kb)    |  34.8kb       (49.8 kb)      |

- 部分非核心模块被移出
  >React.createClass 、 React.PropTypes 等模块被移出了 react 包

- 基于 MIT 协议
