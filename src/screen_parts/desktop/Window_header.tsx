import styled from 'styled-components';

import back from '../../assets/images/icons/back.png';
import forward from '../../assets/images/icons/forward.png';
import home from '../../assets/images/icons/home.png';
import refresh from '../../assets/images/icons/refresh.png';
import stop from '../../assets/images/icons/stop.png';
import windows from '../../assets/images/icons/windows.png';

export function WindowHeader() {
  return (
    <Container>
      <section className="header_toolbar">
        <div className="header_options">
          <span className='header_option'>File</span>
          <span className='header_option'>Edit</span>
          <span className='header_option'>View</span>
          <span className='header_option'>Favorites</span>
          <span className='header_option'>Tools</span>
          <span className='header_option'>Help</span>
        </div>
        <img className="header_windows-logo" src={windows} alt="windows" />
      </section>
      <section className="header_function_bar">
        <div className='header_function_bar__button--disable'>
          <img className="header_function_bar__icon" src={back} alt="" />
          <span className="header_function_bar__text">Back</span>
          <div className="header_function_bar__arrow" />
        </div>
        <div className="header_function_bar__button--disable">
          <img className="header_function_bar__icon" src={forward} alt="" />
          <div className="header_function_bar__arrow" />
        </div>
        <div className="header_function_bar__button--disable">
          <img className="header_function_bar__icon--margin-1" src={stop} alt="" />
        </div>
        <div className="header_function_bar__button--disable">
          <img
            className="header_function_bar__icon--margin-1"
            src={refresh}
            alt=""
          />
        </div>
        <div className="header_function_bar__button--disable">
          <img className="header_function_bar__icon--margin-1" src={home} alt="" />
        </div>
      </section>
    </Container>
  );
}


const Container = styled.div`
  user-select: none;
  width: 100%;
  padding: 0 0.2rem;
  .header_toolbar {
    position: relative;
    display: flex;
    height: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }
  .header_options {
    height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    padding-left: 2px;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .header_option {
    margin: 0 0.2rem;
    color: rgb(131, 131, 131);
  }
  .header_windows-logo {
    height: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .header_function_bar {
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 1px 3px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .header_function_bar__button--disable {
    filter: grayscale(1);
    opacity: 0.7;
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .header_function_bar__text {
    margin-right: 4px;
  }
  .header_function_bar__arrow {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 4px;
    &:before {
      content: '';
      display: block;
      border-width: 3px 3px 0;
      border-color: #000 transparent;
      border-style: solid;
    }
  }
`;
