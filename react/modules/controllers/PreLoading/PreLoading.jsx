import React from 'react';
import './PreLoading.scss';

const ItemCell = (item) => {
  // 判断item为空
  if (Object.getOwnPropertyNames(item).length == 0) {
    return (<div className='p-item-cell flex padding-left padding-right'>
      <div className='flex-w50'>
        <div className='p-img loading-block'></div>
      </div>
      <div className='flex-1 padding-left'>
        <p className='p-cell-title loading-block' style={{width:'100%'}}></p>
        <p className='p-cell-desc loading-block' style={{width:'100%'}}></p>
      </div>
    </div>)
  }
  return (<div className='p-item-cell flex padding-left padding-right'>
    <div className='flex-w50'>
      <img src={item.src} className='p-img'/>
    </div>
    <div className='flex-1 padding-left'>
      <p className='p-cell-title '>{item.title}</p>
      <p className='p-cell-desc'>{item.desc}</p>
    </div>
  </div>)
}


export default class PreLoading extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    let list = [];
    for (let i = 0 ; i < 3 ; i++) {
      list.push({
        src: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
        title: 'perloading' + i,
        desc: 'perloading desc' + i
      })
    }
    return (<div className='preloading'>
        {list.map((item,i) => <ItemCell {...item} key={i}/>)}
        <ItemCell/>
    </div>);
  }
}
