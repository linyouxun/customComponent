import React from 'react';
// import LazyImg from "../components/LazyImg";
import Spin, {Loading} from "../components/Spin";
import './SpinCpm.scss';

export default class SpinCpm extends React.Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <Spin className='custom-spin'>
          <button>spin</button>
          <div>asdasdasd</div>
          <div>asdasdasasdasdad</div>
        </Spin>
        <button><Loading/> Loading</button>
      </div>
    );
  }
}
