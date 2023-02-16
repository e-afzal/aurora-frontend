const fedexList = [
  { country: "Afghanistan", zone: "C", price: 165 },
  { country: "Albania", zone: "I", price: 240 },
  { country: "Algeria", zone: "K", price: 335 },
  { country: "American Samoa", zone: "L", price: 372 },
  { country: "Andorra", zone: "D", price: 185 },
  { country: "Angola", zone: "K", price: 335 },
  { country: "Anguilla", zone: "L", price: 372 },
  { country: "Antigua & Barbuda", zone: "L", price: 372 },
  { country: "Argentina", zone: "L", price: 372 },
  { country: "Armenia", zone: "L", price: 372 },
  { country: "Aruba", zone: "L", price: 372 },
  { country: "Australia", zone: "H", price: 225 },
  { country: "Austria", zone: "D", price: 185 },
  { country: "Azerbaijan", zone: "L", price: 372 },
  { country: "Bahama", zone: "L", price: 372 },
  { country: "Bahrain", zone: "A", price: 135 },
  { country: "Bangladesh", zone: "C", price: 165 },
  { country: "Barbados", zone: "L", price: 372 },
  { country: "Belarus", zone: "I", price: 240 },
  { country: "Belgium", zone: "D", price: 185 },
  { country: "Belize", zone: "L", price: 372 },
  { country: "Benin", zone: "L", price: 372 },
  { country: "Bermuda", zone: "L", price: 372 },
  { country: "Bhutan", zone: "C", price: 165 },
  { country: "Bolivia", zone: "L", price: 372 },
  { country: "Bonaire Sint Eustatius and Saba", zone: "L", price: 372 },
  { country: "Bosnia-Herzegovina", zone: "I", price: 240 },
  { country: "Botswana", zone: "J", price: 295 },
  { country: "Brazil", zone: "L", price: 372 },
  { country: "British Virgin Islands", zone: "L", price: 372 },
  { country: "Brunei", zone: "L", price: 372 },
  { country: "Bulgaria", zone: "I", price: 240 },
  { country: "Burkina Faso", zone: "L", price: 372 },
  { country: "Burundi", zone: "L", price: 372 },
  { country: "Cambodia", zone: "L", price: 372 },
  { country: "Cameroon", zone: "L", price: 372 },
  { country: "Canada", zone: "F", price: 255 },
  { country: "Cape Verde", zone: "L", price: 372 },
  { country: "Cayman Islands", zone: "L", price: 372 },
  { country: "Chad", zone: "L", price: 372 },
  { country: "Chile", zone: "L", price: 372 },
  { country: "China", zone: "G", price: 215 },
  { country: "Colombia", zone: "L", price: 372 },
  { country: "Congo", zone: "L", price: 372 },
  { country: "Cook Islands", zone: "L", price: 372 },
  { country: "Costa Rica", zone: "L", price: 372 },
  { country: "Croatia", zone: "I", price: 240 },
  { country: "Curacao", zone: "L", price: 372 },
  { country: "Cyprus", zone: "I", price: 240 },
  { country: "Czech Republic", zone: "I", price: 240 },
  { country: "Côte D'ivoire (Ivory Coast)", zone: "K", price: 335 },
  { country: "Democratic Republic of the Congo", zone: "L", price: 372 },
  { country: "Denmark", zone: "D", price: 185 },
  { country: "Djibouti", zone: "L", price: 372 },
  { country: "Dominica", zone: "L", price: 372 },
  { country: "Dominican Republic", zone: "L", price: 372 },
  { country: "East Timor", zone: "L", price: 372 },
  { country: "Ecuador", zone: "L", price: 372 },
  { country: "Egypt", zone: "C", price: 165 },
  { country: "El Salvador", zone: "L", price: 372 },
  { country: "Eritrea", zone: "L", price: 372 },
  { country: "Estonia", zone: "I", price: 240 },
  { country: "Ethiopia", zone: "K", price: 335 },
  { country: "Faeroe Islands", zone: "D", price: 185 },
  { country: "Fiji", zone: "L", price: 372 },
  { country: "Finland", zone: "D", price: 185 },
  { country: "France", zone: "D", price: 185 },
  { country: "French Guiana", zone: "L", price: 372 },
  { country: "French Polynesia", zone: "L", price: 372 },
  { country: "Gabon", zone: "L", price: 372 },
  { country: "Gambia", zone: "L", price: 372 },
  { country: "Georgia", zone: "L", price: 372 },
  { country: "Germany", zone: "D", price: 185 },
  { country: "Ghana", zone: "K", price: 335 },
  { country: "Gibraltar", zone: "I", price: 240 },
  { country: "Greece", zone: "D", price: 185 },
  { country: "Greenland", zone: "D", price: 185 },
  { country: "Grenada", zone: "L", price: 372 },
  { country: "Guadeloupe", zone: "L", price: 372 },
  { country: "Guam", zone: "L", price: 372 },
  { country: "Guatemala", zone: "L", price: 372 },
  { country: "Guinea", zone: "L", price: 372 },
  { country: "Guyana", zone: "L", price: 372 },
  { country: "Haiti", zone: "L", price: 372 },
  { country: "Honduras", zone: "L", price: 372 },
  { country: "Hong Kong SAR, China", zone: "G", price: 215 },
  { country: "Hungary", zone: "I", price: 240 },
  { country: "Iceland", zone: "I", price: 240 },
  { country: "India", zone: "C", price: 165 },
  { country: "Indonesia", zone: "H", price: 225 },
  { country: "Iraq", zone: "C", price: 165 },
  { country: "Ireland", zone: "D", price: 185 },
  { country: "Israel", zone: "I", price: 240 },
  { country: "Italy", zone: "D", price: 185 },
  { country: "Jamaica", zone: "L", price: 372 },
  { country: "Japan", zone: "G", price: 215 },
  { country: "Jordan", zone: "C", price: 165 },
  { country: "Kazakhstan", zone: "L", price: 372 },
  { country: "Kenya", zone: "K", price: 335 },
  { country: "Kuwait", zone: "A", price: 135 },
  { country: "Kyrgyzstan", zone: "L", price: 372 },
  { country: "Laos", zone: "L", price: 372 },
  { country: "Latvia", zone: "I", price: 240 },
  { country: "Lebanon", zone: "C", price: 165 },
  { country: "Lesotho", zone: "L", price: 372 },
  { country: "Liberia", zone: "K", price: 335 },
  { country: "Libya", zone: "K", price: 335 },
  { country: "Liechtenstein", zone: "I", price: 240 },
  { country: "Lithuania", zone: "I", price: 240 },
  { country: "Luxembourg", zone: "D", price: 185 },
  { country: "Macau SAR, China", zone: "L", price: 372 },
  { country: "Macedonia", zone: "I", price: 240 },
  { country: "Madagascar", zone: "L", price: 372 },
  { country: "Malawi", zone: "J", price: 295 },
  { country: "Malaysia", zone: "H", price: 225 },
  { country: "Maldives", zone: "C", price: 165 },
  { country: "Mali", zone: "L", price: 372 },
  { country: "Malta", zone: "I", price: 240 },
  { country: "Marshall Islands", zone: "L", price: 372 },
  { country: "Martinique", zone: "L", price: 372 },
  { country: "Mauritania", zone: "L", price: 372 },
  { country: "Mauritius", zone: "K", price: 335 },
  { country: "Mexico", zone: "L", price: 372 },
  { country: "Micronesia", zone: "L", price: 372 },
  { country: "Monaco", zone: "I", price: 240 },
  { country: "Mongolia", zone: "L", price: 372 },
  { country: "Monserrat", zone: "L", price: 372 },
  { country: "Montenegro", zone: "I", price: 240 },
  { country: "Morocco", zone: "K", price: 335 },
  { country: "Mozambique", zone: "J", price: 295 },
  { country: "Namibia", zone: "J", price: 295 },
  { country: "Nepal", zone: "C", price: 165 },
  { country: "Netherlands", zone: "D", price: 185 },
  { country: "New Caledonia", zone: "L", price: 372 },
  { country: "New Zealand", zone: "H", price: 225 },
  { country: "Nicaragua", zone: "L", price: 372 },
  { country: "Niger", zone: "L", price: 372 },
  { country: "Nigeria", zone: "K", price: 335 },
  { country: "Northern Mariana Islands", zone: "L", price: 372 },
  { country: "Norway", zone: "I", price: 240 },
  { country: "Oman", zone: "A", price: 135 },
  { country: "Pakistan", zone: "C", price: 165 },
  { country: "Palau", zone: "L", price: 372 },
  { country: "Palestinian Territory", zone: "C", price: 165 },
  { country: "Panama", zone: "L", price: 372 },
  { country: "Papua New Guinea", zone: "L", price: 372 },
  { country: "Paraguay", zone: "L", price: 372 },
  { country: "Peru", zone: "L", price: 372 },
  { country: "Phillipines", zone: "H", price: 225 },
  { country: "Poland", zone: "I", price: 240 },
  { country: "Portugal", zone: "D", price: 185 },
  { country: "Puerto Rico - Aguadilla - BQN", zone: "L", price: 372 },
  { country: "Puerto Rico - Arecibo - ARE", zone: "L", price: 372 },
  { country: "Puerto Rico - Carolina (FAJ) - FAJ", zone: "L", price: 372 },
  { country: "Puerto Rico - Carolina (NRR) - NRR", zone: "L", price: 372 },
  { country: "Puerto Rico - Guaynabo - SIG", zone: "L", price: 372 },
  { country: "Puerto Rico - Ponce - PSE", zone: "L", price: 372 },
  { country: "Puerto Rico - San Juan - SJU", zone: "L", price: 372 },
  { country: "Qatar", zone: "A", price: 135 },
  { country: "Republic of Moldova", zone: "I", price: 240 },
  { country: "Romania", zone: "I", price: 240 },
  { country: "Russian Federation", zone: "I", price: 240 },
  { country: "Rwanda", zone: "L", price: 372 },
  { country: "Réunion", zone: "L", price: 372 },
  { country: "Saint Lucia", zone: "L", price: 372 },
  { country: "Samoa", zone: "L", price: 372 },
  { country: "Saudi Arabia", zone: "B", price: 185 },
  { country: "Senegal", zone: "L", price: 372 },
  { country: "Serbia", zone: "I", price: 240 },
  { country: "Seychelles", zone: "K", price: 335 },
  { country: "Singapore", zone: "G", price: 215 },
  { country: "Slovakia", zone: "I", price: 240 },
  { country: "Slovenia", zone: "I", price: 240 },
  { country: "South Africa", zone: "J", price: 295 },
  { country: "South Korea", zone: "H", price: 225 },
  { country: "Spain", zone: "D", price: 185 },
  { country: "Sri Lanka", zone: "C", price: 165 },
  { country: "St. Kitts and Nevis", zone: "L", price: 372 },
  { country: "St. Maarten", zone: "L", price: 372 },
  { country: "St. Martin", zone: "L", price: 372 },
  { country: "St. Vincent & the Grenadines", zone: "L", price: 372 },
  { country: "Suriname", zone: "L", price: 372 },
  { country: "Swaziland", zone: "J", price: 295 },
  { country: "Sweden", zone: "D", price: 185 },
  { country: "Switzerland", zone: "D", price: 185 },
  { country: "Taiwan", zone: "G", price: 215 },
  { country: "Thailand", zone: "G", price: 215 },
  { country: "Togo", zone: "L", price: 372 },
  { country: "Tonga", zone: "L", price: 372 },
  { country: "Trinidad & Tobago", zone: "L", price: 372 },
  { country: "Tunisia", zone: "K", price: 335 },
  { country: "Turkey", zone: "I", price: 240 },
  { country: "Turks & Caicos Islands", zone: "L", price: 372 },
  { country: "United Arab Emirates", zone: "A", price: 30 },
  { country: "U.S. Virgin Islands", zone: "L", price: 372 },
  { country: "U.S.A. - REST OF COUNTRY", zone: "E", price: 240 },
  { country: "Uganda", zone: "K", price: 335 },
  { country: "Ukraine", zone: "I", price: 240 },
  { country: "United Kingdom (Great Britain)", zone: "D", price: 185 },
  { country: "United Republic of Tanzania", zone: "K", price: 335 },
  { country: "Uruguay", zone: "L", price: 372 },
  { country: "Uzbekistan", zone: "L", price: 372 },
  { country: "Vanuatu", zone: "L", price: 372 },
  { country: "Vatican City", zone: "D", price: 185 },
  { country: "Venezuela", zone: "L", price: 372 },
  { country: "Vietnam", zone: "H", price: 225 },
  { country: "Wallis & Futuna", zone: "L", price: 372 },
  { country: "Zambia", zone: "J", price: 295 },
  { country: "Zimbabwe", zone: "L", price: 372 },
];

export default fedexList;