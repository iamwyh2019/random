import './background.css';
import Wave from 'react-wavify';
import useWindowSize from '../getSize';

function Background(props) {
    const {prob} = props;

    const ratio = Math.min(100, Math.max(0, prob/100));
    const amplitude = ratio*(1-ratio)*4*50;
    
    const size = useWindowSize();

    return (
        <div className="background" style={{width: size.width, height: size.height}}>
            <Wave fill="hsl(283, 14.5%, 75.5%)"
                options={{
                    height: size.height*(1-ratio)-amplitude/2,
                    amplitude: amplitude,
                    speed: 0.28,
                    points: 3
                }}
                style={{
                    height: '100%',
                }}>
            </Wave>
        </div>
    )

}

export default Background;