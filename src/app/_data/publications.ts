export interface Patent {
  title: string;
  patentNumber: string;
  date: Date;
  url: string;
}

export const patents = [
  {
    title:
      "Devices and methods for encryption and decryption of graphical 3d objects",
    patentNumber: "US20170169232A1",
    date: new Date("2016-12-15"),
    url: "https://patents.google.com/patent/US20170169232A1",
  },
  {
    title:
      "Methods and apparatuses for embedding and decoding data in a three-dimensional model",
    patentNumber: "US20180357741A1",
    date: new Date("2015-11-24"),
    url: "https://patents.google.com/patent/US20180357741A1",
  },
  {
    title:
      "Methods and apparatuses for embedding and decoding data in a three-dimensional model",
    patentNumber: "WO2017091208A1",
    date: new Date("2015-11-24"),
    url: "https://patents.google.com/patent/WO2017091208A1",
  },
] satisfies Patent[];

export interface Publication {
  title: string;
  where: string;
  date: Date;
  status: string;
  docUrl: string;
  confUrl: string;
}

export const publications = [
  {
    title: "Polymorphic Protection of 3D-Models",
    where:
      "VRST 2017 (ACM Symposium on Virtual Reality Software and Technology)",
    date: new Date("2016"),
    status: "Unpublished manuscript",
    docUrl:
      "https://6sx4yzh6qguaums5.public.blob.vercel-storage.com/static/vrst-2016-submission-A6uqLTM15Rg01C91ryxDKI1FoRLHUl.pdf",
    confUrl: "https://vrst.acm.org/vrst2017/",
  },
] satisfies Publication[];
