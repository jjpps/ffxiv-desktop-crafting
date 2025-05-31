console.log('Hello from Renderer');

const button = document.getElementById('my-button');
button?.addEventListener('click', () => {
  alert('Você clicou no botão!');
});