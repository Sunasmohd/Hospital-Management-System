import gsap from 'gsap';
import {  useRef } from 'react';
import useHamburger from '../../store/HamburgerState';

const Hamburger = () => {
  const {setIsOpen,isOpen} = useHamburger()

  // const [isOpen, setIsOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const usse=() => {
    const hamburgeranime = gsap.timeline({ paused: true });
    const svgElement = svgRef.current;

    if (svgElement) {
      hamburgeranime.to(
        svgElement.querySelector('.top'),
       isOpen ?  {rotate:0 ,ease: 'back'} : {y:10, duration: 0.5, ease: 'back'}
      )
      .to(
        svgElement.querySelector('.bottom'),
        isOpen ?  {rotate:0  ,ease: 'back'} : {y:-10, duration: 0.5, ease: 'back'},
        '<'
      )

      hamburgeranime.to(svgElement.querySelector('.middle'), {
        opacity: isOpen ? 1 : 0,
        duration: 0.1,
      })

      .to(svgElement.querySelector('.top'),
      isOpen ? {
        y:0
      } : {rotate: 45,
        transformOrigin: 'center',}
      )

      .to(svgElement.querySelector('.bottom'), isOpen ? {
        y:0
      } : {rotate: -45,
        transformOrigin: 'center',},'<');

      hamburgeranime.play()
      
    }
  }

  const toggleAnimation = () => {
    setIsOpen(!isOpen);
    usse()
  };

  return (
    <button style={{border:'0',background:'white'}} onClick={toggleAnimation}>
      <svg  width={40} height={35} strokeWidth={2} className="svg" ref={svgRef}>
        <line x1='0' x2='25' y1='10' y2='10' stroke='black' className="top" />
        <line x1='0' x2='25' y1='20' y2='20' stroke='black' className="middle" />
        <line x1='0' x2='25' y1='30' y2='30' stroke='black' className="bottom" />
      </svg>
    </button>
  );
};

export default Hamburger;
