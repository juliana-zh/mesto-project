const karachaevsk = new URL('../images/karachaevsk.jpg', import.meta.url);
const mount_elbrus = new URL('../images/mount_elbrus.jpg', import.meta.url);
const dombay = new URL('../images/dombay.jpg', import.meta.url);
const amazonka = new URL('../images/amazonka.jpg', import.meta.url);
const antarktida = new URL('../images/antarktida.jpg', import.meta.url);
const karach_cherk = new URL('../images/karach-cherk.jpg', import.meta.url);

export const cardsInfo = [
  {
    src: karachaevsk,
    alt: 'Старинное здание на фоне гор и лесов',
    captionText: 'Карачаевск',
  },
  {
    src: mount_elbrus,
    alt: 'Поле, куст, и вдалеке виднеется гора',
    captionText: 'Гора Эльбрус',
  },
  {
    src: dombay,
    alt: 'Горы, покрытые лесом, и на заднем фоне заснеженная вершина',
    captionText: 'Домбай',
  },
  {
    src: amazonka,
    alt: 'Вид на реку Амазонку сверху',
    captionText: 'Амазонка',
  },
  {
    src: antarktida,
    alt: 'Ледник и океан',
    captionText: 'Антарктида',
  },
  {
    src: karach_cherk,
    alt: 'Озеро, в котором отражаются горы',
    captionText: 'Карачаево-Черкесия',
  },
]
