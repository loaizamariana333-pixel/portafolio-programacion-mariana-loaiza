const display = document.querySelector('#display');
let current = '0';
let stored = null;
let operator = null;
let replaceNext = false;
function show(value) { display.textContent = value; }
function input(value) {
  if ('0123456789.'.includes(value)) {
    if (replaceNext) { current = value === '.' ? '0.' : value; replaceNext = false; }
    else if (value === '.' && current.includes('.')) return;
    else current = current === '0' && value !== '.' ? value : current + value;
    show(current); return;
  }
  if ('+-*/'.includes(value)) { stored = Number(current); operator = value; replaceNext = true; return; }
  if (value === 'equals' && operator && stored !== null) {
    const second = Number(current);
    if (operator === '/' && second === 0) { current = 'No se puede dividir por cero'; show(current); operator = null; replaceNext = true; return; }
    const answer = operator === '+' ? stored + second : operator === '-' ? stored - second : operator === '*' ? stored * second : stored / second;
    current = String(Number(answer.toFixed(8))); show(current); stored = null; operator = null; replaceNext = true;
  }
}
document.querySelector('.keys').addEventListener('click', event => {
  const button = event.target.closest('button'); if (!button) return;
  if (button.dataset.action === 'clear') { current = '0'; stored = null; operator = null; replaceNext = false; show(current); }
  else input(button.dataset.action || button.dataset.value);
});
document.addEventListener('keydown', event => {
  if ('0123456789.+-*/'.includes(event.key)) input(event.key);
  if (event.key === 'Enter' || event.key === '=') input('equals');
  if (event.key === 'Escape') { current = '0'; stored = null; operator = null; replaceNext = false; show(current); }
});
