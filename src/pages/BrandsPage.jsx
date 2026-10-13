import React, { useEffect, useState } from 'react';
import BrandCard from '../components/Brands/BrandCard';
import ModelSelectionModal from '../components/Brands/ModelSelectionModal';
import bglogo from '../assets/nobg-logo .png';
import gajraLogo from '../assets/gajragears-favicon.png';
import { useTranslation } from 'react-i18next';
import { getAllProducts, getBrands } from '../config/api';
import { assetUrl } from '../config/environment';

const BrandsPage = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [models, setModels] = useState([]);
const [loading, setLoading] = useState(false);
const [brandModels,setBrandModels] =useState({brandName: "",subCategories: []})
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  const { t } = useTranslation();

  // Brands and logos come from the SFA admin (Brands master); Gajra logo when none is uploaded
  useEffect(() => {
    getBrands()
      .then((res) => {
        const list = res.data?.data || [];
        setBrands(list.map((brand) => ({
          name: brand.name,
          logo: brand.logo ? assetUrl(brand.logo) : gajraLogo,
        })));
      })
      .catch((error) => console.error(error))
      .finally(() => setBrandsLoading(false));
  }, []);

  const handleBrandClick = async (brand) => {
    console.log(brand)
  try {
    setSelectedBrand(brand);
    setIsModelModalOpen(true);
    setLoading(true);

    const res = await getAllProducts({
      currentPage: 1,
      recordPerPage: 100,
      search: "",
      brand: brand.name.toLowerCase(), // 👈 important
    });

    // 👉 subcategory extract
    const subcategories =
      res.data?.data?.subcategory?.[0]?.subcategory || [];

    setBrandModels({brandName:brand?.name, subCategories:subcategories});

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
console.log(brandModels)

  // const brandModels = {
  //   "Mahindra": ["Arjun 605", "Novo 755", "Jivo 225", "M&M TRACTOR"],
  //   "Ford": ["3600 Series", "6600 Series", "Ford Major", "Powerstar"],
  //   "Eicher": ["EICHER ZF TYPE", "Eicher 242", "Eicher 380", "Eicher 551"],
  //   "Tata": ["TATA GBS-40 MOD", "LPT 407", "Signa 2823", "Tata Ace"],
  //   "Tafe": ["TAFE 5900", "MF 241 DI", "Gajraj 5245", "TAFE 30 DI"],
  //   "Ashok Leyland": ["ASHOK LEYLAND (GB-13)", "Dost Strong", "Bada Dost", "Partner"],
  //   "Escorts": ["Farmtrac 60", "Powertrac 439", "Steeltrac", "FT 45"],
  //   "Force Motor": ["Trax Cruiser", "Traveller 3050", "Gurkha", "Force One"],
  //   "JCB": ["JCB 3DX", "JCB 4DX", "JCB 220LC", "Compact Excavator"],
  //   "Swaraj": ["Swaraj 744 FE", "Swaraj 855 FE", "Swaraj 717", "Swaraj 963 FE"],
  // };
  
  // const handleBrandClick = (brand) => {
  //   setSelectedBrand(brand);
  //   setIsModelModalOpen(true);
  // };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_20%)] overflow-hidden relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `url(${bglogo})`, backgroundSize: '250px', backgroundRepeat:'repeat' }}
      />

      <main className="max-w-5xl mx-auto py-12 px-6 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 relative uppercase tracking-wide">
          {t('brands.title')}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-38 h-1 bg-[#FBF201] rounded-full"></span>
        </h2>

        {brandsLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-[#FBF201] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {brands.map((brand, index) => (
              <BrandCard key={index} brand={brand} onClick={handleBrandClick} />
            ))}
          </div>
        )}
      </main>

      <ModelSelectionModal 
        isOpen={isModelModalOpen} 
        onClose={() => setIsModelModalOpen(false)} 
        brandName={selectedBrand?.name} 
        models={selectedBrand ? brandModels : []} 
        loading={loading}
      />
    </div>
  );
};

export default BrandsPage;