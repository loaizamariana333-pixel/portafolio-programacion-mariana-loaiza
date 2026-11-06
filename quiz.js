const questions = [
  {q: '¿Qué etiqueta HTML representa el título principal de una página?', a: ['<h1>', '<p>', '<img>'], correct: 0},
  {q: '¿Qué propiedad CSS cambia el color del texto?', a: ['padding', 'color', 'margin'], correct: 1},
  {q: '¿Qué palabra permite declarar una variable que puede reasignarse en JavaScript?', a: ['const', 'let', 'style'], correct: 1}
];
let index = 0, score = 0, answered = false;
const progress = document.querySelector('#progress'), question = document.querySelector('#question'), answers = document.querySelector('#answers'), feedback = document.querySelector('#feedback'), next = document.querySelector('#next');
function render() {
  answered = false; feedback.textContent = ''; next.disabled = true; next.textContent = index === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
  progress.textContent = `Pregunta ${index + 1} de ${questions.length}`; question.textContent = questions[index].q; answers.replaceChildren();
  questions[index].a.forEach((text, i) => { const button = document.createElement('button'); button.type = 'button'; button.textContent = text; button.addEventListener('click', () => choose(i, button)); answers.append(button); });
}
function choose(choice, button) {
  if (answered) return; answered = true; const correct = choice === questions[index].correct;
  if (correct) { score++; feedback.textContent = '¡Correcto!'; button.classList.add('correct'); }
  else { feedback.textContent = 'Esa no era. Revisa la respuesta marcada.'; button.classList.add('wrong'); answers.children[questions[index].correct].classList.add('correct'); }
  next.disabled = false;
}
next.addEventListener('click', () => { if (index < questions.length - 1) { index++; render(); return; } progress.textContent = 'Resultado final'; question.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas.`; answers.replaceChildren(); feedback.textContent = score === questions.length ? '¡Excelente trabajo!' : 'Puedes volver a intentarlo y repasar los conceptos.'; next.textContent = 'Intentar de nuevo'; next.disabled = false; next.onclick = () => {index = 0; score = 0; render(); next.onclick = null;}; });
render();
