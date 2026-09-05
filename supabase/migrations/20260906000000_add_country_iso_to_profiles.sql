-- Add country_iso derived from the phone dial code (E.164).
-- Run in Supabase SQL editor.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS country_iso text;

-- Backfill existing rows with '+' from their dial code (longest match first).
UPDATE public.profiles
SET country_iso = CASE
      WHEN contact_number::text LIKE '+1242%' THEN 'BS' -- Bahamas
      WHEN contact_number::text LIKE '+1246%' THEN 'BB' -- Barbados
      WHEN contact_number::text LIKE '+1264%' THEN 'AI' -- Anguilla
      WHEN contact_number::text LIKE '+1268%' THEN 'AG' -- Antigua & Barbuda
      WHEN contact_number::text LIKE '+1284%' THEN 'VG' -- British Virgin Islands
      WHEN contact_number::text LIKE '+1340%' THEN 'VI' -- US Virgin Islands
      WHEN contact_number::text LIKE '+1345%' THEN 'KY' -- Cayman Islands
      WHEN contact_number::text LIKE '+1441%' THEN 'BM' -- Bermuda
      WHEN contact_number::text LIKE '+1473%' THEN 'GD' -- Grenada
      WHEN contact_number::text LIKE '+1649%' THEN 'TC' -- Turks & Caicos
      WHEN contact_number::text LIKE '+1664%' THEN 'MS' -- Montserrat
      WHEN contact_number::text LIKE '+1670%' THEN 'MP' -- Northern Mariana Islands
      WHEN contact_number::text LIKE '+1671%' THEN 'GU' -- Guam
      WHEN contact_number::text LIKE '+1684%' THEN 'AS' -- American Samoa
      WHEN contact_number::text LIKE '+1721%' THEN 'SX' -- Sint Maarten
      WHEN contact_number::text LIKE '+1758%' THEN 'LC' -- Saint Lucia
      WHEN contact_number::text LIKE '+1767%' THEN 'DM' -- Dominica
      WHEN contact_number::text LIKE '+1784%' THEN 'VC' -- Saint Vincent & Grenadines
      WHEN contact_number::text LIKE '+1787%' THEN 'PR' -- Puerto Rico
      WHEN contact_number::text LIKE '+1809%' THEN 'DO' -- Dominican Republic
      WHEN contact_number::text LIKE '+1868%' THEN 'TT' -- Trinidad & Tobago
      WHEN contact_number::text LIKE '+1869%' THEN 'KN' -- Saint Kitts & Nevis
      WHEN contact_number::text LIKE '+1876%' THEN 'JM' -- Jamaica
      WHEN contact_number::text LIKE '+211%' THEN 'SS' -- South Sudan
      WHEN contact_number::text LIKE '+212%' THEN 'EH' -- Western Sahara
      WHEN contact_number::text LIKE '+212%' THEN 'MA' -- Morocco
      WHEN contact_number::text LIKE '+213%' THEN 'DZ' -- Algeria
      WHEN contact_number::text LIKE '+216%' THEN 'TN' -- Tunisia
      WHEN contact_number::text LIKE '+218%' THEN 'LY' -- Libya
      WHEN contact_number::text LIKE '+220%' THEN 'GM' -- Gambia
      WHEN contact_number::text LIKE '+221%' THEN 'SN' -- Senegal
      WHEN contact_number::text LIKE '+222%' THEN 'MR' -- Mauritania
      WHEN contact_number::text LIKE '+223%' THEN 'ML' -- Mali
      WHEN contact_number::text LIKE '+224%' THEN 'GN' -- Guinea
      WHEN contact_number::text LIKE '+225%' THEN 'CI' -- Cote d'Ivoire
      WHEN contact_number::text LIKE '+226%' THEN 'BF' -- Burkina Faso
      WHEN contact_number::text LIKE '+227%' THEN 'NE' -- Niger
      WHEN contact_number::text LIKE '+228%' THEN 'TG' -- Togo
      WHEN contact_number::text LIKE '+229%' THEN 'BJ' -- Benin
      WHEN contact_number::text LIKE '+230%' THEN 'MU' -- Mauritius
      WHEN contact_number::text LIKE '+231%' THEN 'LR' -- Liberia
      WHEN contact_number::text LIKE '+232%' THEN 'SL' -- Sierra Leone
      WHEN contact_number::text LIKE '+233%' THEN 'GH' -- Ghana
      WHEN contact_number::text LIKE '+234%' THEN 'NG' -- Nigeria
      WHEN contact_number::text LIKE '+235%' THEN 'TD' -- Chad
      WHEN contact_number::text LIKE '+236%' THEN 'CF' -- Central African Republic
      WHEN contact_number::text LIKE '+237%' THEN 'CM' -- Cameroon
      WHEN contact_number::text LIKE '+238%' THEN 'CV' -- Cape Verde
      WHEN contact_number::text LIKE '+239%' THEN 'ST' -- Sao Tome & Principe
      WHEN contact_number::text LIKE '+240%' THEN 'GQ' -- Equatorial Guinea
      WHEN contact_number::text LIKE '+241%' THEN 'GA' -- Gabon
      WHEN contact_number::text LIKE '+242%' THEN 'CG' -- Congo
      WHEN contact_number::text LIKE '+243%' THEN 'CD' -- Congo (DRC)
      WHEN contact_number::text LIKE '+244%' THEN 'AO' -- Angola
      WHEN contact_number::text LIKE '+245%' THEN 'GW' -- Guinea-Bissau
      WHEN contact_number::text LIKE '+246%' THEN 'IO' -- British Indian Ocean Territory
      WHEN contact_number::text LIKE '+247%' THEN 'AC' -- Ascension Island
      WHEN contact_number::text LIKE '+248%' THEN 'SC' -- Seychelles
      WHEN contact_number::text LIKE '+249%' THEN 'SD' -- Sudan
      WHEN contact_number::text LIKE '+250%' THEN 'RW' -- Rwanda
      WHEN contact_number::text LIKE '+251%' THEN 'ET' -- Ethiopia
      WHEN contact_number::text LIKE '+252%' THEN 'SO' -- Somalia
      WHEN contact_number::text LIKE '+253%' THEN 'DJ' -- Djibouti
      WHEN contact_number::text LIKE '+254%' THEN 'KE' -- Kenya
      WHEN contact_number::text LIKE '+255%' THEN 'TZ' -- Tanzania
      WHEN contact_number::text LIKE '+256%' THEN 'UG' -- Uganda
      WHEN contact_number::text LIKE '+257%' THEN 'BI' -- Burundi
      WHEN contact_number::text LIKE '+258%' THEN 'MZ' -- Mozambique
      WHEN contact_number::text LIKE '+260%' THEN 'ZM' -- Zambia
      WHEN contact_number::text LIKE '+261%' THEN 'MG' -- Madagascar
      WHEN contact_number::text LIKE '+262%' THEN 'RE' -- Reunion
      WHEN contact_number::text LIKE '+262%' THEN 'YT' -- Mayotte
      WHEN contact_number::text LIKE '+263%' THEN 'ZW' -- Zimbabwe
      WHEN contact_number::text LIKE '+264%' THEN 'NA' -- Namibia
      WHEN contact_number::text LIKE '+265%' THEN 'MW' -- Malawi
      WHEN contact_number::text LIKE '+266%' THEN 'LS' -- Lesotho
      WHEN contact_number::text LIKE '+267%' THEN 'BW' -- Botswana
      WHEN contact_number::text LIKE '+268%' THEN 'SZ' -- Eswatini
      WHEN contact_number::text LIKE '+269%' THEN 'KM' -- Comoros
      WHEN contact_number::text LIKE '+290%' THEN 'SH' -- Saint Helena
      WHEN contact_number::text LIKE '+291%' THEN 'ER' -- Eritrea
      WHEN contact_number::text LIKE '+297%' THEN 'AW' -- Aruba
      WHEN contact_number::text LIKE '+298%' THEN 'FO' -- Faroe Islands
      WHEN contact_number::text LIKE '+299%' THEN 'GL' -- Greenland
      WHEN contact_number::text LIKE '+350%' THEN 'GI' -- Gibraltar
      WHEN contact_number::text LIKE '+351%' THEN 'PT' -- Portugal
      WHEN contact_number::text LIKE '+352%' THEN 'LU' -- Luxembourg
      WHEN contact_number::text LIKE '+353%' THEN 'IE' -- Ireland
      WHEN contact_number::text LIKE '+354%' THEN 'IS' -- Iceland
      WHEN contact_number::text LIKE '+355%' THEN 'AL' -- Albania
      WHEN contact_number::text LIKE '+356%' THEN 'MT' -- Malta
      WHEN contact_number::text LIKE '+357%' THEN 'CY' -- Cyprus
      WHEN contact_number::text LIKE '+358%' THEN 'AX' -- Aland Islands
      WHEN contact_number::text LIKE '+358%' THEN 'FI' -- Finland
      WHEN contact_number::text LIKE '+359%' THEN 'BG' -- Bulgaria
      WHEN contact_number::text LIKE '+370%' THEN 'LT' -- Lithuania
      WHEN contact_number::text LIKE '+371%' THEN 'LV' -- Latvia
      WHEN contact_number::text LIKE '+372%' THEN 'EE' -- Estonia
      WHEN contact_number::text LIKE '+373%' THEN 'MD' -- Moldova
      WHEN contact_number::text LIKE '+374%' THEN 'AM' -- Armenia
      WHEN contact_number::text LIKE '+375%' THEN 'BY' -- Belarus
      WHEN contact_number::text LIKE '+376%' THEN 'AD' -- Andorra
      WHEN contact_number::text LIKE '+377%' THEN 'MC' -- Monaco
      WHEN contact_number::text LIKE '+378%' THEN 'SM' -- San Marino
      WHEN contact_number::text LIKE '+379%' THEN 'VA' -- Vatican City
      WHEN contact_number::text LIKE '+380%' THEN 'UA' -- Ukraine
      WHEN contact_number::text LIKE '+381%' THEN 'RS' -- Serbia
      WHEN contact_number::text LIKE '+382%' THEN 'ME' -- Montenegro
      WHEN contact_number::text LIKE '+383%' THEN 'XK' -- Kosovo
      WHEN contact_number::text LIKE '+385%' THEN 'HR' -- Croatia
      WHEN contact_number::text LIKE '+386%' THEN 'SI' -- Slovenia
      WHEN contact_number::text LIKE '+387%' THEN 'BA' -- Bosnia & Herzegovina
      WHEN contact_number::text LIKE '+389%' THEN 'MK' -- North Macedonia
      WHEN contact_number::text LIKE '+420%' THEN 'CZ' -- Czechia
      WHEN contact_number::text LIKE '+421%' THEN 'SK' -- Slovakia
      WHEN contact_number::text LIKE '+423%' THEN 'LI' -- Liechtenstein
      WHEN contact_number::text LIKE '+500%' THEN 'FK' -- Falkland Islands
      WHEN contact_number::text LIKE '+501%' THEN 'BZ' -- Belize
      WHEN contact_number::text LIKE '+502%' THEN 'GT' -- Guatemala
      WHEN contact_number::text LIKE '+503%' THEN 'SV' -- El Salvador
      WHEN contact_number::text LIKE '+504%' THEN 'HN' -- Honduras
      WHEN contact_number::text LIKE '+505%' THEN 'NI' -- Nicaragua
      WHEN contact_number::text LIKE '+506%' THEN 'CR' -- Costa Rica
      WHEN contact_number::text LIKE '+507%' THEN 'PA' -- Panama
      WHEN contact_number::text LIKE '+508%' THEN 'PM' -- Saint Pierre & Miquelon
      WHEN contact_number::text LIKE '+509%' THEN 'HT' -- Haiti
      WHEN contact_number::text LIKE '+590%' THEN 'BL' -- Saint Barthelemy
      WHEN contact_number::text LIKE '+590%' THEN 'GP' -- Guadeloupe
      WHEN contact_number::text LIKE '+590%' THEN 'MF' -- Saint Martin
      WHEN contact_number::text LIKE '+591%' THEN 'BO' -- Bolivia
      WHEN contact_number::text LIKE '+592%' THEN 'GY' -- Guyana
      WHEN contact_number::text LIKE '+593%' THEN 'EC' -- Ecuador
      WHEN contact_number::text LIKE '+594%' THEN 'GF' -- French Guiana
      WHEN contact_number::text LIKE '+595%' THEN 'PY' -- Paraguay
      WHEN contact_number::text LIKE '+596%' THEN 'MQ' -- Martinique
      WHEN contact_number::text LIKE '+597%' THEN 'SR' -- Suriname
      WHEN contact_number::text LIKE '+598%' THEN 'UY' -- Uruguay
      WHEN contact_number::text LIKE '+599%' THEN 'BQ' -- Bonaire
      WHEN contact_number::text LIKE '+599%' THEN 'CW' -- Curacao
      WHEN contact_number::text LIKE '+670%' THEN 'TL' -- Timor-Leste
      WHEN contact_number::text LIKE '+672%' THEN 'AQ' -- Antarctica
      WHEN contact_number::text LIKE '+672%' THEN 'NF' -- Norfolk Island
      WHEN contact_number::text LIKE '+673%' THEN 'BN' -- Brunei
      WHEN contact_number::text LIKE '+674%' THEN 'NR' -- Nauru
      WHEN contact_number::text LIKE '+675%' THEN 'PG' -- Papua New Guinea
      WHEN contact_number::text LIKE '+676%' THEN 'TO' -- Tonga
      WHEN contact_number::text LIKE '+677%' THEN 'SB' -- Solomon Islands
      WHEN contact_number::text LIKE '+678%' THEN 'VU' -- Vanuatu
      WHEN contact_number::text LIKE '+679%' THEN 'FJ' -- Fiji
      WHEN contact_number::text LIKE '+680%' THEN 'PW' -- Palau
      WHEN contact_number::text LIKE '+681%' THEN 'WF' -- Wallis & Futuna
      WHEN contact_number::text LIKE '+682%' THEN 'CK' -- Cook Islands
      WHEN contact_number::text LIKE '+683%' THEN 'NU' -- Niue
      WHEN contact_number::text LIKE '+685%' THEN 'WS' -- Samoa
      WHEN contact_number::text LIKE '+686%' THEN 'KI' -- Kiribati
      WHEN contact_number::text LIKE '+687%' THEN 'NC' -- New Caledonia
      WHEN contact_number::text LIKE '+688%' THEN 'TV' -- Tuvalu
      WHEN contact_number::text LIKE '+689%' THEN 'PF' -- French Polynesia
      WHEN contact_number::text LIKE '+690%' THEN 'TK' -- Tokelau
      WHEN contact_number::text LIKE '+691%' THEN 'FM' -- Micronesia
      WHEN contact_number::text LIKE '+692%' THEN 'MH' -- Marshall Islands
      WHEN contact_number::text LIKE '+850%' THEN 'KP' -- North Korea
      WHEN contact_number::text LIKE '+852%' THEN 'HK' -- Hong Kong
      WHEN contact_number::text LIKE '+853%' THEN 'MO' -- Macau
      WHEN contact_number::text LIKE '+855%' THEN 'KH' -- Cambodia
      WHEN contact_number::text LIKE '+856%' THEN 'LA' -- Laos
      WHEN contact_number::text LIKE '+880%' THEN 'BD' -- Bangladesh
      WHEN contact_number::text LIKE '+886%' THEN 'TW' -- Taiwan
      WHEN contact_number::text LIKE '+960%' THEN 'MV' -- Maldives
      WHEN contact_number::text LIKE '+961%' THEN 'LB' -- Lebanon
      WHEN contact_number::text LIKE '+962%' THEN 'JO' -- Jordan
      WHEN contact_number::text LIKE '+963%' THEN 'SY' -- Syria
      WHEN contact_number::text LIKE '+964%' THEN 'IQ' -- Iraq
      WHEN contact_number::text LIKE '+965%' THEN 'KW' -- Kuwait
      WHEN contact_number::text LIKE '+966%' THEN 'SA' -- Saudi Arabia
      WHEN contact_number::text LIKE '+967%' THEN 'YE' -- Yemen
      WHEN contact_number::text LIKE '+968%' THEN 'OM' -- Oman
      WHEN contact_number::text LIKE '+970%' THEN 'PS' -- Palestine
      WHEN contact_number::text LIKE '+971%' THEN 'AE' -- United Arab Emirates
      WHEN contact_number::text LIKE '+972%' THEN 'IL' -- Israel
      WHEN contact_number::text LIKE '+973%' THEN 'BH' -- Bahrain
      WHEN contact_number::text LIKE '+974%' THEN 'QA' -- Qatar
      WHEN contact_number::text LIKE '+975%' THEN 'BT' -- Bhutan
      WHEN contact_number::text LIKE '+976%' THEN 'MN' -- Mongolia
      WHEN contact_number::text LIKE '+977%' THEN 'NP' -- Nepal
      WHEN contact_number::text LIKE '+992%' THEN 'TJ' -- Tajikistan
      WHEN contact_number::text LIKE '+993%' THEN 'TM' -- Turkmenistan
      WHEN contact_number::text LIKE '+994%' THEN 'AZ' -- Azerbaijan
      WHEN contact_number::text LIKE '+995%' THEN 'GE' -- Georgia
      WHEN contact_number::text LIKE '+996%' THEN 'KG' -- Kyrgyzstan
      WHEN contact_number::text LIKE '+998%' THEN 'UZ' -- Uzbekistan
      WHEN contact_number::text LIKE '+20%' THEN 'EG' -- Egypt
      WHEN contact_number::text LIKE '+27%' THEN 'ZA' -- South Africa
      WHEN contact_number::text LIKE '+30%' THEN 'GR' -- Greece
      WHEN contact_number::text LIKE '+31%' THEN 'NL' -- Netherlands
      WHEN contact_number::text LIKE '+32%' THEN 'BE' -- Belgium
      WHEN contact_number::text LIKE '+33%' THEN 'FR' -- France
      WHEN contact_number::text LIKE '+34%' THEN 'ES' -- Spain
      WHEN contact_number::text LIKE '+36%' THEN 'HU' -- Hungary
      WHEN contact_number::text LIKE '+39%' THEN 'IT' -- Italy
      WHEN contact_number::text LIKE '+40%' THEN 'RO' -- Romania
      WHEN contact_number::text LIKE '+41%' THEN 'CH' -- Switzerland
      WHEN contact_number::text LIKE '+43%' THEN 'AT' -- Austria
      WHEN contact_number::text LIKE '+44%' THEN 'GB' -- United Kingdom
      WHEN contact_number::text LIKE '+44%' THEN 'GG' -- Guernsey
      WHEN contact_number::text LIKE '+44%' THEN 'IM' -- Isle of Man
      WHEN contact_number::text LIKE '+44%' THEN 'JE' -- Jersey
      WHEN contact_number::text LIKE '+45%' THEN 'DK' -- Denmark
      WHEN contact_number::text LIKE '+46%' THEN 'SE' -- Sweden
      WHEN contact_number::text LIKE '+47%' THEN 'NO' -- Norway
      WHEN contact_number::text LIKE '+47%' THEN 'SJ' -- Svalbard & Jan Mayen
      WHEN contact_number::text LIKE '+48%' THEN 'PL' -- Poland
      WHEN contact_number::text LIKE '+49%' THEN 'DE' -- Germany
      WHEN contact_number::text LIKE '+51%' THEN 'PE' -- Peru
      WHEN contact_number::text LIKE '+52%' THEN 'MX' -- Mexico
      WHEN contact_number::text LIKE '+53%' THEN 'CU' -- Cuba
      WHEN contact_number::text LIKE '+54%' THEN 'AR' -- Argentina
      WHEN contact_number::text LIKE '+55%' THEN 'BR' -- Brazil
      WHEN contact_number::text LIKE '+56%' THEN 'CL' -- Chile
      WHEN contact_number::text LIKE '+57%' THEN 'CO' -- Colombia
      WHEN contact_number::text LIKE '+58%' THEN 'VE' -- Venezuela
      WHEN contact_number::text LIKE '+60%' THEN 'MY' -- Malaysia
      WHEN contact_number::text LIKE '+61%' THEN 'AU' -- Australia
      WHEN contact_number::text LIKE '+61%' THEN 'CC' -- Cocos Islands
      WHEN contact_number::text LIKE '+61%' THEN 'CX' -- Christmas Island
      WHEN contact_number::text LIKE '+62%' THEN 'ID' -- Indonesia
      WHEN contact_number::text LIKE '+63%' THEN 'PH' -- Philippines
      WHEN contact_number::text LIKE '+64%' THEN 'NZ' -- New Zealand
      WHEN contact_number::text LIKE '+65%' THEN 'SG' -- Singapore
      WHEN contact_number::text LIKE '+66%' THEN 'TH' -- Thailand
      WHEN contact_number::text LIKE '+81%' THEN 'JP' -- Japan
      WHEN contact_number::text LIKE '+82%' THEN 'KR' -- South Korea
      WHEN contact_number::text LIKE '+84%' THEN 'VN' -- Vietnam
      WHEN contact_number::text LIKE '+86%' THEN 'CN' -- China
      WHEN contact_number::text LIKE '+90%' THEN 'TR' -- Turkey
      WHEN contact_number::text LIKE '+91%' THEN 'IN' -- India
      WHEN contact_number::text LIKE '+92%' THEN 'PK' -- Pakistan
      WHEN contact_number::text LIKE '+93%' THEN 'AF' -- Afghanistan
      WHEN contact_number::text LIKE '+94%' THEN 'LK' -- Sri Lanka
      WHEN contact_number::text LIKE '+95%' THEN 'MM' -- Myanmar
      WHEN contact_number::text LIKE '+98%' THEN 'IR' -- Iran
      WHEN contact_number::text LIKE '+1%' THEN 'US' -- United States
      WHEN contact_number::text LIKE '+7%' THEN 'RU' -- Russia
      WHEN contact_number::text LIKE '+1%' THEN 'CA' -- Canada
      WHEN contact_number::text LIKE '+7%' THEN 'KZ' -- Kazakhstan
      ELSE country_iso
    END
WHERE country_iso IS NULL
  AND contact_number::text LIKE '+%';

-- Legacy 10-digit rows were collected before country codes existed (India default).
UPDATE public.profiles
SET country_iso = 'IN'
WHERE country_iso IS NULL;
