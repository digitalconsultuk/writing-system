/**
 * For mapping data with language signs
 */

import symbolA from "@/assets/symbols/Fonts.1b.png";
import symbolB from "@/assets/symbols/Fonts.2b.png";
import symbolC from "@/assets/symbols/Fonts.3b.png";
import symbolD from "@/assets/symbols/Fonts.4b.png";
import symbolE from "@/assets/symbols/Fonts.5b.png";
import symbolF from "@/assets/symbols/Fonts.6b.png";
import symbolG from "@/assets/symbols/Fonts.7b.png";
import symbolH from "@/assets/symbols/Fonts.8b.png";
import symbolI from "@/assets/symbols/Fonts.9b.png";
import symbolJ from "@/assets/symbols/Fonts.10b.png";
import symbolK from "@/assets/symbols/Fonts.11b.png";
import symbolL from "@/assets/symbols/Fonts.12b.png";
import symbolM from "@/assets/symbols/Fonts.13b.png";
import symbolN from "@/assets/symbols/Fonts.14b.png";
import symbolO from "@/assets/symbols/Fonts.15b.png";
import symbolP from "@/assets/symbols/Fonts.16b.png";
import symbolQ from "@/assets/symbols/Fonts.17b.png";
import symbolR from "@/assets/symbols/Fonts.18b.png";
import symbolS from "@/assets/symbols/Fonts.19b.png";
import symbolT from "@/assets/symbols/Fonts.20b.png";
import symbolU from "@/assets/symbols/Fonts.21b.png";
import symbolV from "@/assets/symbols/Fonts.22b.png";
import symbolW from "@/assets/symbols/Fonts.23b.png";
import symbolX from "@/assets/symbols/Fonts.24b.png";
import symbolY from "@/assets/symbols/Fonts.25b.png";
import symbolZ from "@/assets/symbols/Fonts.26b.png";

export type MappedDataSet = {
  character: string;
  sign: string | number;
};

export const SIGN_DATABASE: Array<MappedDataSet> = [
  { character: "A", sign: symbolA },
  { character: "B", sign: symbolB },
  { character: "C", sign: symbolC },
  { character: "D", sign: symbolD },
  { character: "E", sign: symbolE },
  { character: "F", sign: symbolF },
  { character: "G", sign: symbolG },
  { character: "H", sign: symbolH },
  { character: "I", sign: symbolI },
  { character: "J", sign: symbolJ },
  { character: "K", sign: symbolK },
  { character: "L", sign: symbolL },
  { character: "M", sign: symbolM },
  { character: "N", sign: symbolN },
  { character: "O", sign: symbolO },
  { character: "P", sign: symbolP },
  { character: "Q", sign: symbolQ },
  { character: "R", sign: symbolR },
  { character: "S", sign: symbolS },
  { character: "T", sign: symbolT },
  { character: "U", sign: symbolU },
  { character: "V", sign: symbolV },
  { character: "W", sign: symbolW },
  { character: "X", sign: symbolX },
  { character: "Y", sign: symbolY },
  { character: "Z", sign: symbolZ },
];