
import * as React from 'react';
class Loader extends React.Component {
    render() {
      return (
          <div className='loader'>
              <video src="loader.mp4" muted loop autoPlay ></video>
              <p className='loader-text'>LOADING:)</p>
          </div>
      );
    }
  }
export default Loader;