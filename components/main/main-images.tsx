"use client";

import { FerrisWheel } from "lucide-react";
import GalleryGrid from "@/components/gallery/gallery-grid";

const logoImages = [
  "a-bold-modern-logo-featuring-a-stylized-_kNULDwuCREmCunraYFj9eA_OAvrQf_xR4uFfw6DOxWoSA.jpeg",
  "a-clean-vector-logo-design-featuring-the_JAzfpnSNQCuzIbWTmoslKA_Nbmvz-rpSnqOxOwst0GqWw.jpeg",
  "a-luxurious-logo-design-for-amizo-brand-_IE0AYKUhTB-dXykYiEVIrQ_Qc3RxWR8Q0Ortyo6x6LnEA.jpeg",
  "a-minimalist-logo-design-featuring-the-w_nugnJIItS1uwhJDKcugzFA_aqceBPxHRpmlxrh54qFIIQ.jpeg",
  "a-modern-logo-design-featuring-a-playful_8JHfKIomS4uqMO3ChJNbNw_cIGFR3WRTxKKcD-8bxIsBw.jpeg",
  "a-modern-logo-design-featuring-an-elegan_Q6t-V328Rjaah40zyQoqwQ_HDBfbAjYTbmS7h2gK_TiSQ.jpeg",
  "a-modern-logo-design-featuring-the-styli_ZMw0pVIrTQCKsSb-_lBcmA_MSGSg3ovSc2uZPloYkSnSg.jpeg",
  "a-modern-logo-design-featuring-the-word-_8sKJSzq_RUqUZyk0kLYriA_X5CLYkHGSQapZA9vb1l9qQ.jpeg",
  "a-modern-minimalist-logo-design-featurin_LrGUH9xnR76ABARZjwLM3Q_NLOUSm0vSX-S1nzjUOo8mA.jpeg",
  "a-modern-minimalist-logo-design-featurin_tCAoufNgR6mY5J04D9FRcg_RP_nij4QQw2ELsRaAsY6dQ.jpeg",
  "a-modern-wordmark-logo-design-for-rhyza-_4A9UlmU2RueqJBFuuzY19Q_AYgzCvxYSJGUTSaKMYqbWQ.jpeg",
  "a-rustic-premium-logo-design-featuring-t_0RgPvBl2TrOZzRyn55FF8w_YVluX_ohQmqdeXuGl0FcZA.jpeg",
  "a-sophisticated-letter-mark-logo-featuri_u9IrZMTJRxi4YbBSV8AnkQ_EylyJUKFRAS5npAc0tY-FA.jpeg",
  "a-sophisticated-logo-design-featuring-a-_xeBjFEdrT4yTYBRvxgKuPg_MoQnqcFKQWSH-yBbuBlXEg.jpeg",
  "a-sophisticated-logo-design-featuring-bo_1ZwJxy_PQ4CZKv9LCiQ6_g_XhlhMjyhTTG0OQUIqG7qOA.jpeg",
  "create-a-cutting-edge-modern-logo-with-t_SrXLkQ9QSYaEfK7wMRanEw_ERvSnukkQdmazQybK-72ew.jpeg",
  "creta-logo-for-channel-name-r-r-news-sty_ez8dpW3USY6YMafKbXcwJw_Wl1U3kfWSTaC5Xozfubyxw.jpeg",
  "logo-design-for-pipelinex-a-high-end-mar_x6-hKxPaQ3iJW12CD9s8uA_CHY6ebpmQPagEsE3j7RlYQ.jpeg",
  "luxury-monogram-logo-merging-the-letters__kBTc9t1RYaBzUrOIYQICA_LhH61UphQu2-Eif8R4Z0kA.jpeg",
  "premium-corporate-logo-for-atrium-a-mode_mym9fvUYQEaLd8IFE0I6ZQ_Rllv5R3yT023bbmgSOpSVA.jpeg",
  "rea-un-logotipo-profesional-y-elegante-p_XXyiVFsxSq6GL0KV8mIf5A_UtrOmJO2QWGqkVbLHRq95A.jpeg",
  "u-menia-est-svoia-kompaniia-po-proizvods_Dt74pc49RO6Upo7fNYQ2bg_HKPCnRkSRHeriBCSBR7Q_A.jpeg",
];

export default function MainImages() {
  return (
    <div className="main__images mt-4">
      <h3 className="text-xl font-extrabold text-slate-900 font-nanumNeo mb-4 mt-18 flex items-center gap-1">
        최근 생성된 이미지 <FerrisWheel className="text-brand" />
      </h3>
      <GalleryGrid
        images={logoImages}
        folder="/logo"
        altPrefix="Logo"
        columns="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6"
      />
    </div>
  );
}
