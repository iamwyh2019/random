import './App.css';
import Slider from '@material-ui/core/Slider';
import {useState, useEffect} from 'react';
import Background from './background';
import useWindowSize from './getSize';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import Fade from '@material-ui/core/Fade';

function App() {
  const [prob, setProb] = useState(50);
  const size = useWindowSize();
  const [result, setResult] = useState(null);
  const [aniSign, setAniSign] = useState(1);
  const [aniHeight, setAniHeight] = useState(prob);
  const [allowControl, setAllowControl] = useState(true);
  const [showText, setShowText] = useState(false);

  const handleSlider = (event, value) => {
    setProb(value);
    setAniHeight(value);
  }

  const addProb = () => {
    const newProb = Math.min(100, prob+1);
    setProb(newProb);
    setAniHeight(newProb);
  }
  const minusProb = () => {
    const newProb = Math.max(0, prob-1);
    setProb(newProb);
    setAniHeight(newProb);
  }

  useEffect(() => {
    if (result === null) return;

    // finish the animation in 1.5 seconds
    // update the animation every 20 ms
    const direction = result ? 1 : -1;
    const diff = result ? 100 - aniHeight : aniHeight;
    const step = diff/(1500/20);

    const interval = setInterval(() => {
      setAniHeight((aniHeight) => {
        const newAniHeight = aniHeight + direction*step;
        if (newAniHeight < 0 || newAniHeight > 100) {
          setShowText(true);
          clearInterval(interval);
        }
        return newAniHeight;
      });
    }, 20);
  }, [result, aniSign])

  const makeChoice = () => {
    const res = (Math.random() < prob/100);
    setAllowControl(false);
    setShowText(false);
    if (res === result)
      setAniSign(-aniSign);
    else
      setResult(res);
  }

  const controlFontSize = '18px';
  const controlHeight = 45;

  const sliderLen = Math.min(320, size.width*0.8);

  return (
    <div className="App">
      <Background prob={aniHeight}/>

      <div className="slider" style={{
        width: sliderLen + 'px',
        height: controlHeight + 'px',
        left: (size.width-sliderLen)/2 + 'px',
        transform: `translateY(-${controlHeight}px)`
      }}>
        <Fade in={allowControl} timeout={500}>
          <IconButton onClick={minusProb}>
            <RemoveOutlinedIcon style={{fontSize: controlFontSize, color: 'black'}} />
          </IconButton>
        </Fade>

        <Chip
          label={prob + '%'}
          variant="outlined"
          style={{
            height: controlHeight + 'px',
            width: '90px', 
            borderRadius: '22.5px',
            fontSize: controlFontSize,
            border: '1px solid black',
            color: 'black',
          }} />

        <Fade in={allowControl} timeout={500}>
          <IconButton onClick={addProb}>
            <AddOutlinedIcon style={{fontSize: controlFontSize, color: 'black'}} />
          </IconButton>
        </Fade>
      </div>

      <div className="slider" style={{
        width: sliderLen + 'px',
        height: controlHeight + 'px',
        left: (size.width-sliderLen)/2 + 'px',
      }}>
          <Fade in={allowControl} timeout={500}>
            <Slider
              value={prob}
              onChange={handleSlider}
              min={0}
              max={100}
              step={1}
              style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}}
            />
          </Fade>
        </div>

      <div className="slider" style={{
        width: sliderLen + 'px',
        height: controlHeight + 'px',
        left: (size.width-sliderLen)/2 + 'px',
        transform: `translateY(${controlHeight}px)`
      }}>
        <Button variant="outlined" style={{
          height: controlHeight + 'px',
          width: '90px', 
          borderRadius: '22.5px',
          border: '1px solid black',
          color: 'black',
        }}
        onClick={makeChoice}>
          试试手气
        </Button>
      </div>

      { result !== null? 

      (
        <Fade in={showText} timeout={500}>
          <div className="slider" style={{
            width: sliderLen + 'px',
            height: controlHeight + 'px',
            left: (size.width-sliderLen)/2 + 'px',
            transform: `translateY(${controlHeight*2}px)`,
            fontSize: controlFontSize,
          }}>
            <span className="text">
              {result ? '发生了！' : '没有发生'}
            </span>
          </div>
      </Fade>
      ) 
      : null}

    </div>
  );
}

export default App;
