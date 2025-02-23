import sendImg from '../../../assets/images/icons/sendmail.webp';
import styles from './Email/Email.module.css'
export function Email(): JSX.Element {

  return <div className={styles.email_rapper}>
    <div>
      <div style={{display: 'inline-block'}} className='text-center m-1'>
        <img src={sendImg} alt="" className='grayscale'/>
        <div>Send</div>
      </div>
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>To:</span>
      <input type="email" />
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>From:</span>
      <input type="email" />
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>Subject:</span>
      <input type="email" />
    </div>
    <textarea className='resize-none' name="email_text"></textarea>
  </div>
}