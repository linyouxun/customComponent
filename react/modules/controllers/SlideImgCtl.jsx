import React from 'react';
// import LazyImg from "../components/LazyImg";
import SliderImgs from "../components/SliderImgs";

export default class SlideImgCtl extends React.Component {
  componentDidMount() {
    require('./slideImgCtl.scss');
    // import from "./App.scss";
  }
  render() {
    const imgs2 = [];
    for (let i = 1; i < 13; i++) {
      imgs2.push("http://192.168.10.10:8081/" + i + ".png");
    }
    return (
      <div>
        <SliderImgs imgs={imgs2} initClass='sss2'/>
      </div>
    );
  }
}
