export async function GET() {
  const POPULAR = [
    "gojo satoru","ryomen sukuna","yuji itadori","megumi fushiguro","toji fushiguro",
    "nanami kento","yuta okkotsu",

    "ayanokoji kiyotaka","ryuen kakeru","koenji rokusuke",

    "naruto uzumaki","sasuke uchiha","itachi uchiha","kakashi hatake","madara uchiha",
    "obito uchiha","minato namikaze","jiraiya","pain","gaara",

    "monkey d luffy","roronoa zoro","sanji","trafalgar law","portgas d ace","shanks",

    "eren yeager","levi ackerman","armin arlert","erwin smith",

    "tanjiro kamado","zenitsu agatsuma","inosuke hashibira","giyu tomioka",
    "rengoku kyojuro","tengen uzui",

    "goku","vegeta","trunks","frieza",

    "ichigo kurosaki","aizen sosuke","byakuya kuchiki",

    "light yagami","l lawliet","ryuk",

    "gon freecss","killua zoldyck","hisoka",

    "izuku midoriya","bakugo katsuki","shoto todoroki",

    "denji","aki hayakawa",

    "saitama","genos","garou",

    "kaneki ken",

    "thorfinn",

    "isagi yoichi",

    "sung jinwoo"
  ];

  const pick = POPULAR[Math.floor(Math.random() * POPULAR.length)];

  try {
    const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(pick)}&limit=1`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data?.data?.length) {
      return Response.json(
        { ok: false, message: "No character found", query: pick },
        { status: 404 }
      );
    }

    const c = data.data[0];

    return Response.json({
      ok: true,
      query: pick,
      name: c.name,
      image: c.images?.jpg?.image_url || null,
      mal_id: c.mal_id,
      url: c.url
    });
  } catch (e) {
    return Response.json(
      { ok: false, error: String(e) },
      { status: 500 }
    );
  }
}
