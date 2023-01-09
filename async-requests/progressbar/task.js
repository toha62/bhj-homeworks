const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  
  xhr.upload.addEventListener('progress', event => progress.value = (event.loaded / event.total).toFixed(1));

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xhr.send(formData);
});


