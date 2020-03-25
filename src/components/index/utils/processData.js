import data from 'Data/data.json';
import { timeFormat, sum, max, min, nest } from 'd3';

function dateString(date, zero) {
  const formattedDate = timeFormat('%m/%d/%y')(date).split('/');
  const mo = zero ? formattedDate[0] : +formattedDate[0];
  const day = zero ? formattedDate[1] : +formattedDate[1];
  const yr = formattedDate[2];
  // console.log(formattedDate)
  return `${mo}/${day}/${yr}`;
}

export function processData() {
  const dataToUse = [];
  const today = new Date(); // dateString(new Date(), true);
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  // const firstDay = new Date('01/22/2020');

  const nested = nest()
    .key(a => a['Country/Region'])
    .entries(data);

  console.log(data, nested);

  nested.forEach(d => {
    const dates = [];
    const firstDay = new Date('01/22/2020');
    let j = 0;
    for (let i = firstDay; dateString(i, true) < dateString(yesterday, true); i = new Date(i.setDate(i.getDate() + 1))){
      const current = dateString(i, true);
      const value = sum(d.values.map(a => a[dateString(i, false)]));

      dates.push({
        date: i,
        dateString: current,
        value: value,
      })
      j++;
    }

    dates.forEach((x, k) => {
      if (k < 3){
        x.rates = [0, 0, 0];
      } else {
        const indices = [0, 1, 2];
        const rates = indices.map(a => {
          if (dates[k - a - 1].value === 0) return 0;
          return (dates[k - a].value - dates[k - a - 1].value) / dates[k - a - 1].value
        });
        const people = indices.map(a => dates[k - a].value - dates[k - a - 1].value)
        const avg = sum(rates) / rates.length;
        x.rates = rates;
        x.avg = avg;
        x.people = sum(people) / people.length;
        x.double = Math.log(2) / Math.log(1 + avg);
      }
    })

    // dates.forEach((x, k) => {
    //   x.acc = k < 2 ? 0 : (x.velocity - dates[k-1].velocity) ;
    // })
    //
    const total = dates[dates.length - 1].value;

    if (total > 1000) {
      const mostRecent = dates[dates.length - 1];
      const previous = dates[dates.length - 2];

      dataToUse.push({
        country: d.key,
        dates: dates,
        rate: mostRecent.avg,
        double: mostRecent.double,
        people: mostRecent.people,
        previous: previous.double,
      })
    }
  })

  dataToUse.sort((a, b) => a.double - b.double);
  console.log('data to use:', dataToUse);

  return dataToUse;
}
