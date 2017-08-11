import React, {Component, PropTypes} from "react";
export default class SliderImgs extends Component {
  constructor(props){
    super(props);
    this.state={
       curIndex:0,
     }
     this.static={
       count:0,
       clearTimeout:"",
       touchPos:{
         pageX:0,
         pageY:0,
         moveX:0,
       }
     }
  }
  componentDidMount(){
    // require('./App.scss');
    const {initClass} = this.props;
    this.static.count = document.querySelectorAll("."+initClass)[0].firstChild.children.length;
    this.slideStartEvent = this._slideStartEvent.bind(this,document.querySelectorAll("."+initClass)[0]);
    this.slideMoveEvent = this._slideMoveEvent.bind(this,document.querySelectorAll("."+initClass)[0]);
    this.slideEndEvent = this._slideEndEvent.bind(this,document.querySelectorAll("."+initClass)[0]);

    document.querySelectorAll("."+initClass)[0].addEventListener("touchstart",this.slideStartEvent,true);
    document.querySelectorAll("."+initClass)[0].addEventListener("touchmove",this.slideMoveEvent,true);
    document.querySelectorAll("."+initClass)[0].addEventListener("touchend",this.slideEndEvent,true);
  }

  _slideStartEvent(target,e){
    e.stopPropagation();
    target.firstChild.style.transitionDuration = "";
    this.static.touchPos.pageX = e.targetTouches[0].pageX;
    this.static.touchPos.pageY = e.targetTouches[0].pageY;
    this.static.touchPos.moveX = this.getTranslate(target.firstChild);
  }

  getTranslate(el){
    let /*matrix,*/ curTransform, curStyle, transformMatrix;
    curStyle = window.getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
        transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
        curTransform = transformMatrix.m41
    }
    else {
      alert("你的手机暂时不支持滑动查看图片");
      this.removeEvent();
    }
    return curTransform||0;
  }


  //事件
  _slideMoveEvent(target,e){
    e.stopPropagation();
    const x = e.targetTouches[0].pageX - this.static.touchPos.pageX + this.static.touchPos.moveX;
    if(target.firstChild.style.WebkitTransform){
      target.firstChild.style.WebkitTransitionDuration = "0ms";
      target.firstChild.style.WebkitTransform = "translate3d("+x+"px, 0px, 0px)";
    }else{
      target.firstChild.style.WebkitTransitionDuration = "0ms";
      target.firstChild.style.WebkitTransform = "translate3d(0px, 0px, 0px)";
      if(target.firstChild.style.transform){
        target.firstChild.style.transitionDuration = "0ms";
        target.firstChild.style.transform = "translate3d("+x+"px, 0px, 0px)";
      }else{
        target.firstChild.style.transitionDuration = "0ms";
        target.firstChild.style.transform = "translate3d(0px, 0px, 0px)";
      }
    }
  }
  //事件
  _slideEndEvent(target,e){
    e.stopPropagation();
    target.scrollLeft = 0;
    this.static.touchPos={pageX:0,pageY:0,};
    const width = target.offsetWidth;
    const moveEndY = this.getTranslate(target.firstChild);
    const curCount = this.posLeft(width,moveEndY);
    this.setState({
      curIndex:Math.abs(curCount),
    });
    setTimeout(()=>{
      target.firstChild.style.WebkitTransitionDuration = "";
      target.firstChild.style.WebkitTransform = "translate3d("+(curCount*width)+"px, 0px, 0px)";
    },0);
  }
  posLeft(width,left){
    let curCount = Math.floor(left / width + 0.5);
    if(curCount > 0 ){
      curCount = 0;
    }else if(curCount + this.static.count < 1){
      curCount = 1 - this.static.count;
    }
    return curCount;
  }

  removeEvent(){
    const {initClass} = this.props;
    document.querySelectorAll("."+initClass)[0].removeEventListener("touchstart",this.slideStartEvent,true);
    document.querySelectorAll("."+initClass)[0].removeEventListener("touchmove",this.slideMoveEvent,true);
    document.querySelectorAll("."+initClass)[0].removeEventListener("touchend",this.slideEndEvent,true);
  }

  componentWillUnmount(){
    this.removeEvent();
  }


  render(){
    const {imgs,initClass} = this.props;
    return (
      <div className={`slider-container ${initClass}`}>
        <div className="slider">
          {
            imgs.map((item,index)=>{
              return (
                <div key={index}>
                  <img src={item}/>
                </div>
              )
            })
          }
        </div>
        <div className="slider-pagination">
          {
            imgs.map((item,index)=>{
              return (
                <span key={index} className={this.state.curIndex==index?"active":""}></span>
              )
            })
          }
        </div>
      </div>
    )
  }
}

SliderImgs.defaultProps = {
  initClass:"img-slider",
  imgs:[],
};

SliderImgs.propTypes = {
  initClass:PropTypes.string,
  imgs:PropTypes.array,
};
