import React from 'react';
import LazyImg from "../components/LazyImg";
import "./lazyImgCtl.scss";

export default class LazyImgCtl extends React.Component {
  componentDidMount() {
    // require('./lazyImgCtl.scss');
    // import from "./App.scss";
    console.log('imgCtl');
  }

  render() {
    const imgs2 = [];
    for (let i = 1; i < 13; i++) {
      imgs2.push("/static/imgs/" + i + ".png");
    }
    return (
      <div>
        {
          imgs2.map((item, index) => {
            return (<LazyImg key={index} defaultClass="lazy-img" originImg={item}/>);
          })
        }
      </div>
    );
  }
}
