import symbol_minus from '../../../../assets/minesweeper/counters/-.svg'
import number_0 from '../../../../assets/minesweeper/counters/0.svg'
import number_1 from '../../../../assets/minesweeper/counters/1.svg'
import number_2 from '../../../../assets/minesweeper/counters/2.svg'
import number_3 from '../../../../assets/minesweeper/counters/3.svg'
import number_4 from '../../../../assets/minesweeper/counters/4.svg'
import number_5 from '../../../../assets/minesweeper/counters/5.svg'
import number_6 from '../../../../assets/minesweeper/counters/6.svg'
import number_7 from '../../../../assets/minesweeper/counters/7.svg'
import number_8 from '../../../../assets/minesweeper/counters/8.svg'
import number_9 from '../../../../assets/minesweeper/counters/9.svg'

const symbolToImgMap: {[symbol: string]: string} = {
  "-": symbol_minus,
  "0": number_0,
  "1": number_1,
  "2": number_2,
  "3": number_3,
  "4": number_4,
  "5": number_5,
  "6": number_6,
  "7": number_7,
  "8": number_8,
  "9": number_9
}

export function NumberLEDBoard({number}: {number: number}): JSX.Element {
  function getSymbolsArr(number: number) {
    const symbolArr = JSON.stringify(number).split('');
    while (symbolArr.length < 3) {
      symbolArr.unshift('0');
    }
    return symbolArr
  }
  return <div style={{
    border: '2px inset',
    display: 'flex'
  }}>
    {getSymbolsArr(number).map(((symbol, i)=>{
      return <img src={symbolToImgMap[symbol]} alt="" key={i}/>
    }))}
  </div>
}