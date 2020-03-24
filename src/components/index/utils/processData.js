import data from 'Data/data.json';
import { timeFormat } from 'd3';

function dateString(date, zero) {
  const formattedDate = timeFormat('%m/%d/%y')(date).split('/');
  const mo = zero ? formattedDate[0] : +formattedDate[0];
  const day = zero ? formattedDate[1] : +formattedDate[1];
  const yr = formattedDate[2];
  // console.log(formattedDate)
  return `${mo}/${day}/${yr}`;
}

export function processData() {
  console.log(data);
  const dataToUse = [];
  const today = dateString(new Date(), true);
  // const firstDay = new Date('01/22/2020');

  data.forEach(d => {
    const dates = [];
    const firstDay = new Date('01/22/2020');
    let j = 0;
    for (let i = firstDay; dateString(i, true) < today; i = new Date(i.setDate(i.getDate() + 3))){
      if (j > 2){
        const value = d[dateString(i, false)];
        const prev = new Date(i.setDate(i.getDate() - 1));
        const prev2 = new Date(i.setDate(i.getDate() - 1));

        const prevVal = d[dateString(prev, false)];
        const prev2Val = d[dateString(prev2, false)];
        //console.log(value, dateString(prev, false), dateString(prev2, false))
        dates.push({
          date: i,
          dateString: dateString(i, true),
          value: value,
          velocity: value - prevVal,
          acc: (value - prevVal) - (prevVal - prev2Val)
        })
      }
      j++;
    }

    dataToUse.push({
      country: d['Country/Region'],
      state: d['Province/State'],
      dates: dates,
    })
  })

  console.log('data to use:', dataToUse);

  return dataToUse;
}
