import React, { useState } from 'react';
import { HeroContainer,
    HeroBg, 
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
    Button
        } from './hero.styles';
import Video from '../../videos/Circuit_Background.mp4';


const Hero = () => {
    const [hover, setHover] = useState(false);

    const onHover = () =>{
        setHover(!hover);
    }

    return ( <React.Fragment>
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video.mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1>PyCode.com</HeroH1>
                <HeroP>
                   Experience new way of writing Python code.
                   Execute code in your own web browser. 
                   Feel the power of Webassembly.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to='/signup' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'>
                        Get started {hover ? <ArrowForward/>:<ArrowRight/>}
                    </Button> 
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
        </React.Fragment>
     );
};
 
export default Hero;