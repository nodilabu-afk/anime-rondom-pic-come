export default async function handler(req, res) {
  const POPULAR = [
    "gojo satoru","ayanokoji kiyotaka","naruto uzumaki","sasuke uchiha","itachi uchiha",
    "kakashi hatake","madara uchiha","monkey d luffy","roronoa zoro","sanji",
    "eren yeager","levi ackerman","tanjiro kamado","rengoku kyojuro",
    "goku","vegeta","ichigo kurosaki","aizen sosuke","light yagami","l lawliet",
    "gon freecss","killua zoldyck","saitama","genos","kaneki ken","thorfinn",
    "isagi yoichi","sung jinwoo"
  ];

  const pick = POPULAR[Math.floor(Math.random() * POPULAR.length)];

  try {
    const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(pick)}&limit=1`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data?.data?.length) {
      return res.status(404).json({ ok: false, message: "No character found" });
    }

    const c = data.data[0];

    return res.status(200).json({
      ok: true,
      query: pick,
      name: c.name,
      image: c.images?.jpg?.image_url,
      mal_id: c.mal_id,
      url: c.url
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
