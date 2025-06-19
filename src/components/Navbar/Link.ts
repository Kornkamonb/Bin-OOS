// import รูปภาพ (ใช้การ import แบบที่ถูกต้องใน React/TypeScript)
import Iconsmain from "@/../public/icon/react.svg";
// การกำหนดประเภท (Type) สำหรับข้อมูล
interface SubPath {
  path: string;
  label: string;
}

interface Link {
  Title: string;
  Iconsmain: string; // ใช้เป็น string สำหรับเส้นทางของภาพ
  SubPath: SubPath[]; // อ้างอิง SubPath
}

// Component ที่ใช้กำหนดข้อมูล Link
export const Link = () => {
  const Grp1: Link = {
    Title: "TITLE",
    Iconsmain: Iconsmain, // ใช้การ import รูปภาพที่ถูกต้อง
    SubPath: [
      { path: "/template-typescript/homepage", label: "Template Typescript" },
    ],
  };

  return { Grp1 };
};
