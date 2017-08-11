import React, {Component, PropTypes} from "react";
export default class LazyImg extends Component {
  constructor(props){
    super(props);
    this.static={
      monitorEvent:["scroll","resize","touchmove"],
    }
  }
  componentDidMount() {
    const el = this.refs.lazyImg;
    this.removeEvent = this._removeEvent.bind(this);
    this.updateViewport = this._updateViewport.bind(this,el);
    for (let i = 0,len = this.static.monitorEvent.length; i < len; i++) {
      window.addEventListener(this.static.monitorEvent[i],this.updateViewport,true);
    }
    setTimeout(()=>{
      this.updateViewport(el);
    },0)
  }

  _updateViewport(el){
    if(this.isVisiable(el)){
      this.loadImg(el);
    }else{
    }
  }

  loadImg(el){
    const {originImg} = this.props;
    const img = new Image();
    img.src = originImg;
    img.addEventListener('load', () => {
      el.src = img.src;
      this.removeEvent();
    }, true);
    img.addEventListener('error', () => {
      console.log('load failed');
    }, true);

  };


  isVisiable(el){
    const bcr = el.getBoundingClientRect(); //取得元素在可视区的位置
    const {left,top,right,bottom} = this.props;
    const mw = el.offsetWidth; //元素自身宽度
    const mh = el.offsetHeight; //元素自身的高度
    const w = window.innerWidth; //视窗的宽度
    const h = window.innerHeight; //视窗的高度
    const boolX = (!((bcr.right - left) <= 0 && ((bcr.left + mw) - left) <= 0) && !((bcr.left + right) >= w && (bcr.right + right) >= (mw + w))); //上下符合条件
    const boolY = (!((bcr.bottom - top) <= 0 && ((bcr.top + mh) - top) <= 0) && !((bcr.top + bottom) >= h && (bcr.bottom + bottom) >= (mh + h))); //上下符合条件
    if (el.width != 0 && el.height != 0 && boolX && boolY) {
        return true;
    } else {
        return false;
    }
  }

  _removeEvent(){
    for (let i = 0,len = this.static.monitorEvent.length; i < len; i++) {
        window.removeEventListener(this.static.monitorEvent[i],this.updateViewport,true);
    }
  }

  componentWillUnmount(){
    for (let i = 0,len = this.static.monitorEvent.length; i < len; i++) {
        window.removeEventListener(this.static.monitorEvent[i],this.updateViewport,true);
    }
  }

  render(){
    const {defaultClass,defaultImg} = this.props;
    return (
      <img ref="lazyImg" className={defaultClass} src={defaultImg}/>
    )
  }
}

LazyImg.defaultProps = {
  top:0, //元素在顶部伸出的距离才加载
  right:0, //元素在右边伸出的距离才加载
  bottom:0, //元素在底部伸出的距离才加载
  left:0, //元素在左边伸出的距离才加载
  defaultClass:"",
  defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNgAAIAAAUAAen63NgAAAAASUVORK5CYII=",
  originImg:"",
};

LazyImg.propTypes = {
  defaultClass:PropTypes.string,
  defaultImg:PropTypes.string,
  originImg:PropTypes.string,
  top:PropTypes.number,
  right:PropTypes.number,
  bottom:PropTypes.number,
  left:PropTypes.number,
};
