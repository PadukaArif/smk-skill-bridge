import dataVocation from "../data/vocation/vocations.json";

interface TopLevelChoice {
  data: IData | undefined;
  total: number;
}

export interface IData {
  ID: number;
  uuid: string;
  name: string;
  icon: string;
  description: string;
  vocation: string;
  skills: string[];
  projects: string[];
  careers: string[];
  colors: Colors;
}

export interface Colors {
  base_color: string;
  primary_color: string;
  secondary_color: string;
  subtle_color: string;
}

const dataInfor: IData[] = [];
dataVocation.forEach((a) => {
  if (a.vocation == "informatika") {
    dataInfor.push(a);
  }
});
const dataBangunan: IData[] = [];
dataVocation.forEach((a) => {
  if (a.vocation == "bangunan") {
    dataBangunan.push(a);
  }
});
const dataMesin: IData[] = [];
dataVocation.forEach((a) => {
  if (a.vocation == "mesin") {
    dataMesin.push(a);
  }
});
export const checkInfor = (data: number[]) => {
  const rplChoice: TopLevelChoice = {
    data: dataInfor[0],
    total: 0,
  };
  const tkjChoice: TopLevelChoice = {
    data: dataInfor[1],
    total: 0,
  };
  const sijaChoice: TopLevelChoice = {
    data: dataInfor[2],
    total: 0,
  };
  const dkvChoice: TopLevelChoice = {
    data: dataInfor[3],
    total: 0,
  };
  const notKnowChoice: TopLevelChoice = {
    data: undefined,
    total: 0,
  };

  data.forEach((a) => {
    if (a == 1) {
      rplChoice.total += 1;
    } else if (a == 2) {
      tkjChoice.total += 1;
    } else if (a == 3) {
      sijaChoice.total += 1;
    } else if (a == 4) {
      dkvChoice.total += 1;
    } else {
      notKnowChoice.total += 1;
    }
  });
  const arrayChoice = [
    rplChoice,
    tkjChoice,
    sijaChoice,
    dkvChoice,
    notKnowChoice,
  ];
  return arrayChoice.sort((a,b)=>b.total - a.total)[0];
};
export const checkBangunan = (data: number[]) => {
  const dpibChoice: TopLevelChoice = {
    data: dataBangunan[0],
    total: 0,
  };
  const tkpChoice: TopLevelChoice = {
    data: dataBangunan[1],
    total: 0,
  };
  const titlChoice: TopLevelChoice = {
    data: dataBangunan[2],
    total: 0,
  };
  const notKnowChoice: TopLevelChoice = {
    data: undefined,
    total: 0,
  };

  data.forEach((a) => {
    if (a == 1) {
      dpibChoice.total += 1;
    } else if (a == 2) {
      tkpChoice.total += 1;
    } else if (a == 3) {
      titlChoice.total += 1;
    } else {
      notKnowChoice.total += 1;
    }
  });
  const arrayChoice = [
    dpibChoice,
    tkpChoice,
    titlChoice,
    notKnowChoice,
  ];
  return arrayChoice.sort((a,b)=>b.total - a.total)[0];
};
export const checkMesin = (data: number[]) => {
  const dgmChoice: TopLevelChoice = {
    data: dataMesin[0],
    total: 0,
  };
  const tpChoice: TopLevelChoice = {
    data: dataMesin[1],
    total: 0,
  };
  const tkrChoice: TopLevelChoice = {
    data: dataMesin[2],
    total: 0,
  };
  const notKnowChoice: TopLevelChoice = {
    data: undefined,
    total: 0,
  };

  data.forEach((a) => {
    if (a == 1) {
      dgmChoice.total += 1;
    } else if (a == 2) {
      tpChoice.total += 1;
    } else if (a == 3) {
      tkrChoice.total += 1;
    } else {
      notKnowChoice.total += 1;
    }
  });
  const arrayChoice = [
    dgmChoice,
    tpChoice,
    tkrChoice,
    notKnowChoice,
  ];
  return arrayChoice.sort((a,b)=>b.total - a.total)[0];
};
