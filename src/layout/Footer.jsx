import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check } from 'lucide-react';
import logo2 from '../assets/nobg-logo .png';
import playstore from '../assets/playstore.png';
import applestore from '../assets/applestore.png'; 
import { useTranslation } from 'react-i18next'; 

const CopyableSection = ({ icon: Icon, title, content, type }) => {
  const [copied, setCopied] = useState(false);
 

  const getLink = () => {
    if (type === "phone") return `tel:${content}`;
    if (type === "email") return `mailto:${content}`;
    if (type === "address") {
      const query = encodeURIComponent(content);
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    return "#";
  };

  const handleCopy = (e) => {
    e.preventDefault(); // 👉 link open na ho
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={getLink()}
      target={type === "address" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group transition-all active:scale-95"
    >
      <div className="relative">
        <Icon className="text-[#FFED00]" size={24} />
        {copied && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FFED00] text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-bounce">
            COPIED!
          </div>
        )}
      </div>

      <p className="text-sm font-semibold uppercase tracking-wider">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-400 group-hover:text-white transition-colors">
          {content}
        </p>

        {/* COPY ICON */}
        <div
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {copied ? (
            <Check size={12} className="text-[#FFED00]" />
          ) : (
            <Copy size={12} className="text-gray-500" />
          )}
        </div>
      </div>
    </a>
  );
};

const Footer = () => {
  const { t } = useTranslation();
   const [showPopup, setShowPopup] = useState(false);

  return (
    <footer className="bg-black text-white py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-10 uppercase italic tracking-tighter">
          {t('footer.contact_us')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-12">
          {/* Phone */}
        <CopyableSection 
          icon={Phone} 
          title={t('footer.phone')} 
          content="+91 9109166124"
          type="phone"
        />

        {/* Email */}
        <CopyableSection 
          icon={Mail} 
          title={t('footer.email')} 
          content="marketing@gajra.com"
          type="email"
        />

        {/* Address */}
        <CopyableSection 
          icon={MapPin} 
          title={t('footer.address')} 
          content={t('footer.address_detail')}
          type="address"
        />
        </div>

        {/* Logo and App Links */}
        <div className="border-t border-gray-800 pt-8 pb-8 w-full flex flex-col items-center">
          <img src={logo2} alt="Gajra Logo" className="h-16 w-16 mb-6 brightness-110" />
          <div className="flex gap-5">

            {/* PLAY STORE */}
            <a
              href="https://play.google.com/store/search?q=gajra+gro&c=apps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={playstore}
                alt="Play Store"
                className="h-9 cursor-pointer hover:scale-105 transition-transform"
              />
            </a>

            {/* APP STORE */}
            <button
              onClick={() => {
                setShowPopup(true);

                setTimeout(() => {
                  setShowPopup(false);
                }, 2000);
              }}
              className="relative"
            >
              <img
                src={applestore}
                alt="App Store"
                className="h-9 cursor-pointer hover:scale-105 transition-transform"
              />

              {showPopup && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFED00] text-black text-xs font-bold px-3 py-1 rounded-md shadow-lg whitespace-nowrap animate-bounce">
                  Coming Soon
                </div>
              )}
            </button>

          </div>
        </div>

        <div>
          <p className="text-[10px] text-gray-600 mt-6 uppercase tracking-widest font-medium italic">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;