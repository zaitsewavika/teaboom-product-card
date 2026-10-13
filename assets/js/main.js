const variants = [
  { weight: '100', articleNumber: '01306', price: 349.2, discountPrice: 326.4 },
  { weight: '500', articleNumber: '01307', price: 1646, discountPrice: 1432 },
  { weight: '1000', articleNumber: '01308', price: 2592, discountPrice: 2064 },
  { weight: '5000', articleNumber: '01309', price: 8710, discountPrice: 6320 },
];

const inputs = document.querySelectorAll('input[name="packaging"]');
const articleNumber = document.querySelector('[data-product-article-number]');
const price = document.querySelector('[data-product-price]');
const currentPriceContainer = document.querySelector('.price__current');
const oldPrice = document.querySelector('[data-product-old-price]');
const oldPriceContainer = document.querySelector('[data-old-price-container]');
const caption = document.querySelector('[data-product-price-caption]');

function formatPrice(value) {
  return (
    value.toLocaleString('ru-RU', {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    }) + ' ₽'
  );
}

function updateProduct(weight) {
  const variant = variants.find((item) => item.weight === weight);
  const hasDiscount = variant.discountPrice != null;

  currentPriceContainer.classList.toggle('price__current--discount', hasDiscount);

  articleNumber.textContent = variant.articleNumber;
  price.textContent = formatPrice(hasDiscount ? variant.discountPrice : variant.price);
  oldPriceContainer.hidden = !hasDiscount;
  oldPrice.textContent = hasDiscount ? formatPrice(variant.price) : '';
  caption.textContent = `Цена за упаковку ${variant.weight} г`;
}

inputs.forEach((input) => {
  input.addEventListener('change', () => {
    updateProduct(input.value);
  });
});

updateProduct(document.querySelector('input[name="packaging"]:checked').value);
