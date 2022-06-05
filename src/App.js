import './App.css';
import Slider from '@material-ui/core/Slider';
import {useState} from 'react';
import Background from './background';
import useWindowSize from './getSize';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';


function App() {
  const [prob, setProb] = useState(50);
  const size = useWindowSize();

  const handleSlider = (event, value) => {
    setProb(value);
  }

  const addProb = () => {
    setProb(Math.min(100, prob+1));
  }
  const minusProb = () => {
    setProb(Math.max(0, prob-1));
  }

  const controlFontSize = '20px';

  const sliderLen = Math.min(320, size.width*0.8);

  return (
    <div className="App">
      <Background prob={prob}/>

      <div className="slider" style={{
        width: sliderLen,
        left: (size.width-sliderLen)/2 + 'px',
        transform: 'translateY(-55px)'
      }}>
        <IconButton onClick={minusProb}>
          <RemoveOutlinedIcon style={{fontSize: controlFontSize, color: 'black'}} />
        </IconButton>

        <Chip
          label={prob}
          variant="outlined"
          style={{
            height: '45px',
            width: '60px', 
            borderRadius: '22.5px',
            fontSize: controlFontSize,
            border: '1px solid black',
            userSelect: 'none',
            color: 'black',
          }} />

        <IconButton onClick={addProb}>
          <AddOutlinedIcon style={{fontSize: controlFontSize, color: 'black'}} />
        </IconButton>
      </div>

      <div className="slider" style={{
        width: sliderLen + 'px',
        left: (size.width-sliderLen)/2 + 'px',
      }}>
        <Slider
          value={prob}
          onChange={handleSlider}
          min={0}
          max={100}
          step={1}
        />
      </div>

    </div>
  );
}

export default App;
