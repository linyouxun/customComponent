import React from 'react';
import LazyImg from "../components/LazyImg";

export default class LazyImgCtl extends React.Component {
  componentDidMount() {
    require('./lazyImgCtl.scss');
    // import from "./App.scss";
  }

  render() {
    const imgs2 = [];
    for (let i = 1; i < 13; i++) {
      imgs2.push("http://192.168.10.10:8081/" + i + ".png");
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
