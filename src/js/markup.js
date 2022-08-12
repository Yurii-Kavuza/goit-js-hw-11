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

export { countryInfo, countriesList };
