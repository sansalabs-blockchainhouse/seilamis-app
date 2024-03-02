const collections = [
  {
    name: "Seitama",
    address: "sei1kdmfjsdn5nnd9qsxv5ev8wfyzej3fsd3nrdyapg3v06y5jnjzwvqq25k9f",
    imgUrl:
      "https://3grfs4yhmwdnwencdlfagd6242fptqxi23s64auiwibgmchg6v3q.arweave.net/2aJZcwdlhtsRohrKAw_a5or5wujW5e4CiLICZgjm9Xc/1903.png",
  },
  {
    name: "The Colony",
    address: "sei1pkteljh83a83gmazcvam474f7dwt9wzcyqcf5puxvqqs6jcx8nnq2y74lu",
    imgUrl: "https://static-assets.pallet.exchange/pfp/colony-test.jpeg",
  },
  {
    name: "Seiyans",
    address: "sei1g2a0q3tddzs7vf7lk45c2tgufsaqerxmsdr2cprth3mjtuqxm60qdmravc",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seiyans.png",
  },
  {
    name: "WeBump",
    address: "sei1v90ly54qeu7497lzk2mnmp2h29sgtep8hs5ryvfqf8dwq5gc0t9srp6aey",
    imgUrl: "https://static-assets.pallet.exchange/pfp/webump.jpg",
  },
  {
    name: "dob",
    address: "sei13zrt6ts27fd7rl3hfha7t63udghm0d904ds68h5wsvkkx5md9jqqkd7z5j",
    imgUrl: "https://static-assets.pallet.exchange/pfp/dob.png",
  },
  {
    name: "Yaka Voyager",
    address: "sei13zrt6ts27fd7rl3hfha7t63udghm0d904ds68h5wsvkkx5md9jqqkd7z5j",
    imgUrl: "https://static-assets.pallet.exchange/pfp/yakavoyager.png",
  },
  {
    name: "Cappys",
    address: "sei1cujl8ujhc36lp7sr98x30u0aeqtjlj68kll5rqqr9dke5xvn2ltquzhysl",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/cappys_pfp.png",
  },
  {
    name: "Outlines",
    address: "sei1x50tc96nhw24aytsa4rlrf4un36j9ug5ualz3n320u5g5jd23gpqc4arta",
    imgUrl: "https://static-assets.pallet.exchange/pfp/outlines.jpg",
  },
  {
    name: "Seiyan By Cult",
    address: "sei1x50tc96nhw24aytsa4rlrf4un36j9ug5ualz3n320u5g5jd23gpqc4arta",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seiyanbycult.jpg",
  },
  {
    name: "Seilors",
    address: "sei19lsam8qjj3jacfhsuqnn7zsc9326uje8qp96neukhaxyjtk3pkhs366058",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seilors.png",
  },
  {
    name: "Seipes",
    address: "sei19lsam8qjj3jacfhsuqnn7zsc9326uje8qp96neukhaxyjtk3pkhs366058",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei14mer99s65q95hams86z6rc4yjlsdgl2axul8k9g72qs0jfxf58hq0s7u4y_pfp.png",
  },
  {
    name: "Seimurai",
    address: "sei1atcfjjz779ynmlek4tqh47ssrwge0mhlauyr637wdjkrhtfqdjqqtlcwhl",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seimurai.png",
  },
  {
    name: "Alive1111",
    address: "sei1zjqml63xh7cfjxfe229v9c7krx05ytlz22y3cpf09wz83xck5q9qu73y03",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1zjqml63xh7cfjxfe229v9c7krx05ytlz22y3cpf09wz83xck5q9qu73y03_pfp.png",
  },
  {
    name: "Seitopia",
    address: "sei1wfl480fuwa68yhdzapunsvqmmyuz8ckzz06jgy7h6t7las742qjstw7gs6",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seitopia.png",
  },
  {
    name: "Seitoshis",
    address: "sei1s45l507j760qj34w60rvgrtpcg2mln99tyw7ta9pw9azkt0eavdskszx2e",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1s45l507j760qj34w60rvgrtpcg2mln99tyw7ta9pw9azkt0eavdskszx2e_pfp.png",
  },
  {
    name: "The Rabbit Project",
    address: "sei1vpad5n0m6a0he83mcgp33uem43vst2nykp2nrzkmv57mkgm64a5qlf9ac3",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/rabbit_pfp.png",
  },
  {
    name: "Seitizens",
    address: "sei1tce33460pf433yhn6k97hn554w09ulr37dfc0qrt5j6mzgdvuygs4s4uux",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seitizens.png",
  },
  {
    name: "Seimese Cats",
    address: "sei10d2s36g80sx2qg75p8c8ue2wpmlphy5tk0stfmc9u4tlv728s2ds6wphcj",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seimesecats.png",
  },
  {
    name: "Ghosty",
    address: "sei1svkamkuklth3wls08wt596q2dykf6j55tnnw7rsh5675fsfpj40sjdhn00",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1svkamkuklth3wls08wt596q2dykf6j55tnnw7rsh5675fsfpj40sjdhn00_pfp.png",
  },
  {
    name: "Seimen",
    address: "sei1cnktx4rr8mlyr09hw3u4l8vrrpv6qtght3zcdpzhlf29fq2enluqlpndct",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1cnktx4rr8mlyr09hw3u4l8vrrpv6qtght3zcdpzhlf29fq2enluqlpndct_pfp.png",
  },
  {
    name: "Sei Chicks",
    address: "sei1hgdx0728wscc6xwzle4lcl4cj2ktp2adjaxrchsal29w4pa055tqkzfa3s",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seichicks.jpg",
  },
  {
    name: "Astro Guys",
    address: "sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp/sei1ezqkre4j3gkxlfhc23zv7w4nz8guwyczu70w650008dv3yscj2pqky7x7g_pfp.png",
  },
  {
    name: "Daydreams by Sold1",
    address: "sei1nue0u4rdgmnav9rd87qaxtnhszq4yv7ecxg0wen5e365fjtnp6rqf5dg2u",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1nue0u4rdgmnav9rd87qaxtnhszq4yv7ecxg0wen5e365fjtnp6rqf5dg2u_pfp.png",
  },
  {
    name: "Daring Dragonz",
    address: "sei1ahxexdnrlxhjt53vcav7ktq6ygmwm8aqf5mskjdzdcauqtnn0jsqhtu95a",
    imgUrl: "https://static-assets.pallet.exchange/pfp/daringdragonz.png",
  },
  {
    name: "Remos World",
    address: "sei12y9v6h9jsqhamxgy79hfs9703flt62a46t7fgpqsjnfqzr2ep3kq8wuxf7",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1dr8skknjpn58lnneqw6ahmnddzgl0veyteld0p73f6zzm52r38gs3e3mrd_pfp.png",
  },
  {
    name: "Fud Foxes",
    address: "sei12y9v6h9jsqhamxgy79hfs9703flt62a46t7fgpqsjnfqzr2ep3kq8wuxf7",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei12y9v6h9jsqhamxgy79hfs9703flt62a46t7fgpqsjnfqzr2ep3kq8wuxf7_pfp.PNG",
  },
  {
    name: "Bulls On Sei",
    address: "sei1u64thag5ltz7sjte7ggdd0k8wzr59p32vlswh89wswmz46relcqq6my5h6",
    imgUrl: "https://static-assets.pallet.exchange/pfp/bullsonsei.png",
  },
  {
    name: "Sei Dragons",
    address: "sei1gccj8zy7xxntk9qgmw6wtsfv03dc0q6xz3ls4rncsysl3evtr8xs3ayzag",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seidragons.png",
  },
  {
    name: "Sei Ninja",
    address: "sei1xlve6pkm5lhu0jhuhk9slqekds85h0yqfxkqdquqn5jzj7xcyesq7eayxk",
    imgUrl:
      "https://static-assets.pallet.exchange/collections/pfp_banners/sei1xlve6pkm5lhu0jhuhk9slqekds85h0yqfxkqdquqn5jzj7xcyesq7eayxk_pfp.png",
  },
  {
    name: "Sei Stoics",
    address: "sei1jrkssr4pyc0tsqt0y7340lwv0awnnus9rhjgnaj2vcd8a4rt2m3q3txd3x",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seistoics.jpg",
  },
  {
    name: "The Seinos",
    address: "sei19kfsr9zft0k9awelwwv9k87mrgwf358tfqw9tv30rlvwn8rn5kzq00hnup",
    imgUrl: "https://static-assets.pallet.exchange/pfp/theseinos.jpg",
  },
  {
    name: "Sei Ducks WTF",
    address: "sei1807fz8fk6f6ucupkn4we6jpu6hwj3r6w97ua2de0zg9sszt26txs7savcq",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seiduckswtf.jpg",
  },
  {
    name: "Sei Bulls",
    address: "sei1y7cala63tlxanwn9trm7dmsqkz3hgatf8pgzeeptavecr8jelh0sly7sd6",
    imgUrl: "https://static-assets.pallet.exchange/pfp/seibulls.png",
  },
];

collections.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export { collections };
