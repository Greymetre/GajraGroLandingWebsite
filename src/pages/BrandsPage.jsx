import React, { useState } from 'react'; 
import BrandCard from '../components/Brands/BrandCard';
import ModelSelectionModal from '../components/Brands/ModelSelectionModal';
import bglogo from '../assets/nobg-logo .png';
import { useTranslation } from 'react-i18next';
import { getAllProducts } from '../config/api';


import brand1 from '../assets/brandlogo 1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';
import brand7 from '../assets/brand7.png';
import brand8 from '../assets/brand8.png';
import brand9 from '../assets/brand9.png';
import brand10 from '../assets/brand10.png';

const BrandsPage = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [models, setModels] = useState([]);
const [loading, setLoading] = useState(false);
const [brandModels,setBrandModels] =useState({brandName: "",subCategories: []})

  const { t } = useTranslation();

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

  const brands = [
    { name: 'Ford', logo: brand1 },
    { name: 'Swaraj', logo: brand2 },
    { name: 'Force', logo: brand3 },
    { name: 'JCB', logo: brand4 },
    { name: 'Tata', logo: brand5 },
    { name: 'Mahindra', logo: brand6 },
    { name: 'Escorts', logo: brand7 },
    { name: 'Eicher', logo: brand8 },
    { name: 'Leyland', logo: brand9 },
    { name: 'Tafe', logo: brand10 },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {brands.map((brand, index) => (
            <BrandCard key={index} brand={brand} onClick={handleBrandClick} />
          ))}
        </div>
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