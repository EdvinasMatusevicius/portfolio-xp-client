import { useState } from 'react';
import sendImg from '../../../assets/images/icons/sendmail.webp';
import styles from './Email/Email.module.css'
export function Email(): JSX.Element {
  const inputMaxLength = {
    email: 50,
    subject: 150,
    feedback: 600
  };

  const [userEmail, setUserEmail] = useState<string>('');
  const [userFeedback, setUserFeedback] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState<string>('');

  function onInputChange(inputName: string, newValue: string) {
    if (inputName === 'email') setUserEmail(newValue);
    if (inputName === 'subject') setEmailSubject(newValue);
    if (inputName === 'feedback') setUserFeedback(newValue);
  }
  async function sendEmailFeedback() {
    if (!inputsAreValid()) return;
    fetch('http://localhost:8080/feedback/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: userEmail, subject: emailSubject, feedback: userFeedback})
    });
    setUserEmail('');
    setUserFeedback('');
    setEmailSubject('');
  }
  function inputsAreValid() {
    if (!userEmail || !userFeedback || !emailSubject) return false;
    if (
      userEmail.length > inputMaxLength.email ||
      emailSubject.length > inputMaxLength.subject ||
      userFeedback.length > inputMaxLength.feedback
    ) return false;
    return true;
  }
  return <div className={styles.email_rapper}>
    <div>
      <div 
        onClick={sendEmailFeedback}
        style={{display: 'inline-block'}} 
        className='text-center m-1'
      >
        <img src={sendImg} alt="" className={inputsAreValid() ? '' : 'grayscale'}/>
        <div>Send</div>
      </div>
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>To:</span>
      <input type="text" value="Edvinas Matusevičius" readOnly/>
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>From:</span>
      <input 
        type="email" 
        onChange={(e)=>onInputChange('email', e.target.value)}
        value={userEmail}
      />
    </div>
    <div className={styles.email_data_line_style}>
      <span className='h-full flex items-center ml-4'>Subject:</span>
      <input 
        type="email" 
        onChange={(e)=>onInputChange('subject', e.target.value)}
        value={emailSubject}
      />
    </div>
    <textarea
      className='resize-none' 
      name="email_text"  
      onChange={(e)=>onInputChange('feedback', e.target.value)}
      value={userFeedback}
    ></textarea>
  </div>
}