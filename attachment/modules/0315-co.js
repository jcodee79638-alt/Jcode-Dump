
async function co(c, t, e) {
  {
    const i = ho(c, t);
    (i.width > 4096 || i.height > 4096 || i.width * i.height > 12e6) && Et("image");
  }
  const s = await createImageBitmap(new Blob([c], { type: t }));
  try {
    return (
      (s.width > 4096 || s.height > 4096 || s.width * s.height > 12e6) && Et("image"),
      await kn(s, s.width, s.height, e)
    );
  } finally {
    s.close();
  }
}