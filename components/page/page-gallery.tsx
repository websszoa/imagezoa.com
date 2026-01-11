"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

const productImages = [
  "a-photograph-of-a-suspended-coca-cola-ze_ppsE7yYwTG6HrJwFD-edaA_nfHzzuq8TOy-N7KQutpKPw.jpeg",
  "a-photograph-of-a-chilled-looping-bevera_31ZVCK7cR_KXKeJuwfpFkQ_hHVv6gWCQaWZulS9nzfppA.jpeg",
  "a-vibrant-product-photograph-showcases-a_aIpoDnfRR1eidmUz-x0tkw_WgA8jouaQZmYoMmm9iKwBQ.jpeg",
  "a-photograph-of-a-chilled-red-bull-can-f_-aNdPEJRR1GayvcxpDEoXw_burWq0WGQeKsROASU55JBw.jpeg",
  "a-photograph-captures-a-chilled-pepsi-co_ejLYeF55SseBq8kqwMMsGg_GaH1ocd0Th6FJSefMzWFsg.jpeg",
  "a-sophisticated-product-photography-setu_0WOSq02DQQK74cwZboLwgw_IXpnPJshR-OM5V913IcljQ.jpeg",
  "a-photograph-of-a-sleek-silver-can-of-co_AMR93z_UQdis4QJnmWuXhQ_BRpZuvKgRG2jh-wvJhs6Zw.jpeg",
  "a-photographic-composition-featuring-a-4_qSgLXpUmQVyqcUhp-UOG4g_RbjOrYGyQnmn08pH_bsfCg.jpeg",
  "create-a-product-image-of-the-fresh-lemo_i_JnbAjaQUWCQ54346iisQ_FAv6dRITQTGPBukQAmfoeQ.jpeg",
  "a-product-photography-shot-of-agreen-fla_ON9MR7aRTF6tAJTihg_b0Q_S7m4AqY3TtKKoQ0crH0caQ.jpeg",
  "a-photograph-of-a-vibrant-orange-fanta-c_rBljC00sQHunxRrynOGovA_Gjy-vjpDTVqmZxN56H2FqA.jpeg",
  "a-professional-product-photograph-featur_9iGS7acgSJyFkN5HYMu73Q_Xbzaiuj4TlWmpQXL92Vidg.jpeg",
  "an-ultra-realistic-commercial-photograph_eG7kaeckTHy8b4yj08A0nQ_NPfAyMCNQuOOGlqJEhzC4A.jpeg",
  "low-plastic-300-ml-body-cream-jar-floati_76q2A8KcQquFSkWD9uYcyQ_hYsFHNiYT96HPy2qELavLw.jpeg",
  "a-photograph-of-a-light-green-glass-jar-_zcAMaWM3QNaAcek8sf3-Ew_koGYgbicRkSSOEqg3XV_Zg.jpeg",
  "hot-fuel-a-photo-of-a-dove-advanced-care__fept-UvTPOKPVUVAhxggQ_hNWj-eMkStGfzqSIDO3I0w.jpeg",
  "a-photograph-of-a-chilled-aluminum-can-l_Wv7oevhxRRGTOmzVI1x78w_CPhjRcPcS8iin1ikavZKbw.jpeg",
  "a-professional-product-photography-shot-_XDcsBG4LTcO6N32fRGbnRA_B5js0zgaQ7e8zrMEjLfujg.jpeg",
  "a-photograph-of-a-single-dori-cola-cherr_pRxnLVumRdej5hCkPgMaNw_F6xLSpnMT0W7gxLNNjvvkQ.jpeg",
  "a-photograph-of-a-vibrant-red-bubalu-coq_SssYkY-DRpaMuwZ71w-cyQ_WZFQIDpdTr6hSfJZbqRWtw.jpeg",
  "a-photograph-depicts-a-chilled-cola-can-_kK9kOkNwSYu3fJNoLXzQRA_LDK7fQ59TS20ry5A4f5djg.jpeg",
  "a-luxurious-perfume-bottle-with-an-elega_vcBgKP_BSC-pptGE25eiig_Ys3pGSSeRtCBu99jR2u1dw.jpeg",
  "a-cinematic-tv-commercial-style-animatio_owhZJkOmQtCkdHaUwbiq7w_fysU3Y8_TTOznKHtE58hZg.jpeg",
  "a-dramatic-product-photograph-of-a-sleek__SBroXWfRVaB8CY63MUV0A_k0SNHxj7RaaAUsvyFmcENg.jpeg",
  "a-photograph-of-a-willy-simeon-grand-vin_Zxu3nhHaSou8iHcdmqQgVA_Jvfi550eRPWNHZL57sjKlQ.jpeg",
  "a-photograph-of-a-chilled-red-japi-beer-_EcOLT4NSSW2req0eWtgQCA_aPOvYeBjTnGDLjJwyCkk_g.jpeg",
  "a-professional-product-photograph-of-an-_ddNt74CNTKmnK0la_ccBIg_X-2szPdMQ9CgeVI0FijWWg.jpeg",
  "a-photograph-captures-a-chilled-coca-col_cezZahSpT1OT_6bM6JZU1A_cukoUGNwRECQWFdNPzBHEQ.jpeg",
  "a-photograph-showcases-a-chilled-monster_CqsadwEdSlONayIuBdEg4w_MTdbm9_KQuyekVExDFEYpw.jpeg",
  "a-photograph-of-a-still-life-composition_88dEN73eRY2Fip9hkfV-DQ_Fx4P39SkRDuyFssbCzBIbA.jpeg",
  "a-photograph-of-a-vibrant-red-coca-cola-_-7SD5ewkTGOO_RUsN8ZNGg_TMHL2IwUSaONqnriES8S3Q.jpeg",
  "a-luxurious-4k-product-photograph-of-a-d_lE2UY99USRqU-zaT5E027g_Aeibl-6cQHiIeNP46Yep3A.jpeg",
  "a-35mm-film-photograph-of-an-elegant-fac_GkwW2mSATlu2Gzbv9VZZJA_c4ywrd8sQE6M2067Gj7hWA.jpeg",
  "a-photograph-captures-a-chilled-can-of-k_H09a8zTPSOGtqXh0yRkOpA_cAmecetnQp6EMe4T6Km-jA.jpeg",
  "muestra-la-camara-nikon-chronos-en-prime_UtTeBjCXTbuA6D89G6ZH3Q_dbciAqN5T96EUlXjga_IUw.jpeg",
];

type TabType = "logo" | "product";

export default function PageGallery() {
  const [activeTab, setActiveTab] = useState<TabType>("logo");

  const currentImages = activeTab === "logo" ? logoImages : productImages;
  const imageFolder = activeTab === "logo" ? "/logo" : "/product";

  return (
    <div className="product__gallery">
      <div className="flex items-center justify-center gap-1 mb-8">
        <button
          onClick={() => setActiveTab("logo")}
          className={cn(
            "px-6 py-2 font-nanumNeo text-sm font-medium transition-all rounded-full cursor-pointer",
            activeTab === "logo"
              ? "text-brand bg-brand/10"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          )}
        >
          로고
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={cn(
            "px-6 py-2 font-nanumNeo text-sm font-medium transition-all rounded-full cursor-pointer",
            activeTab === "product"
              ? "text-brand bg-brand/10"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          )}
        >
          상품
        </button>
      </div>

      <GalleryGrid
        images={currentImages}
        folder={imageFolder}
        altPrefix={activeTab === "logo" ? "Logo" : "Product"}
      />
    </div>
  );
}
