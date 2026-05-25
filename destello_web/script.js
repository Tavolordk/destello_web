const TOTAL_PAGES = 24;
const pageImage = document.querySelector('#currentPageImage');
const pageCount = document.querySelector('#pageCount');
const pageSelect = document.querySelector('#pageSelect');
const progressBar = document.querySelector('#progressBar');
const prevButton = document.querySelector('#prevPage');
const nextButton = document.querySelector('#nextPage');
const toggleView = document.querySelector('#toggleView');
const toggleViewTop = document.querySelector('#toggleViewTop');
const bookReader = document.querySelector('#bookReader');
const continuousReader = document.querySelector('#continuousReader');
let currentPage = 1;
let continuousMode = false;

function pagePath(page) {
  return `assets/pages/page-${String(page).padStart(2, '0')}.webp`;
}

function fillPageSelect() {
  const fragment = document.createDocumentFragment();
  for (let page = 1; page <= TOTAL_PAGES; page += 1) {
    const option = document.createElement('option');
    option.value = page;
    option.textContent = `${page} de ${TOTAL_PAGES}`;
    fragment.appendChild(option);
  }
  pageSelect.appendChild(fragment);
}

function updateReader() {
  pageImage.src = pagePath(currentPage);
  pageImage.alt = `Página ${currentPage} del cuento La Aventura de Destello y la Tormenta Solar`;
  pageCount.textContent = `Página ${currentPage} de ${TOTAL_PAGES}`;
  pageSelect.value = String(currentPage);
  progressBar.style.width = `${(currentPage / TOTAL_PAGES) * 100}%`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === TOTAL_PAGES;
}

function goToPage(page) {
  currentPage = Math.min(Math.max(Number(page), 1), TOTAL_PAGES);
  updateReader();
}

function buildContinuousReader() {
  if (continuousReader.childElementCount > 0) return;
  const fragment = document.createDocumentFragment();
  for (let page = 1; page <= TOTAL_PAGES; page += 1) {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');
    image.loading = page <= 2 ? 'eager' : 'lazy';
    image.src = pagePath(page);
    image.alt = `Página ${page} del cuento La Aventura de Destello y la Tormenta Solar`;
    caption.textContent = `Página ${page} de ${TOTAL_PAGES}`;
    figure.append(image, caption);
    fragment.appendChild(figure);
  }
  continuousReader.appendChild(fragment);
}

function setViewMode(useContinuous) {
  continuousMode = useContinuous;
  buildContinuousReader();
  bookReader.hidden = continuousMode;
  continuousReader.hidden = !continuousMode;
  toggleView.textContent = continuousMode ? 'Modo libro' : 'Modo continuo';
  toggleViewTop.textContent = continuousMode ? 'Ver como libro' : 'Ver continuo';
}

fillPageSelect();
updateReader();

prevButton.addEventListener('click', () => goToPage(currentPage - 1));
nextButton.addEventListener('click', () => goToPage(currentPage + 1));
pageSelect.addEventListener('change', event => goToPage(event.target.value));
toggleView.addEventListener('click', () => setViewMode(!continuousMode));
toggleViewTop.addEventListener('click', () => {
  setViewMode(!continuousMode);
  document.querySelector('#lector').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.addEventListener('keydown', event => {
  if (continuousMode) return;
  if (event.key === 'ArrowLeft') goToPage(currentPage - 1);
  if (event.key === 'ArrowRight') goToPage(currentPage + 1);
});
