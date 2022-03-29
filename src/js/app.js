const table = document.getElementById('table');
const header = ['id', 'title', 'imdb', 'year'];

const library = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.3,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.2,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.0,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.0,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.9,
    year: 1994,
  },
];

function renderTable() {
  document.querySelectorAll('tr').forEach((tr) => {
    tr.remove();
  });

  const headerTr = document.createElement('tr');
  header.forEach((item) => {
    const headerTd = document.createElement('td');
    headerTd.textContent = `${item}`;
    headerTr.appendChild(headerTd);
  });
  table.appendChild(headerTr);

  library.forEach((item) => {
    const tr = document.createElement('tr');
    for (const prop in item) {
      if (Object.prototype.hasOwnProperty.call(item, prop)) {
        const td = document.createElement('td');
        if (prop === 'year') {
          td.textContent = `(${item[prop]})`;
        } else if (prop === 'imdb') {
          td.textContent = `${item[prop].toFixed(2)}`;
        } else {
          td.textContent = `${item[prop]}`;
        }

        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  });
}

function addArrow(arrow, attr) {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    if (cell.textContent === attr) {
      if (arrow === 'grow') {
        cell.insertAdjacentText('beforeend', ' ↓');
      } else {
        cell.insertAdjacentText('beforeend', ' ↑');
      }
    }
  });
}

function sortNumbersGrow(attr) {
  library.sort((obj1, obj2) => obj1[attr] - obj2[attr]);
  renderTable();
  addArrow('grow', attr);
}

function sortNumbersDecrease(attr) {
  library.sort((obj1, obj2) => obj2[attr] - obj1[attr]);
  renderTable();
  addArrow('decrease', attr);
}

function sortStringsGrow(attr) {
  library.sort((obj1, obj2) => {
    if (obj1[attr] < obj2[attr]) return 1;
    if (obj1[attr] > obj2[attr]) return -1;
    return 0;
  });
  renderTable();
  addArrow('grow', attr);
}

function sortStringsDecrease(attr) {
  library.sort((obj1, obj2) => {
    if (obj1[attr] < obj2[attr]) return -1;
    if (obj1[attr] > obj2[attr]) return 1;
    return 0;
  });
  renderTable();
  addArrow('decrease', attr);
}

const sortings = [
  sortNumbersGrow,
  sortNumbersDecrease,
  sortStringsGrow,
  sortStringsDecrease,
  sortNumbersGrow,
  sortNumbersDecrease,
  sortNumbersGrow,
  sortNumbersDecrease,
];

const sortingsAttr = [
  'id',
  'id',
  'title',
  'title',
  'imdb',
  'imdb',
  'year',
  'year',
];

let counter = 0;

window.onload = () => {
  setInterval(() => {
    if (counter > sortings.length - 1) {
      counter = 0;
    }
    sortings[counter](sortingsAttr[counter]);
    counter++;
  }, 2000);
};
