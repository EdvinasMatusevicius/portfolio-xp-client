import styles from './About/About.module.css';
import pixelIMG from '../../../assets/images/test_img.jpg'
import { FaLinkedin } from 'react-icons/fa';

export function About(): JSX.Element {
  return <div style={{backgroundColor: '#4547ff'}} className={styles.about_wrapper}>
    <div className={styles.monitor_wrapper}>
      <div className={styles.monitor_bezel}>
        <div className={styles.monitor_screen}>
          <div className={styles.monitor_screen_loading}></div>
          <img src={pixelIMG} alt="" className='w-full h-full'/>
        </div>
        <div className={styles.monitor_btn}></div>
      </div>
      <div className={styles.monitor_stand_pole}></div>
      <div className={styles.monitor_stand_base}></div>
    </div>
    <div className={styles.introduction}>
      Hi, I'm Edvinas Matusevičius a full-stack developer. <br></br>
      <p style={{fontSize: '1rem'}}>
        I have been fascinated with technology ever since I got to use PC for the first time at my parents job, that was enough to get me hooked.
        Finished college with degree in Interactive media and Digital design and later transitioned to programming.
      </p>
    </div>
    <a 
      href='https://lt.linkedin.com/in/edvinas-matusevi%C4%8Dius-5b79561b7'
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.linkedin_btn}
    >
      <FaLinkedin 
        style={{color: 'white', fontSize: '2rem'}}
      />
    </a>
  </div>
}