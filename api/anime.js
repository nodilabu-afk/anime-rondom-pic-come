export default async function handler(req, res) {
  const POPULAR = [
    // Jujutsu Kaisen
    "gojo satoru","ryomen sukuna","yuji itadori","megumi fushiguro","nobara kugisaki",
    "toji fushiguro","nanami kento","yuta okkotsu","geto suguru","choso","mahito",
    "toge inumaki","maki zenin","panda jujutsu",

    // Classroom of the Elite
    "ayanokoji kiyotaka","ryuen kakeru","koenji rokusuke","hirata yosuke",
    "horikita manabu","suzune horikita",

    // Naruto / Boruto
    "naruto uzumaki","sasuke uchiha","itachi uchiha","kakashi hatake","madara uchiha",
    "obito uchiha","minato namikaze","jiraiya","pain","nagato","gaara","rock lee",
    "shikamaru nara","neji hyuga","hashirama senju","tobirama senju","tsunade",
    "orochimaru","deidara","kisame hoshigaki","might guy",
    "boruto uzumaki","kawaki","sarada uchiha",

    // One Piece
    "monkey d luffy","roronoa zoro","sanji","trafalgar law","portgas d ace","shanks",
    "whitebeard","blackbeard","kaido","big mom","katakuri","doflamingo","dracule mihawk",
    "rob lucci","sabo","marco","eustass kid","killer","rayleigh","jinbe",

    // Attack on Titan
    "eren yeager","levi ackerman","mikasa ackerman","armin arlert","erwin smith",
    "zeke yeager","reiner braun","jean kirstein","hange zoe","annie leonhart",

    // Demon Slayer
    "tanjiro kamado","zenitsu agatsuma","inosuke hashibira","giyu tomioka",
    "rengoku kyojuro","tengen uzui","muzan kibutsuji","akaza","kokushibo",

    // Tokyo Revengers
    "mikey","draken","takemichi hanagaki","baji keisuke","kisaki tetta",
    "chifuyu matsuno","kazutora hanemiya",

    // Dragon Ball
    "goku","vegeta","gohan","trunks","frieza","broly","cell","piccolo","beerus",

    // Bleach
    "ichigo kurosaki","aizen sosuke","byakuya kuchiki","kenpachi zaraki",
    "toshiro hitsugaya","ulquiorra","grimjow","rukia kuchiki","kisuke urahara",

    // Death Note
    "light yagami","l lawliet","ryuk","near","mello",

    // Hunter x Hunter
    "gon freecss","killua zoldyck","hisoka","kurapika","chrollo lucilfer",
    "meruem","netero",

    // My Hero Academia
    "izuku midoriya","bakugo katsuki","shoto todoroki","all might","hawks",
    "dabi","shigaraki","endeavor",

    // Chainsaw Man
    "denji","aki hayakawa","power","makima","kishibe",

    // One Punch Man
    "saitama","genos","garou","king",

    // Tokyo Ghoul
    "kaneki ken","kishou arima","juuzou suzuya",

    // Fullmetal Alchemist
    "edward elric","alphonse elric","roy mustang","scar",

    // Vinland Saga
    "thorfinn","askeladd","thorkell",

    // Blue Lock
    "isagi yoichi","bachira meguru","nagi seishiro","rin itoshi","barou shohei",

    // Spy x Family
    "loid forger",

    // Solo Leveling
    "sung jinwoo",

    // JoJo
    "jotaro kujo","dio brando","giorno giovanna",

    // Dr. Stone
    "senku ishigami",

    // Black Clover
    "asta","yuno","yami sukehiro"
  ];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function fetchCharacter(name) {
    const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(
      name
    )}&limit=1`;

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
    // try 5 times so it always works
    for (let i = 0; i < 5; i++) {
      const name = pickRandom(POPULAR);
      const result = await fetchCharacter(name);

      if (result?.image) {
        return res.status(200).json({
          ok: true,
          ...result
        });
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
