export default async function handler(req, res) {
  const POPULAR = [
    "gojo satoru","ryomen sukuna","yuji itadori","megumi fushiguro","toji fushiguro",
    "nanami kento","yuta okkotsu","geto suguru","choso","mahito",

    "ayanokoji kiyotaka","ryuen kakeru","koenji rokusuke",

    "naruto uzumaki","sasuke uchiha","itachi uchiha","kakashi hatake","madara uchiha",
    "obito uchiha","minato namikaze","jiraiya","pain","gaara","rock lee","shikamaru nara",

    "monkey d luffy","roronoa zoro","sanji","trafalgar law","portgas d ace","shanks",
    "whitebeard","blackbeard","kaido","katakuri","doflamingo","dracule mihawk",

    "eren yeager","levi ackerman","armin arlert","erwin smith","zeke yeager","reiner braun",

    "tanjiro kamado","zenitsu agatsuma","inosuke hashibira","giyu tomioka",
    "rengoku kyojuro","tengen uzui","muzan kibutsuji","akaza",

    "goku","vegeta","gohan","trunks","frieza","broly","cell",

    "ichigo kurosaki","aizen sosuke","byakuya kuchiki","kenpachi zaraki","ulquiorra",

    "light yagami","l lawliet","ryuk",

    "gon freecss","killua zoldyck","hisoka","kurapika","chrollo lucilfer",

    "izuku midoriya","bakugo katsuki","shoto todoroki","all might","hawks","dabi",

    "denji","aki hayakawa","kishibe",

    "saitama","genos","garou",

    "kaneki ken","kishou arima",

    "edward elric","roy mustang",

    "thorfinn","askeladd",

    "isagi yoichi","bachira meguru","nagi seishiro","rin itoshi",

    "loid forger",

    "sung jinwoo"
  ];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function fetchCharacter(name) {
    const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data?.data?.length) return null;

    const c = data.data[0];
    return {
      query: name,
      name: c.name,
      image: c.images?.jpg?.image_url || null,
      mal_id: c.mal_id,
      url: c.url
    };
  }

  try {
    for (let i = 0; i < 5; i++) {
      const name = pickRandom(POPULAR);
      const result = await fetchCharacter(name);

      if (result?.image) {
        return res.status(200).json({ ok: true, ...result });
      }
    }

    return res.status(404).json({
      ok: false,
      message: "No character found after multiple tries"
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      details: String(e)
    });
  }
}
