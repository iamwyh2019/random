import './App.css';
import Slider from '@material-ui/core/Slider';
import {useState} from 'react';
import Background from './background';
import useWindowSize from './getSize';


function App() {
  const [prob, setProb] = useState(50);
  const size = useWindowSize();

  const handleSlider = (event, value) => {
    setProb(value);
  }

  const sliderLen = Math.min(300, size.width*0.8);

  return (
    <div className="App">
      <Background prob={prob}/>

      <div className="slider" style={{
        width: sliderLen + 'px',
        left: (size.width-sliderLen)/2 + 'px'
      }}>
        <Slider
          value={prob}
          onChange={handleSlider}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="on"
        />
      </div>

    </div>
  );
}

export default App;
