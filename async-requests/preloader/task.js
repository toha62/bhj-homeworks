const items = document.querySelector('#items');
const loader = document.querySelector('#loader');
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';
xhr.send();

xhr.addEventListener('load', () => {
  const html = [];
  const responseObject = xhr.response.response.Valute;

  for (let key in responseObject) {
    html.push(`
      <div class="item">
        <div class="item__code">
          ${responseObject[key].CharCode}
        </div>
        <div class="item__value">
          ${responseObject[key].Value}
        </div>
        <div class="item__currency">
          руб.
        </div>
      </div>
    `);
  }

  loader.classList.remove('loader_active');

  items.innerHTML = html.join('');  
});