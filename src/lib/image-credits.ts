// Wikimedia Commons görselleri için atıf bilgisi (CC BY / CC BY-SA lisansı atıf ister).
// Anahtar: veri dosyalarındaki görsel URL'si. Görselin büyük gösterildiği yerde
// <ImageCredit src=... /> ile, ayrıca /image-credits sayfasında listelenir.
// Unsplash görselleri atıf gerektirmez → burada yok.
export type ImageCredit = { author: string; license: string; licenseUrl: string; source: string };

export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/1920px-Hagia_Sophia_Mars_2013.jpg": {
    "author": "Arild Vågen",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Hagia_Sophia_Mars_2013.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Topkap%C4%B1_-_01.jpg/1920px-Topkap%C4%B1_-_01.jpg": {
    "author": "Carlos Delgado",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Topkap%C4%B1_-_01.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Dolmabah%C3%A7e_Palace_2007.jpg/1920px-Dolmabah%C3%A7e_Palace_2007.jpg": {
    "author": "SBarnes",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Dolmabah%C3%A7e_Palace_2007.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Istanbul_Galata_Tower_IMG_8211_1920.jpg/1920px-Istanbul_Galata_Tower_IMG_8211_1920.jpg": {
    "author": "Alexxx1979",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Istanbul_Galata_Tower_IMG_8211_1920.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Bosphorus%2C_Istanbul_%28P1100293%29.jpg/1920px-Bosphorus%2C_Istanbul_%28P1100293%29.jpg": {
    "author": "Matti Blume",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Bosphorus,_Istanbul_(P1100293).jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/The_Travertine_terraces_of_Pamukkale.jpg/1920px-The_Travertine_terraces_of_Pamukkale.jpg": {
    "author": "Slyronit",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:The_Travertine_terraces_of_Pamukkale.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Maiden_tower%2C_Istanbul_%28P1100207%29.jpg/1920px-Maiden_tower%2C_Istanbul_%28P1100207%29.jpg": {
    "author": "Matti Blume",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Maiden_tower,_Istanbul_(P1100207).jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Library_of_Celsus_6243.jpg/1920px-Library_of_Celsus_6243.jpg": {
    "author": "Herbert Weber",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Library_of_Celsus_6243.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/TR.IZ.Selcuk_Ephesus_2011-10-04_Temple-of-Artemis_07_3x2-R_5K.jpg/1920px-TR.IZ.Selcuk_Ephesus_2011-10-04_Temple-of-Artemis_07_3x2-R_5K.jpg": {
    "author": "Roy Egloff",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:TR.IZ.Selcuk_Ephesus_2011-10-04_Temple-of-Artemis_07_3x2-R_5K.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Antalya_Side_Apollo.jpg/1920px-Antalya_Side_Apollo.jpg": {
    "author": "Saffron Blaze",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Antalya_Side_Apollo.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/A_View_In_Troy.jpg/1920px-A_View_In_Troy.jpg": {
    "author": "Emre D.",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:A_View_In_Troy.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Nemrut_statues_2.jpg/1920px-Nemrut_statues_2.jpg": {
    "author": "Linda M Caldwell",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Nemrut_statues_2.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Sumela_From_Across_Valley.JPG/1920px-Sumela_From_Across_Valley.JPG": {
    "author": "Bjørn Christian Tørrissen",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sumela_From_Across_Valley.JPG"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Library_of_Celsus_6242.jpg/1920px-Library_of_Celsus_6242.jpg": {
    "author": "Herbert Weber",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Library_of_Celsus_6242.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Blue_Lagoon_-_2014.10_-_panoramio.jpg/1920px-Blue_Lagoon_-_2014.10_-_panoramio.jpg": {
    "author": "rheins",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Blue_Lagoon_-_2014.10_-_panoramio.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Temple_Apollo_Side_Boat.jpg/1920px-Temple_Apollo_Side_Boat.jpg": {
    "author": "Saffron Blaze",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Temple_Apollo_Side_Boat.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/TR.IZ.Selcuk_Ephesus_Celsus-Library_32_3x2-R_5K.jpg/1920px-TR.IZ.Selcuk_Ephesus_Celsus-Library_32_3x2-R_5K.jpg": {
    "author": "Roy Egloff",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:TR.IZ.Selcuk_Ephesus_Celsus-Library_32_3x2-R_5K.jpg"
  },
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Basilica_Cistern_Istanbul.JPG/1920px-Basilica_Cistern_Istanbul.JPG": {
    "author": "Moise Nicu",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Basilica_Cistern_Istanbul.JPG"
  }
};
