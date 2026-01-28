"use client";

import Image from "next/image";

// 로고 이미지 목록 (일부만 사용)
const logos = [
  "/logo/a-clean-retro-logo-design-featuring-bold_uZn23cLSRQ-D75IH5uFDTQ_JMJ1aCY7QiehA-NysGNtDQ.jpeg",
  "/logo/a-minimalist-logo-design-featuring-the-l_uh5Qt-3vTdylDUYVk6MvBQ_GcVx96E4TxismaYd5pPC2g.jpeg",
  "/logo/a-minimalist-logo-design-featuring-the-w_bAkNMGuSTSeJZnR5PC9ViA_IXzvG2LIS-CbVZv743DYdw.jpeg",
  "/logo/a-modern-coffee-shop-logo-design-featuri_pPSvME4BQTmiPsOZ87nxYg_Lr8zgR0KQDiZMItNHjYkvw.jpeg",
  "/logo/a-modern-logo-design-featuring-the-brand_IB4uo_EcQha7DijR8ELqOg_OTDCu_QVQFqifOlH263V_A.jpeg",
  "/logo/a-modern-logo-design-featuring-the-compa_DGE62bAdQFWYy1XOfu3hBQ_an7-ZNzeT_6B7C8bI64kNw.jpeg",
  "/logo/a-modern-logo-design-featuring-the-text-_20_ux3RfQia8sO9BU_rh5w_LDJ6tA--TuqxhPB59AZ22Q.jpeg",
  "/logo/a-modern-minimal-logo-design-featuring-a_Q-ft_4TSS4yOc3C46GYWjQ_JlTiQyl2Q0GaciDeWy3vCQ.jpeg",
];

const logos2 = [
  "/logo/a-modern-minimalist-2d-logo-design-for-a_pvluFdK8RYGYrtmdmGS53Q_VK7N8qBfRnOIxGC8ZSWMYQ.jpeg",
  "/logo/a-professional-corporate-logo-design-fea_YtqYRmOoTtCJ6VM3txE4lg_NVx41GtbRTaezo9gQNe8sA.jpeg",
  "/logo/a-sleek-modern-logo-design-featuring-the_HMu5HhM_RQOYfKavW3rv1A_WIZwNQZ1R5SQK1NkTiQ9nA.jpeg",
  "/logo/create-a-logo-concept-for-a-contemporary_xV_wj_43R9iGN3Piutot5A_O4CslXraQmuG7kqQivBU2g.jpeg",
  "/logo/create-a-simlple-logo-for-my-ecommorce-c_D44aoOZXTIy38W9deIfIfg_asIFbjpETYWvMBQD9bLDUQ.jpeg",
  "/logo/create-a-sleek-logo-for-zeeruh-incorpora_oimRZmhATcut0PVnB9k8_g_IsuzSQBkQf66I2bhX5rmfg.jpeg",
  "/logo/create-an-elegant-minimalistic-and-moder_JT9bsFRySoCGol4_nRbwvw_TTC62THITCqgkdk0L5p87Q.jpeg",
  "/logo/create-an-energetic-yet-minimalist-logo-_EEL90MycRYOvnyNuLETOmg_YDzP3r7BR522xZG6a-LMTg.jpeg",
];

export default function MainMarquee() {
  // 이미지 4배 복제 (끊김 없는 무한 스크롤)
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];
  const repeatedLogos2 = [...logos2, ...logos2, ...logos2, ...logos2];

  return (
    <div className="w-full overflow-hidden py-2 space-y-3">
      {/* 첫 번째 줄 - 오른쪽으로 이동 */}
      <div className="relative flex">
        <div className="flex animate-marquee-right gap-3">
          {repeatedLogos.map((logo, index) => (
            <div
              key={`a-${index}`}
              className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-right gap-3" aria-hidden>
          {repeatedLogos.map((logo, index) => (
            <div
              key={`b-${index}`}
              className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 두 번째 줄 - 왼쪽으로 이동 */}
      <div className="relative flex">
        <div className="flex animate-marquee-left gap-3">
          {repeatedLogos2.map((logo, index) => (
            <div
              key={`c-${index}`}
              className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee-left gap-3" aria-hidden>
          {repeatedLogos2.map((logo, index) => (
            <div
              key={`d-${index}`}
              className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
