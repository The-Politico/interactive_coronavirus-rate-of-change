import data from 'Data/data.json';
import { timeFormat } from 'd3';

function dateString(date) {
  return timeFormat('%m/%d/%y')(date).substring(1);
}

export function processData() {
  console.log(data);
  const today = dateString(new Date());
  //const firstDay = new Date('01/22/2020');

  data.forEach(d => {
    d.dates = [];
    const firstDay = new Date('01/22/2020');
    for (let i = firstDay; dateString(i) < today; i = new Date(i.setDate(i.getDate() + 1))){
      //console.log(d, i, d[i])
      d.dates.push({
        date: i,
        dateString: dateString(i),
        value: d[dateString(i)]
      })
    }
  })


  console.log('data to use:', data);


  return data;
}
