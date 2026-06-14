const API_KEY = '04e8b6c22a81095fde8803f9effb3ae2'
const BASE = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p/w500'

const films = [
  // Tech films
  { id: 'tech-moon',       title: 'A Trip to the Moon',              year: 1902 },
  { id: 'tech-birth',      title: 'The Birth of a Nation',           year: 1915 },
  { id: 'tech-battleship', title: 'Battleship Potemkin',             year: 1925 },
  { id: 'tech-jazz',       title: 'The Jazz Singer',                 year: 1927 },
  { id: 'tech-snow',       title: 'Snow White and the Seven Dwarfs', year: 1937 },
  { id: 'tech-wizard',     title: 'The Wizard of Oz',                year: 1939 },
  { id: 'tech-kane',       title: 'Citizen Kane',                    year: 1941 },
  { id: 'tech-2001',       title: '2001: A Space Odyssey',           year: 1968 },
  { id: 'tech-jaws',       title: 'Jaws',                            year: 1975 },
  { id: 'tech-starwars',   title: 'Star Wars',                       year: 1977 },
  { id: 'tech-tron',       title: 'Tron',                            year: 1982 },
  { id: 'tech-t2',         title: 'Terminator 2: Judgment Day',      year: 1991 },
  { id: 'tech-jurassic',   title: 'Jurassic Park',                   year: 1993 },
  { id: 'tech-toystory',   title: 'Toy Story',                       year: 1995 },
  { id: 'tech-matrix',     title: 'The Matrix',                      year: 1999 },
  { id: 'tech-avatar',     title: 'Avatar',                          year: 2009 },
  { id: 'tech-gravity',    title: 'Gravity',                         year: 2013 },
  { id: 'tech-mandalorian',title: 'The Mandalorian',                 year: 2019 },
  // Industry films
  { id: 'ind-birth',       title: 'The Birth of a Nation',           year: 1915 },
  { id: 'ind-jazz',        title: 'The Jazz Singer',                 year: 1927 },
  { id: 'ind-snow',        title: 'Snow White and the Seven Dwarfs', year: 1937 },
  { id: 'ind-gone',        title: 'Gone with the Wind',              year: 1939 },
  { id: 'ind-roman',       title: 'Roman Holiday',                   year: 1953 },
  { id: 'ind-benhur',      title: 'Ben-Hur',                         year: 1959 },
  { id: 'ind-bond',        title: 'Dr. No',                          year: 1962 },
  { id: 'ind-easyrider',   title: 'Easy Rider',                      year: 1969 },
  { id: 'ind-godfather',   title: 'The Godfather',                   year: 1972 },
  { id: 'ind-jaws',        title: 'Jaws',                            year: 1975 },
  { id: 'ind-starwars',    title: 'Star Wars',                       year: 1977 },
  { id: 'ind-batman',      title: 'Batman',                          year: 1989 },
  { id: 'ind-titanic',     title: 'Titanic',                         year: 1997 },
  { id: 'ind-blair',       title: 'The Blair Witch Project',         year: 1999 },
  { id: 'ind-lotr',        title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { id: 'ind-ironman',     title: 'Iron Man',                        year: 2008 },
  { id: 'ind-avatar',      title: 'Avatar',                          year: 2009 },
  { id: 'ind-avengers',    title: 'The Avengers',                    year: 2012 },
  { id: 'ind-parasite',    title: 'Parasite',                        year: 2019 },
  { id: 'ind-topgun',      title: 'Top Gun: Maverick',               year: 2022 },
  // Art films
  { id: 'art-caligari',    title: 'The Cabinet of Dr. Caligari',     year: 1920 },
  { id: 'art-nosferatu',   title: 'Nosferatu',                       year: 1922 },
  { id: 'art-metropolis',  title: 'Metropolis',                      year: 1927 },
  { id: 'art-indemnity',   title: 'Double Indemnity',                year: 1944 },
  { id: 'art-rome',        title: 'Rome Open City',                  year: 1945 },
  { id: 'art-bicycle',     title: 'Bicycle Thieves',                 year: 1948 },
  { id: 'art-sunset',      title: 'Sunset Boulevard',                year: 1950 },
  { id: 'art-strada',      title: 'La Strada',                       year: 1954 },
  { id: 'art-vertigo',     title: 'Vertigo',                         year: 1958 },
  { id: 'art-400blows',    title: 'The 400 Blows',                   year: 1959 },
  { id: 'art-hiroshima',   title: 'Hiroshima Mon Amour',             year: 1959 },
  { id: 'art-breathless',  title: 'Breathless',                      year: 1960 },
  { id: 'art-jules',       title: 'Jules and Jim',                   year: 1962 },
  // Academy Award Best Picture winners
  { id: 'osc-wings',       title: 'Wings',                           year: 1927 },
  { id: 'osc-broadway',    title: 'The Broadway Melody',             year: 1929 },
  { id: 'osc-allquiet',    title: 'All Quiet on the Western Front',  year: 1930 },
  { id: 'osc-cimarron',    title: 'Cimarron',                        year: 1931 },
  { id: 'osc-grandhotel',  title: 'Grand Hotel',                     year: 1932 },
  { id: 'osc-cavalcade',   title: 'Cavalcade',                       year: 1933 },
  { id: 'osc-ithappened',  title: 'It Happened One Night',           year: 1934 },
  { id: 'osc-mutiny',      title: 'Mutiny on the Bounty',            year: 1935 },
  { id: 'osc-ziegfeld',    title: 'The Great Ziegfeld',              year: 1936 },
  { id: 'osc-zola',        title: 'The Life of Emile Zola',          year: 1937 },
  { id: 'osc-youcant',     title: "You Can't Take It with You",      year: 1938 },
  { id: 'osc-rebecca',     title: 'Rebecca',                         year: 1940 },
  { id: 'osc-howgreen',    title: 'How Green Was My Valley',         year: 1941 },
  { id: 'osc-miniver',     title: 'Mrs. Miniver',                    year: 1942 },
  { id: 'osc-casablanca',  title: 'Casablanca',                      year: 1942 },
  { id: 'osc-goingmy',     title: 'Going My Way',                    year: 1944 },
  { id: 'osc-lostweekend', title: 'The Lost Weekend',                year: 1945 },
  { id: 'osc-bestyears',   title: 'The Best Years of Our Lives',     year: 1946 },
  { id: 'osc-gentlemans',  title: "Gentleman's Agreement",           year: 1947 },
  { id: 'osc-hamlet',      title: 'Hamlet',                          year: 1948 },
  { id: 'osc-kingsmen',    title: 'All the King\'s Men',             year: 1949 },
  { id: 'osc-allabout',    title: 'All About Eve',                   year: 1950 },
  { id: 'osc-american',    title: 'An American in Paris',            year: 1951 },
  { id: 'osc-greatest',    title: 'The Greatest Show on Earth',      year: 1952 },
  { id: 'osc-eternity',    title: 'From Here to Eternity',           year: 1953 },
  { id: 'osc-waterfront',  title: 'On the Waterfront',               year: 1954 },
  { id: 'osc-marty',       title: 'Marty',                           year: 1955 },
  { id: 'osc-aroundworld', title: 'Around the World in 80 Days',     year: 1956 },
  { id: 'osc-kwai',        title: 'The Bridge on the River Kwai',    year: 1957 },
  { id: 'osc-gigi',        title: 'Gigi',                            year: 1958 },
  { id: 'osc-apartment',   title: 'The Apartment',                   year: 1960 },
  { id: 'osc-westside',    title: 'West Side Story',                 year: 1961 },
  { id: 'osc-lawrence',    title: 'Lawrence of Arabia',              year: 1962 },
  { id: 'osc-tomjones',    title: 'Tom Jones',                       year: 1963 },
  { id: 'osc-myfairlady',  title: 'My Fair Lady',                    year: 1964 },
  { id: 'osc-soundmusic',  title: 'The Sound of Music',              year: 1965 },
  { id: 'osc-manseasons',  title: 'A Man for All Seasons',           year: 1966 },
  { id: 'osc-heatnight',   title: 'In the Heat of the Night',        year: 1967 },
  { id: 'osc-oliver',      title: 'Oliver!',                         year: 1968 },
  { id: 'osc-midnight',    title: 'Midnight Cowboy',                 year: 1969 },
  { id: 'osc-patton',      title: 'Patton',                          year: 1970 },
  { id: 'osc-french',      title: 'The French Connection',           year: 1971 },
  { id: 'osc-sting',       title: 'The Sting',                       year: 1973 },
  { id: 'osc-godfather2',  title: 'The Godfather Part II',           year: 1974 },
  { id: 'osc-cuckoo',      title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { id: 'osc-rocky',       title: 'Rocky',                           year: 1976 },
  { id: 'osc-anniehall',   title: 'Annie Hall',                      year: 1977 },
  { id: 'osc-deerhunter',  title: 'The Deer Hunter',                 year: 1978 },
  { id: 'osc-kramer',      title: 'Kramer vs. Kramer',               year: 1979 },
  { id: 'osc-ordinary',    title: 'Ordinary People',                 year: 1980 },
  { id: 'osc-chariots',    title: 'Chariots of Fire',                year: 1981 },
  { id: 'osc-gandhi',      title: 'Gandhi',                          year: 1982 },
  { id: 'osc-terms',       title: 'Terms of Endearment',             year: 1983 },
  { id: 'osc-amadeus',     title: 'Amadeus',                         year: 1984 },
  { id: 'osc-africa',      title: 'Out of Africa',                   year: 1985 },
  { id: 'osc-platoon',     title: 'Platoon',                         year: 1986 },
  { id: 'osc-emperor',     title: 'The Last Emperor',                year: 1987 },
  { id: 'osc-rainman',     title: 'Rain Man',                        year: 1988 },
  { id: 'osc-daisy',       title: 'Driving Miss Daisy',              year: 1989 },
  { id: 'osc-dances',      title: 'Dances with Wolves',              year: 1990 },
  { id: 'osc-silence',     title: 'The Silence of the Lambs',        year: 1991 },
  { id: 'osc-unforgiven',  title: 'Unforgiven',                      year: 1992 },
  { id: 'osc-schindler',   title: "Schindler's List",                year: 1993 },
  { id: 'osc-forrest',     title: 'Forrest Gump',                    year: 1994 },
  { id: 'osc-braveheart',  title: 'Braveheart',                      year: 1995 },
  { id: 'osc-english',     title: 'The English Patient',             year: 1996 },
  { id: 'osc-shakespeare', title: 'Shakespeare in Love',             year: 1998 },
  { id: 'osc-beauty',      title: 'American Beauty',                 year: 1999 },
  { id: 'osc-gladiator',   title: 'Gladiator',                       year: 2000 },
  { id: 'osc-beautiful',   title: 'A Beautiful Mind',                year: 2001 },
  { id: 'osc-chicago',     title: 'Chicago',                         year: 2002 },
  { id: 'osc-lotr3',       title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { id: 'osc-million',     title: 'Million Dollar Baby',             year: 2004 },
  { id: 'osc-crash',       title: 'Crash',                           year: 2005 },
  { id: 'osc-departed',    title: 'The Departed',                    year: 2006 },
  { id: 'osc-nocountry',   title: 'No Country for Old Men',          year: 2007 },
  { id: 'osc-slumdog',     title: 'Slumdog Millionaire',             year: 2008 },
  { id: 'osc-hurtlocker',  title: 'The Hurt Locker',                 year: 2009 },
  { id: 'osc-kingspeech',  title: "The King's Speech",               year: 2010 },
  { id: 'osc-artist',      title: 'The Artist',                      year: 2011 },
  { id: 'osc-argo',        title: 'Argo',                            year: 2012 },
  { id: 'osc-12years',     title: '12 Years a Slave',                year: 2013 },
  { id: 'osc-birdman',     title: 'Birdman',                         year: 2014 },
  { id: 'osc-spotlight',   title: 'Spotlight',                       year: 2015 },
  { id: 'osc-moonlight',   title: 'Moonlight',                       year: 2016 },
  { id: 'osc-shapewater',  title: 'The Shape of Water',              year: 2017 },
  { id: 'osc-greenbook',   title: 'Green Book',                      year: 2018 },
  { id: 'osc-nomadland',   title: 'Nomadland',                       year: 2020 },
  { id: 'osc-coda',        title: 'CODA',                            year: 2021 },
  { id: 'osc-eeaao',       title: 'Everything Everywhere All at Once',year: 2022 },
  { id: 'osc-oppenheimer', title: 'Oppenheimer',                     year: 2023 },
]

async function fetchPoster(id, title, year) {
  const url = `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&year=${year}&language=en-US`
  const res = await fetch(url)
  const data = await res.json()
  const result = data.results?.[0]
  if (result?.poster_path) {
    return { id, poster: IMG + result.poster_path }
  }
  // retry without year
  const url2 = `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=en-US`
  const res2 = await fetch(url2)
  const data2 = await res2.json()
  const result2 = data2.results?.[0]
  if (result2?.poster_path) {
    return { id, poster: IMG + result2.poster_path }
  }
  return { id, poster: null }
}

const results = []
for (const film of films) {
  const r = await fetchPoster(film.id, film.title, film.year)
  results.push(r)
  process.stdout.write('.')
}

console.log('\n\n// Poster map:')
console.log('export const POSTERS: Record<string, string> = {')
for (const r of results) {
  if (r.poster) console.log(`  '${r.id}': '${r.poster}',`)
  else console.log(`  // '${r.id}': null,`)
}
console.log('}')
