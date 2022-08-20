const cardInfo = card => `<div class="photo-card">
  <a href="${card.largeImageURL}" class="gallery__link">
<img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" data-source="${card.largeImageURL}" class="gallery__image"/>
</a>  
<div class="info">
    <p class="info-item">
      <b>Likes</b>${card.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${card.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${card.downloads}
    </p>
  </div>
  
</div>`;

//
//

const countryInfo = country => `<li>
<img class="img--big" src="${country.flags.svg}">
<span class="result-country"> ${country.name.official}</span></li>
<li>Capital: ${country.capital}</li>
<li>Population: ${country.population}</li>
<li>Languages: ${Object.values(country.languages)}</li>`;

const countriesList = country =>
  `<li>
<img src="${country.flags.svg}" width=70px>
<p> ${country.name.official}</p>
</li>
`;

export { cardInfo };
